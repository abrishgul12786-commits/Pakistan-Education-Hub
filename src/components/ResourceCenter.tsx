import React, { useState, useMemo } from 'react';
import { Search, Download, BookOpen, FileText, CheckCircle2, RefreshCw, AlertCircle } from 'lucide-react';
import { StudyMaterial } from '../types';

export default function ResourceCenter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('All');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadedList, setDownloadedList] = useState<string[]>([]);

  const resources: StudyMaterial[] = [
    // Matric (Class 9 & 10)
    { id: 'mat-chem-9', title: 'Class 9 Chemistry Punjab Board Textbook (PCTB)', grade: 'Class 9', subject: 'Chemistry', fileSize: '18.4 MB', downloadsCount: 2341 },
    { id: 'mat-math-10', title: 'Class 10 Mathematics past 5 Years Board Papers (BISE Lahore)', grade: 'Class 10', subject: 'Mathematics', fileSize: '8.2 MB', downloadsCount: 4521 },
    { id: 'mat-phys-9', title: 'Class 9 Physics Federal Board FBISE Core Syllabus Notes', grade: 'Class 9', subject: 'Physics', fileSize: '12.1 MB', downloadsCount: 1980 },
    
    // Intermediate (FSc Part 1 & 2)
    { id: 'int-phy-11', title: 'FSc Pre-Engineering 1st Year Physics Solved Numericals', grade: '1st Year', subject: 'Physics', fileSize: '14.2 MB', downloadsCount: 6812 },
    { id: 'int-bio-12', title: 'FSc Pre-Medical 2nd Year Biology diagrammatic Short Notes', grade: '2nd Year', subject: 'Biology', fileSize: '9.6 MB', downloadsCount: 7892 },
    { id: 'int-cs-11', title: 'ICS Part 1 Computer Science Federal Board Handbook', grade: '1st Year', subject: 'Computer Science', fileSize: '22.5 MB', downloadsCount: 3410 },
    
    // Entry Tests (MDCAT/ECAT)
    { id: 'ent-mdcat-chem', title: 'MDCAT Chemistry Solved Mcqs Compilation (PMC Standards)', grade: 'Entry Test', subject: 'Chemistry', fileSize: '16.8 MB', downloadsCount: 12904 },
    { id: 'ent-ecat-math', title: 'ECAT Punjab Mathematics Preparation past Papers', grade: 'Entry Test', subject: 'Mathematics', fileSize: '11.4 MB', downloadsCount: 9402 },
    
    // CSS Competitive Exams
    { id: 'css-essay-outline', title: 'CSS English Essay Guidelines & Recommended Outlines', grade: 'CSS', subject: 'English', fileSize: '4.8 MB', downloadsCount: 15309 },
    { id: 'css-current-affairs', title: 'CSS Current Affairs Past 10 Years General Papers Solved', grade: 'CSS', subject: 'Current Affairs', fileSize: '15.1 MB', downloadsCount: 11482 },
  ];

  const gradesList = ['All', 'Class 9', 'Class 10', '1st Year', '2nd Year', 'Entry Test', 'CSS'];

  const filteredResources = useMemo(() => {
    return resources.filter(res => {
      const matchSearch = 
        res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchGrade = selectedGrade === 'All' || res.grade === selectedGrade;
      return matchSearch && matchGrade;
    });
  }, [searchTerm, selectedGrade]);

  const handleDownload = (id: string, title: string) => {
    setDownloadingId(id);
    // Simulate a premium downloading process
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadedList(prev => [...prev, id]);
    }, 1800);
  };

  return (
    <div id="resource-download-center" className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold font-sans text-gray-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-700" />
            Ilm Resource & Download Center
          </h3>
          <p className="text-gray-500 text-xs">Download free textbooks, board past-papers, and entry test solved notes instantly</p>
        </div>

        {/* Grade Filter Pill selector */}
        <div className="flex flex-wrap gap-1.5 bg-gray-50 p-1 rounded-lg">
          {gradesList.map(grade => (
            <button
              key={grade}
              onClick={() => setSelectedGrade(grade)}
              className={`px-2.5 py-1 text-xs font-semibold rounded transition-all ${selectedGrade === grade ? 'bg-white text-emerald-800 shadow-xs' : 'text-gray-500 hover:text-gray-900'}`}
            >
              {grade}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Search and Material Grid */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search materials (e.g., Chemistry notes, past papers, Punjabi board books)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-gray-800 font-medium"
            />
          </div>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {filteredResources.length > 0 ? (
              filteredResources.map(res => {
                const isDownloading = downloadingId === res.id;
                const isDownloaded = downloadedList.includes(res.id);

                return (
                  <div
                    key={res.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-gray-50 hover:bg-emerald-50/25 rounded-xl border border-gray-100 hover:border-emerald-100 transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 bg-white rounded-lg border border-gray-200 text-emerald-800 shrink-0 shadow-xs">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-800 font-sans leading-relaxed group-hover:text-emerald-950 transition-colors">
                          {res.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400 font-medium">
                          <span className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-[9px] font-bold text-gray-500 uppercase">
                            {res.grade}
                          </span>
                          <span>•</span>
                          <span className="font-mono">{res.fileSize}</span>
                          <span>•</span>
                          <span>{res.downloadsCount.toLocaleString()} downloads</span>
                        </div>
                      </div>
                    </div>

                    <button
                      disabled={isDownloading}
                      onClick={() => handleDownload(res.id, res.title)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 self-start sm:self-auto ${
                        isDownloaded
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                          : isDownloading
                          ? 'bg-teal-50 text-teal-700 border border-teal-200 animate-pulse'
                          : 'bg-emerald-800 hover:bg-emerald-700 text-white shadow-xs'
                      }`}
                    >
                      {isDownloaded ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Downloaded
                        </>
                      ) : isDownloading ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin text-teal-600" />
                          Downloading...
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          Free PDF
                        </>
                      )}
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <FileText className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-xs text-gray-400 font-medium">No files match your search or filter</p>
              </div>
            )}
          </div>
        </div>

        {/* Useful info sidebar */}
        <div className="lg:col-span-4 bg-emerald-50/50 rounded-xl border border-emerald-100 p-5 space-y-4">
          <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-emerald-700" />
            Official Curriculum Notice
          </h4>
          
          <div className="space-y-3 text-[11px] leading-relaxed text-emerald-950/90">
            <p>
              All textbooks are provided under authorized general public use from respective provincial Textbook Boards of Pakistan:
            </p>
            
            <ul className="space-y-2 font-medium">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                <span>Punjab Curriculum & Textbook Board (PCTB)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                <span>Sindh Textbook Board Jamshoro (STBB)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                <span>KPK Textbook Board Peshawar</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                <span>Balochistan Textbook Board Quetta</span>
              </li>
            </ul>

            <div className="pt-2 border-t border-emerald-100/85">
              <p className="text-[10px] text-emerald-800 font-semibold">
                🔔 Note: Matric and Intermediate syllabus standards have been updated for Class 9 and 11 to align with conceptually driven and outcome-based National Assessments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
