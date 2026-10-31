/**
 * SheetDB Configuration for Rasi Foundation Scholarship Migration
 * 
 * Strict safety rules:
 * - Reads SHEETDB_URL server-side only.
 * - Targets ONLY the 3 dedicated scholarship tabs.
 * - Sheet1 (Bio Data) is strictly protected and never touched.
 */

export const SHEETDB_CONFIG = {
    getUrl: () => {
        const url = process.env.SHEETDB_URL;
        if (!url) {
            console.warn('[SheetDB Config] Warning: process.env.SHEETDB_URL is not set.');
        }
        return url;
    },
    tabs: {
        STUDENTS: 'Scholarship_Students',
        RESULTS: 'Scholarship_Results',
        FEEDBACK: 'Scholarship_Feedback',
    },
    timeoutMs: 8000, // 8-second request abort timeout
    maxRetries: 3,
    initialRetryDelayMs: 1000,
    maxRetryDelayMs: 8000,
};
