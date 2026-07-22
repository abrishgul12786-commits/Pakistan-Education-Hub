import React, { useState } from 'react';
import { HelpCircle, ArrowRight, ArrowLeft, RefreshCw, Trophy, BookOpen, Star, Sparkles } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: {
    label: string;
    value: string;
    description: string;
  }[];
}

export default function CounsellingQuiz() {
  const [step, setStep] = useState<number>(0); // 0: Start, 1-4: Questions, 5: Result
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions: Question[] = [
    {
      id: 1,
      text: 'What is your current academic stage or qualification?',
      options: [
        { label: 'Matric / Class 10 Student', value: 'matric', description: 'Deciding on FSc Pre-Medical, Pre-Engineering, ICS, or I.Com' },
        { label: 'Intermediate / FSc / ICS / FA Student', value: 'inter', description: 'Deciding on university degrees, ECAT, MDCAT, or CSS tracks' },
        { label: 'Undergraduate / University Student or Graduate', value: 'grad', description: 'Looking into competitive exams (CSS), masters, or freelancing' }
      ]
    },
    {
      id: 2,
      text: 'Which domain excites your interest the most?',
      options: [
        { label: 'Coding, Apps & Artificial Intelligence', value: 'tech', description: 'Working on laptops, solving puzzles, building software products' },
        { label: 'Human Anatomy, Medicine & Saving Lives', value: 'medical', description: 'Understanding biology, clinical care, hospital workflows' },
        { label: 'Machines, Civil Structures, Physics & Mathematics', value: 'engineering', description: 'Designing bridges, circuits, automotive design, mathematical modeling' },
        { label: 'Business, Corporate Finance & Entrepreneurship', value: 'business', description: 'Stocks, trading, start-ups, accounting, marketing strategy' },
        { label: 'National Policies, Bureaucracy & Writing Essays', value: 'civil', description: 'General Knowledge, geopolitical affairs, executive public service' }
      ]
    },
    {
      id: 3,
      text: 'What is your ideal immediate priority in Pakistan?',
      options: [
        { label: 'Earning foreign currency (Freelancing / Remote)', value: 'income', description: 'Entering the software export market quickly to earn in USD' },
        { label: 'Securing a prestigious, stable permanent job', value: 'stable', description: 'Government grade-17 positions, state institutions, or elite healthcare' },
        { label: 'Doing research, academic innovation, or moving abroad', value: 'abroad', description: 'Preparing for fully-funded international master\'s & PhD programs' },
        { label: 'Managing family businesses or starting a company', value: 'business_own', description: 'Hands-on practical trade, local startups, corporate leadership' }
      ]
    },
    {
      id: 4,
      text: 'How much time can you commit before you need to earn actively?',
      options: [
        { label: 'Short-term (3 to 6 months)', value: 'short', description: 'Need immediate skill-acquisition and rapid monetization' },
        { label: 'Standard-term (4-year Bachelor\'s Degree)', value: 'medium', description: 'Traditional college degrees with proper professional licensing' },
        { label: 'Long-term (5+ years of intense professional training)', value: 'long', description: 'Clinical medical residencies, PhD tracks, or elite corporate CA pathways' }
      ]
    }
  ];

  const handleSelectOption = (qId: number, val: string) => {
    setAnswers(prev => ({ ...prev, [qId]: val }));
    if (step < questions.length) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setStep(0);
  };

  // Advisory logic for Pakistani students
  const getAdvisoryResult = () => {
    const q1 = answers[1];
    const q2 = answers[2];
    const q3 = answers[3];
    const q4 = answers[4];

    if (q2 === 'tech' || (q2 === 'business' && q3 === 'income')) {
      return {
        title: 'BS Computer Science & Software Engineering (With Freelance Track)',
        scope: 'Software export is Pakistan\'s fastest-growing IT sector. Programmers with modern skillsets are earning in USD from platforms like Upwork and Fiverr while residing in Pakistan.',
        recommendedSteps: [
          'Choose ICS in Inter or BS CS / SE at university level.',
          'Focus heavily on top universities like FAST-NUCES, NUST, or COMSATS.',
          'Start learning Web Development (React, Node.js) or AI tooling alongside college coursework.',
          'Leverage Government-sponsored free learning initiatives such as DigiSkills.pk or NAVTTC.'
        ],
        badge: 'Top Choice for High Income & Remote Work',
        suitabilityScore: '98%'
      };
    }

    if (q2 === 'medical' || q4 === 'long') {
      return {
        title: 'MBBS / BDS or BS Allied Health Sciences (with MDCAT Prep)',
        scope: 'Medicine remains highly respected in Pakistani society. However, competition is intense with over 100,000+ applicants competing for limited seats via the national MDCAT exam.',
        recommendedSteps: [
          'Choose FSc Pre-Medical with biology focus.',
          'Begin rigorous MDCAT preparation immediately after Class 12 exams.',
          'Aim for top public-sector institutes like King Edward Medical University or Dow University of Health Sciences.',
          'Explore alternatives like Doctor of Physical Therapy (DPT) or BS Biotechnology if public seats are extremely competitive.'
        ],
        badge: 'Top Choice for Healthcare & Clinical Service',
        suitabilityScore: '94%'
      };
    }

    if (q2 === 'civil' || q3 === 'stable') {
      return {
        title: 'Central Superior Services (CSS) / Civil Bureaucracy Track',
        scope: 'The CSS competitive exam conducted by the FPSC opens direct entry into Grade-17 executive bureaucracy in Pakistan (PAS, Police, Foreign Service, Customs). It represents unmatched social influence and professional security.',
        recommendedSteps: [
          'Pursue any high-quality BS Degree focusing on English, History, or Political Science.',
          'Develop strong English essay-writing skills and comprehensive general knowledge of Pakistani Affairs.',
          'Read Dawn newspaper daily and keep abreast of national policy challenges.',
          'Plan to sit for the FPSC CSS exam upon completion of your Bachelor\'s degree (minimum 14 years of education).'
        ],
        badge: 'Top Choice for National Leadership & Job Security',
        suitabilityScore: '96%'
      };
    }

    if (q2 === 'engineering') {
      return {
        title: 'BS Engineering (NUST / GIKI / UET Pathways)',
        scope: 'Engineering provides structural, architectural, and systemic skills. While civil/mechanical industries in Pakistan are evolving, electrical and software-integrated engineering fields are in extremely high demand.',
        recommendedSteps: [
          'Select FSc Pre-Engineering in Intermediate.',
          'Prepare for NUST NET, GIKI Admission Test, or UET ECAT.',
          'Focus on emerging sub-disciplines like Mechatronics, Robotics, or Renewable Energy Engineering.',
          'Build strong logical foundations and secure internships early in local manufacturing or construction giants.'
        ],
        badge: 'Top Choice for Technical Innovators',
        suitabilityScore: '91%'
      };
    }

    // Default Business & Entrepreneurship fallback
    return {
      title: 'BBA / BS Finance or Chartered Accountancy (CA / ACCA)',
      scope: 'The financial and corporate sectors in Pakistan offer rapid, lucrative career climbs. Chartered Accountancy via ICAP has a nearly 100% employment rate and provides premium global mobility.',
      recommendedSteps: [
        'Pursue I.Com or FSc, then join BS Accounting & Finance or CA track.',
        'Target premier schools such as LUMS, IBA Karachi, or enroll directly in ICAP-registered RAETs.',
        'Gain intermediate proficiency in analytical tools like MS Excel and data visualization.',
        'Focus on corporate audit, corporate finance, or starting your own digital trade/e-commerce company.'
      ],
      badge: 'Top Choice for Business Leadership',
      suitabilityScore: '95%'
    };
  };

  const result = step === 5 ? getAdvisoryResult() : null;

  return (
    <div id="counselling-wizard" className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-2xl p-6 md:p-8 shadow-xl border border-emerald-900 relative overflow-hidden">
      {/* Decorative vector shapes */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {step === 0 && (
        <div className="text-center py-6 max-w-xl mx-auto space-y-5">
          <div className="inline-flex p-3 bg-emerald-500/15 text-emerald-300 rounded-full ring-4 ring-emerald-500/5 animate-pulse">
            <Sparkles className="w-8 h-8" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl font-extrabold font-sans tracking-tight">
              Ilm Career Counseling Advisor
            </h3>
            <p className="text-emerald-100/70 text-sm">
              Confused about choosing FSc, ICS, medical, IT or preparation for CSS? Take this 1-minute smart advisor quiz to find your recommended pathway in Pakistan.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-400/30 transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              Start Free Consultation
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-6 pt-4 text-xs text-emerald-200/50 font-mono">
            <span>✓ Matric Guidance</span>
            <span>✓ FSc/ICS Advice</span>
            <span>✓ Scope in Pakistan</span>
          </div>
        </div>
      )}

      {step > 0 && step <= 4 && (
        <div className="space-y-6">
          {/* Progress bar */}
          <div className="flex items-center justify-between gap-4">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Question {step} of 4</span>
            <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden max-w-xs">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
            {step > 1 && (
              <button
                onClick={handleBack}
                className="flex items-center gap-1 text-xs text-emerald-200/70 hover:text-white transition-all font-semibold"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            )}
          </div>

          {/* Question Text */}
          <h3 className="text-lg md:text-xl font-bold font-sans tracking-tight text-white/95">
            {questions[step - 1].text}
          </h3>

          {/* Options list */}
          <div className="grid grid-cols-1 gap-3">
            {questions[step - 1].options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelectOption(step, opt.value)}
                className="w-full text-left p-4 bg-slate-800/50 hover:bg-emerald-950/40 hover:border-emerald-500 border border-slate-800 rounded-xl transition-all duration-200 group relative flex flex-col gap-1"
              >
                <span className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {opt.label}
                </span>
                <span className="text-xs text-emerald-100/60 leading-relaxed">
                  {opt.description}
                </span>
                <ArrowRight className="w-4 h-4 text-emerald-500/0 group-hover:text-emerald-400/100 absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-200" />
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 5 && result && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-emerald-900/50">
            <div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-emerald-400" /> Recommended Pathway
              </span>
              <h3 className="text-xl md:text-2xl font-black font-sans text-white mt-1 leading-snug">
                {result.title}
              </h3>
            </div>
            <div className="bg-emerald-500 text-slate-900 font-bold text-xs px-3 py-1.5 rounded-lg shrink-0 self-start md:self-auto">
              {result.badge}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div>
                <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1">Career & Industry Scope in Pakistan</h4>
                <p className="text-sm text-emerald-50/80 leading-relaxed bg-slate-800/30 p-4 rounded-xl border border-slate-800/50">
                  {result.scope}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-2">Step-by-Step Strategic Roadmap</h4>
                <ul className="space-y-2.5">
                  {result.recommendedSteps.map((stepStr, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs text-emerald-100/90 leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 border border-emerald-500/30">
                        {idx + 1}
                      </span>
                      <span>{stepStr}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5 bg-emerald-900/30 border border-emerald-800 p-5 rounded-xl space-y-4">
              <div className="text-center">
                <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest block">Compatibility Match</span>
                <span className="text-4xl font-black font-sans text-emerald-400 mt-1 block">{result.suitabilityScore}</span>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-emerald-800/80 text-[11px] text-emerald-100/70 leading-relaxed">
                <p>
                  <strong>💡 Admission Note:</strong> For university entry in IT and Engineering programs, continuous practice of analytical math from Board books is critical.
                </p>
                <p>
                  For Medical tracks, the MDCAT test requires complete mastery of biological concepts, physical equations, and chemical reactions.
                </p>
              </div>

              <button
                onClick={handleRestart}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Retake Consultation Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
