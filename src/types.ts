export interface University {
  id: string;
  name: string;
  abbreviation: string;
  city: 'Lahore' | 'Karachi' | 'Islamabad' | 'Peshawar' | 'Quetta' | 'Faisalabad' | 'Multan' | 'Other';
  province: 'Punjab' | 'Sindh' | 'KPK' | 'Balochistan' | 'ICT';
  type: 'Public' | 'Private';
  rankCategory: string;
  disciplines: ('Engineering' | 'Computer Science' | 'Medical' | 'Business' | 'Social Sciences' | 'Arts' | 'Law')[];
  feeRange: 'Low' | 'Medium' | 'High'; // Low: <100k, Medium: 100k-300k, High: >300k per semester
  logoPlaceholder: string;
  website: string;
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  eligibility: string;
  coverage: string; // Full tuition, partial, monthly stipend, etc.
  deadline: string;
  category: 'Need-based' | 'Merit-based' | 'International' | 'Government';
  link: string;
}

export interface ExamBoard {
  id: string;
  name: string;
  province: 'Punjab' | 'Sindh' | 'KPK' | 'Balochistan' | 'Federal';
}

export interface StudyMaterial {
  id: string;
  title: string;
  grade: 'Class 9' | 'Class 10' | '1st Year' | '2nd Year' | 'Entry Test' | 'CSS';
  subject: string;
  fileSize: string;
  downloadsCount: number;
}
