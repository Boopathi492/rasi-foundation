import mongoose from 'mongoose';
import dbConnect from '../../../backend/lib/mongodb.js';
import TestSession from '../../../backend/models/TestSession.js';
import StudentDocument from '../../../backend/models/StudentDocument.js';
import { withPermission } from '../../../backend/lib/auth.js';
import { can } from '../../../backend/lib/rbac.js';
import { recordAudit } from '../../../backend/lib/apiHandler.js';
import { setNoCacheHeaders } from '../../../backend/lib/apiSecurity.js';
import { buildXlsx, XLSX_MIME } from '../../../backend/lib/xlsx.js';
import { buildPdfReport, PDF_MIME } from '../../../backend/lib/pdf.js';
import {
    fetchAdminScholarshipDataset,
    invalidateSheetDBStoreCache,
    sanitizeCell,
} from '../../../backend/lib/sheetdb/index.js';

function toCsvValue(val) {
    const safe = String(sanitizeCell(val ?? ''));
    if (safe.includes(',') || safe.includes('"') || safe.includes('\n')) {
        return `"${safe.replace(/"/g, '""')}"`;
    }
    return safe;
}

function buildCsvBuffer(columns, rows) {
    const headerLine = columns.map((c) => toCsvValue(c.header)).join(',');
    const dataLines = rows.map((row) => columns.map((c) => toCsvValue(row[c.key])).join(','));
    return Buffer.from([headerLine, ...dataLines].join('\r\n'), 'utf8');
}

async function handler(req, res) {
    setNoCacheHeaders(res);

    try {
        if (process.env.MONGODB_URI) {
            await dbConnect();
        }
    } catch {
        // SheetDB remains readable even if MongoDB is temporarily unreachable
    }

    if (req.method === 'GET') {
        try {
            const {
                page = 1,
                limit = 20,
                search = '',
                status = 'all',
                view = 'all',
                detailToken = '',
                export: exportFormat = '',
                refresh = '',
            } = req.query || {};

            const dataset = await fetchAdminScholarshipDataset({
                forceRefresh: refresh === 'true',
            });

            // Single-candidate full detail lookup (includes linked private document metadata if any)
            if (detailToken) {
                const normToken = String(detailToken).trim().toUpperCase();
                const match = dataset.unified.find(
                    (item) => String(item.registrationToken || '').toUpperCase() === normToken
                );
                if (!match) {
                    return res.status(404).json({ success: false, message: 'Candidate record not found' });
                }

                let documents = [];
                if (mongoose.connection.readyState === 1 && can(req.user?.role, 'documents:view')) {
                    const docQuery = { uploadStatus: 'uploaded', $or: [{ applicationNumber: normToken }] };
                    if (match.studentReferenceId) {
                        docQuery.$or.push({ studentReferenceId: match.studentReferenceId });
                    }
                    documents = await StudentDocument.find(docQuery).lean().catch(() => []);
                }

                return res.status(200).json({
                    success: true,
                    candidate: {
                        ...match,
                        documents,
                    },
                });
            }

            // Compute global statistics across the unified dataset
            const allUnified = dataset.unified || [];
            const completedItems = allUnified.filter((u) => u.status === 'completed');
            const inProgressItems = allUnified.filter((u) => u.status === 'in_progress');
            const registeredOnlyItems = allUnified.filter((u) => u.status === 'registered' || u.status === 'pending');
            const expiredItems = allUnified.filter((u) => u.status === 'expired');

            let avgScore = 0;
            let highestScore = 0;
            if (completedItems.length > 0) {
                const sumScore = completedItems.reduce((acc, s) => acc + Number(s.score || 0), 0);
                const sumTotal = completedItems.reduce((acc, s) => acc + Number(s.totalQuestions || 60), 0);
                avgScore = sumTotal > 0 ? Math.round((sumScore / sumTotal) * 100) : 0;
                highestScore = Math.max(...completedItems.map((s) => Number(s.score || 0)));
            }

            const sevenDaysAgoMs = Date.now() - 7 * 24 * 60 * 60 * 1000;
            const last7Days = allUnified.filter((u) => {
                if (!u.createdAt) return false;
                const d = new Date(u.createdAt);
                return !Number.isNaN(d.getTime()) && d.getTime() >= sevenDaysAgoMs;
            }).length;

            const feedbackList = dataset.feedback || [];
            const avgFeedbackRating = feedbackList.length > 0
                ? Number((feedbackList.reduce((acc, f) => acc + Number(f.overallRating || 0), 0) / feedbackList.length).toFixed(1))
                : 0;

            const stats = {
                total: allUnified.length,
                registered: registeredOnlyItems.length,
                completed: completedItems.length,
                inProgress: inProgressItems.length,
                pending: registeredOnlyItems.length,
                expired: expiredItems.length,
                avgScore,
                highestScore,
                last7Days,
                feedbackCount: feedbackList.length,
                avgFeedbackRating,
                sheetdbHealthy: dataset.sheetdbHealthy,
                sheetdbErrors: dataset.sheetdbErrors || [],
            };

            // Select base list according to `view`
            let workingList = allUnified;
            if (view === 'results') {
                workingList = completedItems;
            } else if (view === 'students') {
                workingList = allUnified;
            } else if (view === 'feedback') {
                workingList = feedbackList.map((fb) => ({
                    _id: fb.feedbackReferenceId || fb.resultReferenceId,
                    ...fb,
                }));
            }

            // Apply status filter (for non-feedback views)
            if (view !== 'feedback' && status && status !== 'all') {
                if (status === 'pending' || status === 'registered') {
                    workingList = workingList.filter((item) => item.status === 'registered' || item.status === 'pending');
                } else {
                    workingList = workingList.filter((item) => item.status === status);
                }
            }

            // Apply search filter
            const searchTrim = String(search || '').trim().toLowerCase();
            if (searchTrim) {
                workingList = workingList.filter((item) => {
                    if (view === 'feedback') {
                        return (
                            item.studentName?.toLowerCase().includes(searchTrim) ||
                            item.registrationToken?.toLowerCase().includes(searchTrim) ||
                            item.comments?.toLowerCase().includes(searchTrim)
                        );
                    }
                    const stu = item.studentId || item.student || {};
                    return (
                        stu.name?.toLowerCase().includes(searchTrim) ||
                        stu.studentEmail?.toLowerCase().includes(searchTrim) ||
                        stu.studentMobile?.includes(searchTrim) ||
                        stu.collegeName?.toLowerCase().includes(searchTrim) ||
                        stu.admissionCourse?.toLowerCase().includes(searchTrim) ||
                        stu.preferredDistrict?.toLowerCase().includes(searchTrim) ||
                        item.registrationToken?.toLowerCase().includes(searchTrim)
                    );
                });
            }

            // Sort newest first by registration token / timestamp
            workingList = [...workingList].sort((a, b) => {
                const ta = a.createdAt || a.submittedAt || '';
                const tb = b.createdAt || b.submittedAt || '';
                return String(tb).localeCompare(String(ta));
            });

            // Export handler (`xlsx`, `csv`, or `pdf`)
            if (exportFormat) {
                const fmt = String(exportFormat).toLowerCase();
                if (!can(req.user?.role, 'scholarship_exam:export') && !can(req.user?.role, 'reports:export')) {
                    return res.status(403).json({
                        success: false,
                        message: 'Forbidden: Insufficient privileges to export scholarship records',
                    });
                }

                if (!['xlsx', 'csv', 'pdf'].includes(fmt)) {
                    return res.status(400).json({
                        success: false,
                        message: "Export format must be 'xlsx', 'csv', or 'pdf'",
                    });
                }

                const studentColumns = [
                    { header: 'Application No', key: 'applicationNumber', width: 18 },
                    { header: 'Candidate Name', key: 'name', width: 24 },
                    { header: 'Gender', key: 'gender', width: 10 },
                    { header: 'DOB', key: 'dob', width: 14 },
                    { header: 'Mobile', key: 'mobile', width: 15 },
                    { header: 'Email', key: 'email', width: 24 },
                    { header: 'Community', key: 'community', width: 12 },
                    { header: 'Aadhaar (Masked)', key: 'maskedAadhaar', width: 18 },
                    { header: '+2 Group', key: 'plus2Group', width: 14 },
                    { header: 'Expected Cut-Off', key: 'cutOff', width: 14 },
                    { header: 'Preferred College', key: 'college', width: 28 },
                    { header: 'Preferred Course', key: 'course', width: 26 },
                    { header: 'Elective', key: 'elective', width: 14 },
                    { header: 'Medium', key: 'medium', width: 12 },
                    { header: 'Exam Status', key: 'status', width: 14 },
                    { header: 'Score', key: 'scoreDisplay', width: 12 },
                    { header: 'Percentage', key: 'percentageDisplay', width: 12 },
                ];

                const exportRows = (view === 'feedback' ? allUnified : workingList).map((u) => ({
                    applicationNumber: u.registrationToken || '',
                    name: u.studentId?.name || '',
                    gender: u.studentId?.gender || '',
                    dob: u.studentId?.dateOfBirth || '',
                    mobile: u.studentId?.studentMobile || '',
                    email: u.studentId?.studentEmail || '',
                    community: u.studentId?.community || '',
                    maskedAadhaar: u.studentId?.maskedAadhaar || '',
                    plus2Group: u.studentId?.plus2Group || '',
                    cutOff: u.studentId?.expectedCutOff ?? '',
                    college: u.studentId?.collegeName || '',
                    course: u.studentId?.admissionCourse || '',
                    elective: u.optionalSubject || u.studentId?.selectedElective || '',
                    medium: u.language || u.studentId?.examLanguage || '',
                    status: u.status || 'registered',
                    scoreDisplay: u.status === 'completed' ? `${u.score}/${u.totalQuestions}` : '-',
                    percentageDisplay: u.status === 'completed' ? `${u.percentage}%` : '-',
                }));

                const feedbackCols = [
                    { header: 'Application No', key: 'registrationToken', width: 18 },
                    { header: 'Student Name', key: 'studentName', width: 22 },
                    { header: 'Overall Rating', key: 'overallRating', width: 14, type: 'number' },
                    { header: 'Difficulty', key: 'difficultyRating', width: 14 },
                    { header: 'Clarity', key: 'clarityRating', width: 12, type: 'number' },
                    { header: 'Portal UX', key: 'uiRating', width: 12, type: 'number' },
                    { header: 'Medium', key: 'language', width: 12 },
                    { header: 'Comments', key: 'comments', width: 40 },
                    { header: 'Submitted At', key: 'submittedAt', width: 22 },
                ];

                const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);

                await recordAudit(req, {
                    action: 'scholarship.export',
                    resourceType: 'scholarship_exam',
                    summary: { format: fmt, view, rowCount: view === 'feedback' ? feedbackList.length : exportRows.length },
                }).catch(() => {});

                if (fmt === 'xlsx') {
                    const buffer = buildXlsx({
                        sheets: [
                            {
                                name: 'Students_And_Results',
                                title: 'Rasi Foundation — Scholarship Candidates & Scorecards',
                                columns: studentColumns,
                                rows: exportRows,
                            },
                            {
                                name: 'Exam_Feedback',
                                title: 'Rasi Foundation — Scholarship Examination Feedback',
                                columns: feedbackCols,
                                rows: feedbackList,
                            },
                        ],
                    });
                    res.setHeader('Content-Type', XLSX_MIME);
                    res.setHeader('Content-Length', buffer.length);
                    res.setHeader('Content-Disposition', `attachment; filename="Rasi_Scholarship_Report_${stamp}.xlsx"`);
                    return res.status(200).send(buffer);
                }

                if (fmt === 'csv') {
                    const csvBuf = view === 'feedback'
                        ? buildCsvBuffer(feedbackCols, feedbackList)
                        : buildCsvBuffer(studentColumns, exportRows);
                    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
                    res.setHeader('Content-Length', csvBuf.length);
                    res.setHeader('Content-Disposition', `attachment; filename="Rasi_Scholarship_${view}_${stamp}.csv"`);
                    return res.status(200).send(csvBuf);
                }

                const pdfBuf = buildPdfReport({
                    title: 'Scholarship Candidates & Scorecards Report',
                    subtitle: 'Rasi Foundation — Official Scholarship Portal',
                    filters: { status, search: searchTrim || undefined },
                    metrics: [
                        { label: 'Total Candidates', value: String(stats.total) },
                        { label: 'Completed Exams', value: String(stats.completed) },
                        { label: 'Average Score', value: `${stats.avgScore}%` },
                    ],
                    columns: [
                        { header: 'Token', key: 'applicationNumber', width: 16 },
                        { header: 'Candidate Name', key: 'name', width: 22 },
                        { header: 'Mobile', key: 'mobile', width: 14 },
                        { header: 'College', key: 'college', width: 24 },
                        { header: 'Status', key: 'status', width: 12 },
                        { header: 'Score', key: 'scoreDisplay', width: 10 },
                        { header: 'Pct', key: 'percentageDisplay', width: 10 },
                    ],
                    rows: exportRows,
                    footer: 'Confidential — Rasi Foundation Administrative Report',
                });
                res.setHeader('Content-Type', PDF_MIME);
                res.setHeader('Content-Length', pdfBuf.length);
                res.setHeader('Content-Disposition', `attachment; filename="Rasi_Scholarship_Report_${stamp}.pdf"`);
                return res.status(200).send(pdfBuf);
            }

            const pageNum = Math.max(1, Number.parseInt(page, 10) || 1);
            const limitNum = Math.min(100, Math.max(1, Number.parseInt(limit, 10) || 20));
            const totalFiltered = workingList.length;
            const skip = (pageNum - 1) * limitNum;
            const pagedResults = workingList.slice(skip, skip + limitNum);

            return res.status(200).json({
                success: true,
                view,
                results: pagedResults,
                pagination: {
                    page: pageNum,
                    limit: limitNum,
                    total: totalFiltered,
                    pages: Math.max(1, Math.ceil(totalFiltered / limitNum)),
                },
                statistics: stats,
            });
        } catch (error) {
            console.error('[Admin Get Scholarship Results Error]:', error?.name || 'Error');
            return res.status(500).json({ success: false, message: 'Failed to fetch scholarship records' });
        }
    }

    if (req.method === 'DELETE') {
        if (!can(req.user?.role, 'scholarship_exam:manage') && !can(req.user?.role, 'scholarship_exam:edit')) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden: Insufficient privileges to remove examination sessions',
            });
        }

        try {
            const { id } = req.query || {};
            if (!id) {
                return res.status(400).json({ success: false, message: 'Session ID is required' });
            }

            if (!mongoose.Types.ObjectId.isValid(String(id))) {
                return res.status(400).json({
                    success: false,
                    message: 'Authoritative SheetDB scholarship records are read-only from this action; only transient runtime sessions can be cleared.',
                });
            }

            const deleted = await TestSession.findByIdAndDelete(id);
            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: 'Runtime session not found (authoritative SheetDB rows are preserved).',
                });
            }

            invalidateSheetDBStoreCache();
            await recordAudit(req, {
                action: 'scholarship.session.delete',
                resourceType: 'test_session',
                resourceId: id,
                summary: { registrationToken: deleted.registrationToken, status: deleted.status },
            }).catch(() => {});

            return res.status(200).json({ success: true, message: 'Transient runtime session removed successfully' });
        } catch (error) {
            console.error('[Admin Delete Scholarship Session Error]:', error?.name || 'Error');
            return res.status(500).json({ success: false, message: 'Failed to remove session' });
        }
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
}

export default withPermission('scholarship_exam:view', handler);
