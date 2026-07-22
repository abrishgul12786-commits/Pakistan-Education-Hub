import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Calculator, 
  MapPin, 
  ExternalLink, 
  Award, 
  Compass, 
  Search, 
  Phone, 
  Mail, 
  Map, 
  HelpCircle, 
  Bell, 
  ArrowUpRight, 
  Star, 
  CheckCircle,
  FileText,
  Clock,
  TrendingUp,
  School
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { scholarshipsData } from './data/scholarships';
import UniversityFinder from './components/UniversityFinder';
import GpaCalculator from './components/GpaCalculator';
import CounsellingQuiz from './components/CounsellingQuiz';
import ResourceCenter from './components/ResourceCenter';

export default function App() {
  const [activeTab, setActiveTab] = useState<'unis' | 'gpa' | 'quiz' | 'resources'>('unis');
  const [scholarshipSearch, setScholarshipSearch] = useState('');
  const [scholarshipFilter, setScholarshipFilter] = useState<'All' | 'Need-based' | 'Merit-based' | 'International' | 'Government'>('All');

  // Contact form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formBoard, setFormBoard] = useState('Punjab');
  const [formTrack, setFormTrack] = useState('FSc Pre-Engineering');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Filter scholarships
  const filteredScholarships = useMemo(() => {
    return scholarshipsData.filter(sch => {
      const matchSearch = sch.name.toLowerCase().includes(scholarshipSearch.toLowerCase()) || 
                          sch.provider.toLowerCase().includes(scholarshipSearch.toLowerCase()) ||
                          sch.eligibility.toLowerCase().includes(scholarshipSearch.toLowerCase());
      const matchCat = scholarshipFilter === 'All' || sch.category === scholarshipFilter;
      return matchSearch && matchCat;
    });
  }, [scholarshipSearch, scholarshipFilter]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formName && formEmail) {
      setFormSubmitted(true);
    }
  };

  const handleResetForm = () => {
    setFormName('');
    setFormEmail('');
    setFormCity('');
    setFormSubmitted(false);
  };

  // Education Announcements
  const announcements = [
    { id: 1, title: 'FSc Part-2 Results 2026', board: 'BISE Boards (Punjab)', date: 'Expected: August 2026' },
    { id: 2, title: 'HEC Overseas PhD Scholarships', board: 'HEC Islamabad', date: 'Deadline: Dec 20, 2026' },
    { id: 3, title: 'MDCAT 2026 Syllabus Updated', board: 'PMDC National', date: 'Revised curriculum out now' },
    { id: 4, title: 'PEEF Out-of-Province Application', board: 'PEEF Punjab', date: 'Apply by Oct 30, 2026' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 selection:bg-emerald-800 selection:text-white font-sans antialiased">
      
      {/* Top Banner Ticker */}
      <div className="bg-emerald-950 text-emerald-100 py-2.5 px-4 text-xs font-semibold border-b border-emerald-900 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500 text-slate-900 text-[10px] px-1.5 py-0.5 rounded-sm font-bold uppercase tracking-wide">
              LATEST UPDATE
            </span>
            <span className="truncate opacity-95">
              🎓 HEC Undergrad & Benazir Need-Based Scholarship Applications are now active for Fall Semester 2026!
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] opacity-80 font-mono shrink-0">
            <span>📞 HEC Helpline: 111-119-432</span>
            <span>🇵🇰 Ministry of Education Authorized Info</span>
          </div>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-800 text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-800/10 border border-emerald-900/10">
              <GraduationCap className="w-5.5 h-5.5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-black font-sans text-emerald-900 tracking-tight">
                  Ilm Pakistan
                </h1>
                <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold border border-emerald-100 px-1 py-0.2 rounded-full">
                  Portal
                </span>
              </div>
              <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider">
                HEC & BISE Academic Directory
              </p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-gray-600">
            <a href="#university-finder" className="hover:text-emerald-800 transition-colors">
              Universities List
            </a>
            <a href="#calculator-tool" className="hover:text-emerald-800 transition-colors">
              GPA/Board Calculator
            </a>
            <a href="#counselling-wizard" className="hover:text-emerald-800 transition-colors">
              Advisory Quiz
            </a>
            <a href="#resource-download-center" className="hover:text-emerald-800 transition-colors">
              Past Papers & Syllabi
            </a>
            <a href="#scholarships-hub" className="hover:text-emerald-800 transition-colors">
              Scholarships
            </a>
          </nav>

          {/* Quick CTA */}
          <div>
            <a
              href="#student-admissions-alert"
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs transition-all flex items-center gap-1.5"
            >
              Get Admission Alerts
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-950 text-white py-16 md:py-24 relative overflow-hidden">
        {/* Abstract graphics */}
        <div className="absolute -right-40 -top-40 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/15 text-emerald-300 rounded-full border border-emerald-500/25 text-xs font-semibold">
              <Bell className="w-3.5 h-3.5 text-emerald-400" />
              Comprehensive Academic Guide 2026
            </div>

            <h2 className="text-3xl md:text-5xl font-black font-sans tracking-tight leading-tight">
              Empowering Pakistan's Future Through Accessible Education
            </h2>

            <p className="text-emerald-100/80 text-sm md:text-base leading-relaxed max-w-xl">
              Your centralized hub for Matric, FSc, ICS, competitive MDCAT & ECAT preparation, career counseling, HEC-accredited university finders, and free downloadable textbooks.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#interactive-directory-hub"
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-400/30 transition-all flex items-center gap-2"
              >
                Launch Advisory Directory
                <Compass className="w-4 h-4 text-slate-900" />
              </a>
              <a
                href="#scholarships-hub"
                className="px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-extrabold text-sm rounded-xl transition-all"
              >
                Explore HEC Scholarships
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-emerald-800/65">
              <div>
                <span className="block text-2xl font-black text-emerald-300 font-mono">15+</span>
                <span className="text-[10px] text-emerald-100/60 uppercase tracking-widest font-bold">Universities</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-emerald-300 font-mono">9+</span>
                <span className="text-[10px] text-emerald-100/60 uppercase tracking-widest font-bold">bise boards</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-emerald-300 font-mono">10,000+</span>
                <span className="text-[10px] text-emerald-100/60 uppercase tracking-widest font-bold">past papers</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-emerald-300 font-mono">Free</span>
                <span className="text-[10px] text-emerald-100/60 uppercase tracking-widest font-bold">textbooks pdf</span>
              </div>
            </div>

          </div>

          {/* Hero Right: Live Notifications Board */}
          <div className="lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-2xl relative">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <h3 className="text-sm font-bold flex items-center gap-2 text-emerald-300">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  Live Academic Alerts
                </h3>
                <span className="text-[10px] font-mono text-emerald-200/60 font-medium">Updated Real-Time</span>
              </div>

              <div className="space-y-4">
                {announcements.map(ann => (
                  <div key={ann.id} className="flex gap-3 text-xs leading-relaxed group hover:bg-white/5 p-2 rounded-lg transition-all border border-transparent hover:border-white/5">
                    <div className="w-7 h-7 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <School className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {ann.title}
                      </h4>
                      <p className="text-[10px] text-emerald-100/60 font-semibold">{ann.board}</p>
                      <span className="inline-block text-[9px] text-emerald-300 font-mono mt-0.5 bg-emerald-500/10 px-1.5 py-0.2 rounded-sm border border-emerald-500/10">
                        {ann.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 text-center">
                <span className="text-[10px] text-emerald-200/50 leading-relaxed font-semibold">
                  Source: Board of Intermediate and Secondary Education (BISE) Pakistan
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Track Directories of Pakistan */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 font-sans tracking-tight">
            Academic Pathways & Boards
          </h2>
          <p className="text-gray-500 text-xs mt-1.5">
            Understand how secondary, higher secondary and competitive educational programs are structured in Pakistan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-5 rounded-xl border border-gray-100 hover:border-emerald-500 shadow-xs hover:shadow-xs transition-all duration-300">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">Class 9th & 10th</span>
            <h3 className="font-extrabold text-gray-900 mt-3 font-sans text-sm">Matriculation (SSC)</h3>
            <p className="text-xs text-gray-500 leading-relaxed mt-2">
              Regulated by provincial BISE Boards. Grouped into Science (Math, Phys, Chem, Bio/Comp) or Humanities tracks. Compulsory subjects include Islamic Studies, Urdu, and Pak Studies.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-100 hover:border-emerald-500 shadow-xs hover:shadow-xs transition-all duration-300">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">Class 11th & 12th</span>
            <h3 className="font-extrabold text-gray-900 mt-3 font-sans text-sm">Intermediate (HSSC)</h3>
            <p className="text-xs text-gray-500 leading-relaxed mt-2">
              Critical transition phase. Choose between FSc Pre-Medical, FSc Pre-Engineering, ICS (Computer Science), I.Com (Commerce), or FA (Arts). Forms the foundation for professional degrees.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-100 hover:border-emerald-500 shadow-xs hover:shadow-xs transition-all duration-300">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">Post-HSSC Exam</span>
            <h3 className="font-extrabold text-gray-900 mt-3 font-sans text-sm">Entrance Test Prep</h3>
            <p className="text-xs text-gray-500 leading-relaxed mt-2">
              Competitive national exams. MDCAT for MBBS/BDS programs; ECAT and SAT/NET tests for engineering and computing admissions at top institutes like NUST, FAST and GIKI.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-100 hover:border-emerald-500 shadow-xs hover:shadow-xs transition-all duration-300">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">FPSC Exams</span>
            <h3 className="font-extrabold text-gray-900 mt-3 font-sans text-sm">CSS Competitive Exams</h3>
            <p className="text-xs text-gray-500 leading-relaxed mt-2">
              Conducted by Federal Public Service Commission (FPSC). Recruits candidates into elite administrative branches of Civil Services of Pakistan. Requires rigorous study of 12 subjects.
            </p>
          </div>

        </div>
      </section>

      {/* Main Interactive Workspaces (Interactive Console) */}
      <section id="interactive-directory-hub" className="bg-slate-100 py-16 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
              STUDENT TOOLKIT
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 font-sans tracking-tight mt-3">
              Interactive Academic Console
            </h2>
            <p className="text-gray-500 text-xs mt-1.5">
              Select a specialized module below to begin exploring career roadmaps, finding optimal colleges, or calculating aggregate percentages.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <button
              onClick={() => setActiveTab('unis')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold border transition-all ${
                activeTab === 'unis' 
                  ? 'bg-emerald-800 text-white border-emerald-800 shadow-md shadow-emerald-800/10' 
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <School className="w-4 h-4" />
              University Matcher
            </button>
            <button
              onClick={() => setActiveTab('gpa')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold border transition-all ${
                activeTab === 'gpa' 
                  ? 'bg-emerald-800 text-white border-emerald-800 shadow-md shadow-emerald-800/10' 
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Calculator className="w-4 h-4" />
              Board Marks Calculator
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold border transition-all ${
                activeTab === 'quiz' 
                  ? 'bg-emerald-800 text-white border-emerald-800 shadow-md shadow-emerald-800/10' 
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Compass className="w-4 h-4" />
              Career counseling Quiz
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold border transition-all ${
                activeTab === 'resources' 
                  ? 'bg-emerald-800 text-white border-emerald-800 shadow-md shadow-emerald-800/10' 
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Free Textbook Downloads
            </button>
          </div>

          {/* Active Workspace Panel */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'unis' && <UniversityFinder />}
                {activeTab === 'gpa' && <GpaCalculator />}
                {activeTab === 'quiz' && <CounsellingQuiz />}
                {activeTab === 'resources' && <ResourceCenter />}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Scholarships Hub */}
      <section id="scholarships-hub" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
              FINANCIAL ASSISTANCE
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 font-sans tracking-tight mt-3">
              Scholarships & Study Grants
            </h2>
            <p className="text-gray-500 text-xs mt-1">Explore merit and need-based educational funding in Pakistan and global commonwealth plans</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-1">Category:</span>
            {['All', 'Need-based', 'Merit-based', 'Government', 'International'].map((cat) => (
              <button
                key={cat}
                onClick={() => setScholarshipFilter(cat as any)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  scholarshipFilter === cat 
                    ? 'bg-emerald-800 text-white' 
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search bar inside scholarships */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 text-gray-400 w-4.5 h-4.5" />
          <input
            type="text"
            placeholder="Search active HEC/PEEF scholarship programs by criteria or provider..."
            value={scholarshipSearch}
            onChange={(e) => setScholarshipSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-medium"
          />
        </div>

        {/* Scholarships Grid */}
        {filteredScholarships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScholarships.map(sch => (
              <div 
                key={sch.id}
                className="bg-white rounded-xl border border-gray-100 hover:border-emerald-500 hover:shadow-md transition-all duration-300 p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full uppercase">
                      {sch.category}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {sch.deadline}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-gray-900 font-sans leading-snug">
                    {sch.name}
                  </h3>
                  <p className="text-[11px] text-gray-500 font-medium mt-1">
                    Provided by: <span className="text-emerald-800 font-bold">{sch.provider}</span>
                  </p>

                  <div className="mt-4 space-y-2 text-xs">
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <strong className="block text-[10px] text-gray-400 uppercase">Coverage Amount:</strong>
                      <span className="text-gray-700 font-medium">{sch.coverage}</span>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <strong className="block text-[10px] text-gray-400 uppercase">Who Can Apply:</strong>
                      <span className="text-gray-700 font-medium">{sch.eligibility}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-semibold">HEC Registered Scheme</span>
                  <a
                    href={sch.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-emerald-800 hover:text-emerald-700 flex items-center gap-1 transition-colors"
                  >
                    Apply Now
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl border border-dashed border-gray-200 p-12 text-center">
            <Award className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-xs text-gray-400 font-medium">No scholarships found matching search parameters</p>
          </div>
        )}
      </section>

      {/* Local admissions alert subscription registration */}
      <section id="student-admissions-alert" className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white py-16 border-t border-emerald-950/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="max-w-xl mx-auto space-y-3">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest">STAY INFORMED</span>
            <h2 className="text-2xl md:text-3xl font-black font-sans tracking-tight">
              Get Free Admission & Board Exam Alerts
            </h2>
            <p className="text-emerald-100/80 text-xs">
              Subscribe with your details to receive customized notifications regarding university deadlines (NUST, FAST, LUMS), Entry Test registration, and board result schedules directly in your inbox.
            </p>
          </div>

          <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-xl text-left max-w-2xl mx-auto border border-emerald-700/20">
            {formSubmitted ? (
              <div className="text-center py-6 space-y-4 animate-fadeIn">
                <div className="inline-flex p-3 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Subscription Registered!</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Thank you, <strong>{formName}</strong>. We have set up academic notification alerts for <strong>{formTrack}</strong>. Check your inbox (<strong>{formEmail}</strong>) soon.
                  </p>
                </div>
                <button
                  onClick={handleResetForm}
                  className="px-4 py-2 border border-gray-200 text-gray-600 hover:text-gray-900 rounded-lg text-xs font-bold transition-all"
                >
                  Register Another Student
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Student Full Name</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Zainab Bibi"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-hidden text-gray-800 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="e.g. student@gmail.com"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-hidden text-gray-800 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">City of Residence</label>
                    <input
                      type="text"
                      value={formCity}
                      onChange={(e) => setFormCity(e.target.value)}
                      placeholder="e.g. Faisalabad"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-hidden text-gray-800 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Local Province/Board</label>
                    <select
                      value={formBoard}
                      onChange={(e) => setFormBoard(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-hidden text-gray-700 font-semibold"
                    >
                      <option value="Punjab">Punjab Board (BISE Lahore etc.)</option>
                      <option value="Sindh">Sindh Board (BISE Karachi etc.)</option>
                      <option value="KPK">KPK Board (BISE Peshawar etc.)</option>
                      <option value="Balochistan">Balochistan Board (BISE Quetta)</option>
                      <option value="Federal">Federal Board (FBISE)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Interest Stream</label>
                    <select
                      value={formTrack}
                      onChange={(e) => setFormTrack(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-hidden text-gray-700 font-semibold"
                    >
                      <option value="FSc Pre-Engineering">FSc Pre-Engineering</option>
                      <option value="FSc Pre-Medical">FSc Pre-Medical</option>
                      <option value="ICS Computer Science">ICS Computer Science</option>
                      <option value="Competitive CSS">FPSC CSS preparation</option>
                      <option value="BS Universities Admission">BS University Match</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-md hover:shadow-lg transition-all"
                  >
                    Activate Free Notifications
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 bg-emerald-800 text-white rounded-lg flex items-center justify-center">
                <GraduationCap className="w-4.5 h-4.5" />
              </div>
              <span className="text-sm font-bold tracking-tight">Ilm Pakistan Education Portal</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Providing highly organized directories, interactive GPA board calculators, comprehensive university matchers, and downloadable curriculum guides for Pakistani students. Empowering the next generation.
            </p>
            <p className="text-[10px] text-gray-500">
              Disclaimer: All textbook assets and board metrics are compiled from respective public provincial board publications. We maintain compliance with educational information standardizations of Pakistan.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Provincial Boards</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="https://www.biselahore.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">BISE Lahore (Punjab)</a></li>
              <li><a href="https://bisekarchi.edu.pk" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">BISE Karachi (Sindh)</a></li>
              <li><a href="https://www.fbise.edu.pk" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">FBISE Islamabad (Federal)</a></li>
              <li><a href="https://www.bisep.com.pk" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">BISE Peshawar (KPK)</a></li>
              <li><a href="http://bbisequetta.edu.pk" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">BBISE Quetta (Balochistan)</a></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Academic Helpline</h4>
            <p className="text-xs leading-relaxed text-gray-400">
              For immediate questions regarding university equivalency certificates or national scholarships:
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>HEC Call Center: (051) 111-119-432</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>support@ilm-pakistan.org</span>
              </div>
              <div className="flex items-center gap-2">
                <Map className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Sector H-9, Higher Education Commission, Islamabad</span>
              </div>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-800 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} Ilm Pakistan. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-emerald-400">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-400">Terms of Service</a>
            <a href="#" className="hover:text-emerald-400">HEC Compliance</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
