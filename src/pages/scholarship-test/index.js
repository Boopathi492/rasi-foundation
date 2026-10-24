import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  FaClipboardCheck, FaAtom, FaFlask, FaCalculator, FaLeaf, FaDna, FaArrowRight, FaClock, FaQuestionCircle,
  FaTrophy, FaShieldAlt, FaCheckCircle, FaCalendarCheck, FaFileSignature, FaUserGraduate, FaHandsHelping, FaPhone,
  FaKey, FaInfoCircle,
} from 'react-icons/fa';
import Layout from '@/frontend/components/Layout';
import PageBanner from '@/frontend/components/PageBanner';
import Faq from '@/frontend/components/Faq';
import Reveal from '@/frontend/components/home/Reveal';
import BannerCrop from '@/frontend/components/home/BannerCrop';
import { CONTACT, ROUTES } from '@/data/siteConfig';

// Test facts below are taken from the previous version of this page and the test flow in /scholarship-test/*.
const FEATURES = [
  { icon: FaClipboardCheck, title: 'Multiple Choice Questions', text: 'Simple choose-the-best-answer format with 1 mark per question.' },
  { icon: FaClock, title: '90 Minutes Duration', text: 'Time to complete all questions at your own pace.' },
  { icon: FaQuestionCircle, title: 'Random Questions', text: 'A unique question set for each student.' },
  { icon: FaTrophy, title: 'Instant Results', text: 'See your score right after you submit the test.' },
];

const SUBJECTS = [
  { name: 'Physics', icon: FaAtom, required: true },
  { name: 'Chemistry', icon: FaFlask, required: true },
  { name: 'Mathematics', icon: FaCalculator, required: false },
  { name: 'Botany', icon: FaLeaf, required: false },
  { name: 'Zoology', icon: FaDna, required: false },
  { name: 'Biology', icon: FaDna, required: false },
];

const STEPS = [
  { step: '01', title: 'Register', text: 'Fill in your personal and academic details in the registration form.' },
  { step: '02', title: 'Select Subject', text: 'Choose your third elective subject based on your +2 group.' },
  { step: '03', title: 'Take Test', text: 'Answer all questions within 90 minutes and submit to get your result.' },
];

const SERVICES = [
  { icon: FaInfoCircle, title: 'Scholarship information', text: 'We help students find out about scholarship options and what each one asks for.' },
  { icon: FaClipboardCheck, title: 'Rasi Foundation scholarship test', text: 'An online test you can register for and take using your registration token.' },
  { icon: FaFileSignature, title: 'Application and document guidance', text: 'A counsellor explains the academic and identification documents an application is likely to need and how to submit them.' },
  { icon: FaHandsHelping, title: 'Counselling support', text: 'One-to-one guidance on how scholarships fit into your course and college plan.' },
];

const FAQS = [
  { q: 'Does taking the test guarantee a scholarship?', a: 'No. Eligibility and outcomes depend on each scholarship’s own rules. Rasi Foundation cannot guarantee a scholarship, financial assistance or admission.' },
  { q: 'What is the format of the online test?', a: 'It is a multiple choice test. Each question carries 1 mark, the duration is 90 minutes, and each student receives a random set of questions. Your score is shown after you submit.' },
  { q: 'Which subjects are in the test?', a: 'Physics and Chemistry are compulsory. You then choose one elective from Mathematics, Botany, Zoology or Biology, based on your +2 group.' },
  { q: 'Which syllabus does the test follow?', a: 'The curriculum is the Tamil Nadu State Board, Class 12.' },
  { q: 'I have already registered. How do I start?', a: 'Choose “Registered? Login” on this page, enter your registration token, then select your elective subject and begin the test.' },
  { q: 'Who can I contact if I have a problem?', a: `Use the Contact Support button or call ${CONTACT.phoneDisplay}.` },
];

export default function ScholarshipTestPage() {
  const router = useRouter();
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleTokenSubmit = (e) => {
    e.preventDefault();
    if (!token.trim()) {
      setError('Please enter your registration token');
      return;
    }
    setError('');
    // Navigate to subject selection with token
    router.push(`/scholarship-test/select-subject?token=${encodeURIComponent(token.trim())}`);
  };

  return (
    <Layout
      title="Scholarship Test"
      description="Rasi Foundation scholarship guidance and online scholarship test for students in Tamil Nadu."
      keywords="scholarship test, RASI Foundation scholarship, online exam, engineering scholarship Tamil Nadu"
    >
      {/* 1. Hero */}
      <PageBanner
        eyebrow="Scholarship Support"
        title="Scholarship guidance and the Rasi online test"
        actions={
          <>
            <Link href="/scholarship-test/register" className="rf-btn-gold px-6 py-3">Register Now <FaArrowRight aria-hidden="true" /></Link>
            <button
              type="button"
              aria-expanded={showTokenInput}
              aria-controls="test-login"
              onClick={() => setShowTokenInput((v) => !v)}
              className="rf-btn border border-white/40 px-6 py-3 text-white hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-forest"
            >
              <FaKey aria-hidden="true" /> Registered? Login
            </button>
          </>
        }
        aside={
          <Reveal>
            <BannerCrop
              src="/images/banners/hero-5-students-today-leaders-tomorrow.png"
              alt="Students walking together on a college campus"
              region={{ x: 900, y: 100, w: 580, h: 580 }}
              sizes="(min-width: 1024px) 35vw, 90vw"
              className="mx-auto aspect-square max-w-sm rounded-[3rem] shadow-card-hover ring-8 ring-white/20"
            />
          </Reveal>
        }
      >
        We help students learn about scholarship options, and you can register for the Rasi Foundation online scholarship test. Curriculum: Tamil Nadu State Board, Class 12.
      </PageBanner>

      {/* Registered student login (existing token flow) */}
      {showTokenInput && (
        <section id="test-login" aria-labelledby="login-heading" className="bg-[#fbfaf6] pt-2">
          <div className="container mx-auto">
            <form onSubmit={handleTokenSubmit} noValidate className="mx-auto max-w-xl rounded-3xl border border-gray-100 bg-white p-6 shadow-card-hover">
              <h2 id="login-heading" className="font-heading text-xl font-bold text-gray-900">Enter your registration token</h2>
              <label htmlFor="reg-token" className="mt-4 block text-sm font-medium text-gray-700">Registration token</label>
              <input
                id="reg-token"
                type="text"
                autoFocus
                autoComplete="off"
                value={token}
                onChange={(e) => setToken(e.target.value.toUpperCase())}
                placeholder="RASI-XXX-XXX"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'reg-token-error' : undefined}
                className="mt-1 w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-center text-lg font-bold uppercase tracking-widest focus:border-forest focus:outline-none focus-visible:ring-2 focus-visible:ring-forest/30"
              />
              {error && <p id="reg-token-error" role="alert" className="mt-2 text-sm font-semibold text-crimson">{error}</p>}
              <button type="submit" className="rf-btn-primary mt-4 w-full !rounded-full py-3">Begin Assessment <FaArrowRight aria-hidden="true" /></button>
            </form>
          </div>
        </section>
      )}

      {/* 2. Service explanation */}
      <section aria-labelledby="service-heading" className="bg-[#fbfaf6] py-14 md:py-16">
        <div className="container mx-auto">
          <div className="mb-8 max-w-2xl">
            <p className="rf-eyebrow">What we offer</p>
            <h2 id="service-heading" className="mt-1 font-heading text-3xl font-bold text-gray-900 md:text-4xl">Scholarship guidance, step by step</h2>
            <p className="mt-3 text-gray-600">
              Eligibility and outcomes depend on each scholarship’s own rules; Rasi Foundation cannot guarantee a scholarship,
              financial assistance or admission.
            </p>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {SERVICES.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.06} className="rf-card p-6 transition-shadow hover:shadow-card-hover">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-crimson/10 text-xl text-crimson"><s.icon aria-hidden="true" /></span>
                <h3 className="font-sans text-lg font-semibold text-gray-900">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{s.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Online test overview */}
      <section aria-labelledby="test-heading" className="bg-gradient-to-br from-forest-dark to-forest py-14 text-white md:py-16">
        <div className="container mx-auto">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold-300">Online test</p>
            <h2 id="test-heading" className="mt-1 font-heading text-3xl font-bold md:text-4xl">How the scholarship test works</h2>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 0.06} className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold-400 text-lg text-forest-dark"><f.icon aria-hidden="true" /></span>
                <h3 className="font-sans text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-white/80">{f.text}</p>
              </Reveal>
            ))}
          </ul>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/15 bg-white/10 p-6">
              <h3 className="mb-4 flex items-center gap-2 font-sans text-lg font-semibold"><FaShieldAlt className="text-gold-300" aria-hidden="true" /> Compulsory subjects</h3>
              <ul className="space-y-3">
                {SUBJECTS.filter((s) => s.required).map((s) => (
                  <li key={s.name} className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
                    <span className="flex items-center gap-3 font-semibold"><s.icon className="text-gold-300" aria-hidden="true" /> {s.name}</span>
                    <span className="rounded-full bg-gold-400/20 px-3 py-1 text-xs font-semibold text-gold-300">Required</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/10 p-6">
              <h3 className="mb-4 flex items-center gap-2 font-sans text-lg font-semibold"><FaCheckCircle className="text-gold-300" aria-hidden="true" /> Elective: choose one</h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {SUBJECTS.filter((s) => !s.required).map((s) => (
                  <li key={s.name} className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 font-semibold">
                    <s.icon className="text-gold-300" aria-hidden="true" /> {s.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Steps and application guidance */}
      <section aria-labelledby="steps-heading" className="bg-white py-14 md:py-16">
        <div className="container mx-auto grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="rf-eyebrow">How it works</p>
            <h2 id="steps-heading" className="mt-1 font-heading text-3xl font-bold text-gray-900 md:text-4xl">Three steps to take the test</h2>
            <ol className="mt-6 space-y-4">
              {STEPS.map((s, i) => (
                <Reveal as="li" key={s.step} delay={i * 0.07} className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-[#fbfaf6] p-5 shadow-sm">
                  <span aria-hidden="true" className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-crimson font-heading text-xl font-bold text-white">{s.step}</span>
                  <div>
                    <h3 className="font-sans text-lg font-semibold text-gray-900">{s.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          <Reveal delay={0.08} className="self-start rounded-3xl bg-gradient-to-br from-[#7d0a1f] to-crimson p-7 text-white shadow-card-hover">
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-xl"><FaUserGraduate aria-hidden="true" /></span>
            <h3 className="font-heading text-2xl font-bold">Application and document help</h3>
            <p className="mt-3 text-sm text-white/90">
              Not sure which scholarship suits you or which documents to submit? A counsellor can walk you through the options and the
              steps, and tell you what each scholarship asks for.
            </p>
            <Link href={ROUTES.counselling} className="rf-btn-gold mt-5 px-6 py-3"><FaCalendarCheck aria-hidden="true" /> Book Counselling</Link>
          </Reveal>
        </div>
      </section>

      {/* 5. FAQs */}
      <section aria-labelledby="sch-faq-heading" className="bg-[#fbfaf6] py-14 md:py-16">
        <div className="container mx-auto">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <p className="rf-eyebrow">FAQs</p>
            <h2 id="sch-faq-heading" className="mt-1 font-heading text-3xl font-bold text-gray-900 md:text-4xl">Scholarship questions</h2>
          </div>
          <Faq items={FAQS} idPrefix="sch-faq" />
        </div>
      </section>

      {/* 6. Support and counselling CTA */}
      <section aria-labelledby="sch-cta" className="bg-white py-16">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-forest-dark to-forest px-8 py-12 text-center text-white">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gold-400" />
            <h2 id="sch-cta" className="font-heading text-3xl font-bold md:text-4xl">Questions about scholarships or the test?</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/85">Book a counselling session, or contact us if you have trouble with registration or login.</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={ROUTES.counselling} className="rf-btn-gold px-7 py-3"><FaCalendarCheck aria-hidden="true" /> Book Counselling</Link>
              <Link href="/contact" className="rf-btn border border-white/40 px-7 py-3 text-white hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-forest">Contact Support</Link>
              <a href={`tel:${CONTACT.phoneTel}`} className="rf-btn border border-white/40 px-7 py-3 text-white hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-forest"><FaPhone aria-hidden="true" /> {CONTACT.phoneDisplay}</a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
