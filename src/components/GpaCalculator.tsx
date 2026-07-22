import React, { useState } from 'react';
import { Calculator, Award, RotateCcw, AlertCircle, FileSpreadsheet } from 'lucide-react';
import { motion } from 'motion/react';

interface SubjectInput {
  name: string;
  marksObtained: number;
  totalMarks: number;
}

export default function GpaCalculator() {
  const [calcMode, setCalcMode] = useState<'quick' | 'detailed'>('quick');
  const [educationLevel, setEducationLevel] = useState<'matric' | 'inter'>('inter');
  const [selectedGroup, setSelectedGroup] = useState<'pre-med' | 'pre-eng' | 'ics' | 'commerce'>('pre-eng');
  
  // Quick Calculator state
  const [obtainedMarks, setObtainedMarks] = useState<string>('935');
  const [totalMarks, setTotalMarks] = useState<string>('1100');
  
  // Detailed subjects state
  const getInitialSubjects = (group: string, level: string): SubjectInput[] => {
    const common = [
      { name: 'English', marksObtained: 75, totalMarks: 100 },
      { name: 'Urdu', marksObtained: 72, totalMarks: 100 },
      { name: 'Islamic Studies / Pak Studies', marksObtained: 38, totalMarks: 50 },
    ];
    
    if (level === 'matric') {
      const matricCommon = [
        { name: 'English', marksObtained: 110, totalMarks: 150 },
        { name: 'Urdu', marksObtained: 112, totalMarks: 150 },
        { name: 'Islamic Studies (Compulsory)', marksObtained: 38, totalMarks: 50 },
        { name: 'Pakistan Studies (Compulsory)', marksObtained: 35, totalMarks: 50 },
        { name: 'Mathematics', marksObtained: 120, totalMarks: 150 },
      ];
      if (group === 'pre-med' || group === 'pre-eng') {
        return [
          ...matricCommon,
          { name: 'Physics', marksObtained: 125, totalMarks: 150 },
          { name: 'Chemistry', marksObtained: 115, totalMarks: 150 },
          { name: group === 'pre-med' ? 'Biology' : 'Computer Science', marksObtained: 122, totalMarks: 150 },
        ];
      }
      return [
        ...matricCommon,
        { name: 'General Science', marksObtained: 110, totalMarks: 150 },
        { name: 'Civics/History', marksObtained: 115, totalMarks: 150 },
        { name: 'Islamic Elective / Computer Study', marksObtained: 120, totalMarks: 150 },
      ];
    }

    // Intermediate (1100 Marks Total)
    const interCommon = [
      { name: 'English (Part I & II)', marksObtained: 145, totalMarks: 200 },
      { name: 'Urdu (Part I & II)', marksObtained: 148, totalMarks: 200 },
      { name: 'Islamic Education (Part I)', marksObtained: 38, totalMarks: 50 },
      { name: 'Pakistan Studies (Part II)', marksObtained: 36, totalMarks: 50 },
    ];

    switch (group) {
      case 'pre-med':
        return [
          ...interCommon,
          { name: 'Physics', marksObtained: 152, totalMarks: 200 },
          { name: 'Chemistry', marksObtained: 148, totalMarks: 200 },
          { name: 'Biology', marksObtained: 162, totalMarks: 200 },
        ];
      case 'pre-eng':
        return [
          ...interCommon,
          { name: 'Mathematics', marksObtained: 158, totalMarks: 200 },
          { name: 'Physics', marksObtained: 152, totalMarks: 200 },
          { name: 'Chemistry', marksObtained: 148, totalMarks: 200 },
        ];
      case 'ics':
        return [
          ...interCommon,
          { name: 'Mathematics', marksObtained: 142, totalMarks: 200 },
          { name: 'Physics / Stats', marksObtained: 135, totalMarks: 200 },
          { name: 'Computer Science', marksObtained: 165, totalMarks: 200 },
        ];
      case 'commerce':
        return [
          ...interCommon,
          { name: 'Accounting', marksObtained: 150, totalMarks: 200 },
          { name: 'Principles of Economics', marksObtained: 142, totalMarks: 200 },
          { name: 'Business Math & Stats', marksObtained: 148, totalMarks: 200 },
        ];
      default:
        return interCommon;
    }
  };

  const [subjects, setSubjects] = useState<SubjectInput[]>(getInitialSubjects('pre-eng', 'inter'));

  const handleGroupChange = (group: 'pre-med' | 'pre-eng' | 'ics' | 'commerce', level: 'matric' | 'inter') => {
    setSelectedGroup(group);
    setSubjects(getInitialSubjects(group, level));
  };

  const handleLevelChange = (level: 'matric' | 'inter') => {
    setEducationLevel(level);
    handleGroupChange(selectedGroup, level);
  };

  const handleSubjectMarkChange = (index: number, val: string) => {
    const num = parseInt(val) || 0;
    const updated = [...subjects];
    // Clamp between 0 and maximum marks
    updated[index].marksObtained = Math.max(0, Math.min(updated[index].totalMarks, num));
    setSubjects(updated);
  };

  // BISE Grade Formula (Pakistani National Standard)
  const calculateBiseGrade = (percentage: number): { grade: string; remarks: string; color: string } => {
    if (percentage >= 80) return { grade: 'A-1', remarks: 'Outstanding / Exceptional', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    if (percentage >= 70) return { grade: 'A', remarks: 'Very Good / Excellent', color: 'bg-teal-50 text-teal-700 border-teal-200' };
    if (percentage >= 60) return { grade: 'B', remarks: 'Good / First Division', color: 'bg-blue-50 text-blue-700 border-blue-200' };
    if (percentage >= 50) return { grade: 'C', remarks: 'Fair / Second Division', color: 'bg-amber-50 text-amber-700 border-amber-200' };
    if (percentage >= 40) return { grade: 'D', remarks: 'Satisfactory / Third Division', color: 'bg-orange-50 text-orange-700 border-orange-200' };
    if (percentage >= 33) return { grade: 'E', remarks: 'Pass / Minimal Competency', color: 'bg-gray-50 text-gray-700 border-gray-200' };
    return { grade: 'F', remarks: 'Fail', color: 'bg-rose-50 text-rose-700 border-rose-200' };
  };

  // MDCAT / ECAT aggregate formula (standard 50% FSC, 50% Entry Test or 10% Matric, 40% FSC, 50% Entry test)
  const [entryTestMarks, setEntryTestMarks] = useState<string>('165');
  const [entryTestTotal, setEntryTestTotal] = useState<string>('200'); // MDCAT standard is 200, ECAT standard is 400
  
  const getQuickPercentage = () => {
    const obt = parseFloat(obtainedMarks) || 0;
    const tot = parseFloat(totalMarks) || 1100;
    return Math.min(100, Math.max(0, (obt / tot) * 100));
  };

  const getDetailedPercentage = () => {
    const totObt = subjects.reduce((sum, s) => sum + s.marksObtained, 0);
    const totMax = subjects.reduce((sum, s) => sum + s.totalMarks, 0);
    return {
      obtained: totObt,
      total: totMax,
      percentage: Math.min(100, Math.max(0, (totObt / totMax) * 100))
    };
  };

  const handleReset = () => {
    setObtainedMarks('935');
    setTotalMarks('1100');
    setSubjects(getInitialSubjects(selectedGroup, educationLevel));
    setEntryTestMarks('165');
  };

  const quickPercentage = getQuickPercentage();
  const quickGradeInfo = calculateBiseGrade(quickPercentage);

  const detailedInfo = getDetailedPercentage();
  const detailedGradeInfo = calculateBiseGrade(detailedInfo.percentage);

  // PMC/HEC Admission Merit Calculator helper
  const getAdmissionAggregate = (fscPercentage: number) => {
    const etObt = parseFloat(entryTestMarks) || 0;
    const etTot = parseFloat(entryTestTotal) || 200;
    const entryPercentage = (etObt / etTot) * 100;
    // HEC standard formula: 50% Intermediate + 50% Entry Test
    const aggregate = (fscPercentage * 0.5) + (entryPercentage * 0.5);
    return Math.min(100, Math.max(0, aggregate));
  };

  const currentFscPercent = calcMode === 'quick' ? quickPercentage : detailedInfo.percentage;
  const meritAggregate = getAdmissionAggregate(currentFscPercent);

  const popularBoards = [
    { name: 'BISE Lahore', prov: 'Punjab' },
    { name: 'BISE Karachi', prov: 'Sindh' },
    { name: 'Federal Board (FBISE)', prov: 'Federal' },
    { name: 'BISE Peshawar', prov: 'KPK' },
    { name: 'BISE Quetta', prov: 'Balochistan' },
    { name: 'BISE Rawalpindi', prov: 'Punjab' },
    { name: 'BISE Multan', prov: 'Punjab' },
    { name: 'BISE Faisalabad', prov: 'Punjab' },
    { name: 'BISE Hyderabad', prov: 'Sindh' },
  ];

  return (
    <div id="calculator-tool" className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
      {/* Tool Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 px-6 py-6 text-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-sans">Pakistan Board GPA & Merit Calculator</h3>
            <p className="text-emerald-100 text-xs">Calculate your exact BISE Grade, Percentage and University Aggregate Merit</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Switch Selector */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setCalcMode('quick')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${calcMode === 'quick' ? 'bg-white text-emerald-800 shadow-xs' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Quick Overall Marks
            </button>
            <button
              onClick={() => setCalcMode('detailed')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${calcMode === 'detailed' ? 'bg-white text-emerald-800 shadow-xs' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Subject-wise Breakdown
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleLevelChange('matric')}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${educationLevel === 'matric' ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-semibold' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
            >
              Matric / SSC
            </button>
            <button
              onClick={() => handleLevelChange('inter')}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${educationLevel === 'inter' ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-semibold' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
            >
              Intermediate / HSSC
            </button>
          </div>
        </div>

        {/* Quick Calculator Content */}
        {calcMode === 'quick' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Marks Obtained</label>
                <div className="relative">
                  <input
                    type="number"
                    value={obtainedMarks}
                    onChange={(e) => setObtainedMarks(e.target.value)}
                    placeholder="e.g. 935"
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-mono text-gray-800"
                  />
                  <span className="absolute right-3 top-3 text-xs text-gray-400 font-medium">Marks</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Total Marks</label>
                <select
                  value={totalMarks}
                  onChange={(e) => setTotalMarks(e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-mono text-gray-800"
                >
                  <option value="1100">1100 Marks (Matric/Inter Part 1 & 2 Combined)</option>
                  <option value="550">550 Marks (Single Year - Matric / Inter Part 1 Only)</option>
                  <option value="1200">1200 Marks (Revised FBISE Syllabus)</option>
                </select>
              </div>

              <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100">
                <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FileSpreadsheet className="w-3.5 h-3.5" /> Optional: University Merit Calculator
                </h4>
                <p className="text-xs text-emerald-800/80 mb-3">Calculate HEC/PMC generic admission aggregate weight (50% Board + 50% Entry Test)</p>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-emerald-800 mb-1">MDCAT/ECAT Score</label>
                    <input
                      type="number"
                      value={entryTestMarks}
                      onChange={(e) => setEntryTestMarks(e.target.value)}
                      className="w-full px-2 py-1.5 bg-white border border-emerald-200 rounded-md text-xs font-mono text-gray-800 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-emerald-800 mb-1">Total Test Marks</label>
                    <select
                      value={entryTestTotal}
                      onChange={(e) => setEntryTestTotal(e.target.value)}
                      className="w-full px-2 py-1.5 bg-white border border-emerald-200 rounded-md text-xs font-mono text-gray-800 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="200">200 Marks (MDCAT/FAST/NUST NET)</option>
                      <option value="400">400 Marks (ECAT Punjab)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 text-gray-600 rounded-lg text-xs hover:bg-gray-50 hover:text-gray-900 transition-all font-medium"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
                </button>
              </div>
            </div>

            {/* Quick Result Panel */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Calculated Results</span>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-xs">
                    <span className="text-[11px] text-gray-400 font-medium block">Board Percentage</span>
                    <span className="text-2xl font-bold font-mono text-gray-800">
                      {quickPercentage.toFixed(2)}%
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-xs">
                    <span className="text-[11px] text-gray-400 font-medium block">Equiv. BISE GPA</span>
                    <span className="text-2xl font-bold font-mono text-emerald-700">
                      {((quickPercentage / 100) * 4.0).toFixed(2)} / 4.0
                    </span>
                  </div>
                </div>

                {/* Main BISE Grade badge */}
                <div className={`mt-4 p-4 rounded-xl border flex items-center justify-between ${quickGradeInfo.color}`}>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider block opacity-75">Board Grade</span>
                    <span className="text-2xl font-black font-mono tracking-tight">{quickGradeInfo.grade}</span>
                    <span className="text-xs block font-medium opacity-90 mt-0.5">{quickGradeInfo.remarks}</span>
                  </div>
                  <Award className="w-10 h-10 opacity-30" />
                </div>

                {/* Admission aggregate merit indicator */}
                <div className="mt-4 bg-emerald-800 text-emerald-50 rounded-xl p-4 border border-emerald-950/20">
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-75 block">Estimated University Admission Merit</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-black font-mono tracking-tight">{meritAggregate.toFixed(2)}%</span>
                  </div>
                  <p className="text-[11px] opacity-90 mt-1">
                    Based on standard academic weight formula. Competes well for major engineering and medical institutes.
                  </p>
                </div>
              </div>

              <div className="mt-4 text-[11px] text-gray-400 flex items-start gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                <span>
                  BISE grades are calculated based on the National Curriculum grading scheme introduced in Pakistan.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Detailed Calculator Content */}
        {calcMode === 'detailed' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap gap-1.5 mb-2 bg-gray-50 p-1 rounded-lg">
                <button
                  onClick={() => handleGroupChange('pre-eng', educationLevel)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${selectedGroup === 'pre-eng' ? 'bg-white text-emerald-800 shadow-xs' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  Pre-Engineering
                </button>
                <button
                  onClick={() => handleGroupChange('pre-med', educationLevel)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${selectedGroup === 'pre-med' ? 'bg-white text-emerald-800 shadow-xs' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  Pre-Medical
                </button>
                <button
                  onClick={() => handleGroupChange('ics', educationLevel)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${selectedGroup === 'ics' ? 'bg-white text-emerald-800 shadow-xs' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  ICS (Computer Science)
                </button>
                <button
                  onClick={() => handleGroupChange('commerce', educationLevel)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${selectedGroup === 'commerce' ? 'bg-white text-emerald-800 shadow-xs' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  I.Com (Commerce)
                </button>
              </div>

              <div className="max-h-96 overflow-y-auto border border-gray-100 rounded-lg p-2 space-y-2">
                {subjects.map((subject, index) => (
                  <div key={index} className="flex items-center justify-between gap-3 p-2 hover:bg-gray-50/80 rounded-md border border-transparent hover:border-gray-100 transition-all">
                    <div className="flex-1">
                      <span className="text-xs font-semibold text-gray-700 block">{subject.name}</span>
                      <span className="text-[10px] text-gray-400 font-mono">Max Marks: {subject.totalMarks}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={subject.marksObtained}
                        onChange={(e) => handleSubjectMarkChange(index, e.target.value)}
                        className="w-16 px-2 py-1 bg-gray-50 border border-gray-200 rounded-md text-xs font-mono font-bold text-center text-gray-800 focus:ring-1 focus:ring-emerald-500"
                        min="0"
                        max={subject.totalMarks}
                      />
                      <span className="text-xs text-gray-400 font-mono">/ {subject.totalMarks}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 text-gray-600 rounded-lg text-xs hover:bg-gray-50 hover:text-gray-900 transition-all font-medium"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset Group Scores
                </button>
              </div>
            </div>

            {/* Detailed Result Panel */}
            <div className="lg:col-span-5 bg-gray-50 rounded-xl p-6 border border-gray-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Aggregate Breakdown</span>
                
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-xs text-gray-500 font-medium">Obtained Score:</span>
                    <span className="text-sm font-bold font-mono text-gray-800">{detailedInfo.obtained} / {detailedInfo.total}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-xs text-gray-500 font-medium">Final Percentage:</span>
                    <span className="text-sm font-bold font-mono text-emerald-800">{detailedInfo.percentage.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-xs text-gray-500 font-medium">Estimated GPA:</span>
                    <span className="text-sm font-bold font-mono text-teal-800">{((detailedInfo.percentage / 100) * 4.0).toFixed(2)} / 4.0</span>
                  </div>
                </div>

                {/* Main BISE Grade badge */}
                <div className={`mt-5 p-4 rounded-xl border flex items-center justify-between ${detailedGradeInfo.color}`}>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider block opacity-75">Board Grade</span>
                    <span className="text-2xl font-black font-mono tracking-tight">{detailedGradeInfo.grade}</span>
                    <span className="text-xs block font-medium opacity-90 mt-0.5">{detailedGradeInfo.remarks}</span>
                  </div>
                  <Award className="w-10 h-10 opacity-30" />
                </div>

                <div className="mt-4 bg-emerald-800 text-white rounded-xl p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-75 block">Entry Test Score Integration</span>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div>
                      <label className="block text-[9px] font-semibold text-emerald-200 mb-0.5">Test Score</label>
                      <input
                        type="number"
                        value={entryTestMarks}
                        onChange={(e) => setEntryTestMarks(e.target.value)}
                        className="w-full px-2 py-1 bg-white/10 border border-emerald-600 rounded-sm text-xs font-mono text-white focus:outline-hidden focus:ring-1 focus:ring-emerald-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-semibold text-emerald-200 mb-0.5">Test Total</label>
                      <input
                        type="number"
                        value={entryTestTotal}
                        onChange={(e) => setEntryTestTotal(e.target.value)}
                        className="w-full px-2 py-1 bg-white/10 border border-emerald-600 rounded-sm text-xs font-mono text-white focus:outline-hidden focus:ring-1 focus:ring-emerald-400"
                      />
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between mt-3 pt-3 border-t border-emerald-700">
                    <span className="text-xs font-medium text-emerald-200">Joint Aggregate Merit:</span>
                    <span className="text-xl font-black font-mono">{meritAggregate.toFixed(2)}%</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-emerald-50 text-emerald-800/95 border border-emerald-100 rounded-lg text-[11px] leading-relaxed">
                <strong>💡 Study Tip:</strong> A Board score of 85% or higher is highly competitive for public-sector university admissions like NUST, King Edward, and FAST.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
