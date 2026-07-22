
# 🎓 Pakistan Education Hub (Ilm Pakistan)

An all-in-one academic guidance, university finder, and career counseling portal designed specifically for students in Pakistan. From Matriculation (SSC) and Intermediate (HSSC) to HEC-accredited university matchers, BISE board GPA/merit calculators, and free textbook downloads.

**Live Application:** [https://pakistan-education-hub.vercel.app/](https://pakistan-education-hub.vercel.app/)

---

## 🌟 Key Features

### 1. 🏛️ HEC-Accredited University Matcher
- **Interactive Search & Filtering**: Search and discover top public and private universities across Pakistan (NUST, LUMS, FAST-NUCES, GIKI, IBA Karachi, Quaid-i-Azam University, Punjab University, King Edward Medical University, etc.).
- **Multi-dimensional Filters**: Filter by city (Lahore, Karachi, Islamabad, Peshawar, Quetta, Faisalabad), sector (Public/Private), discipline (Computer Science, Engineering, Medical, Business, Law, Social Sciences), and semester fee tier.
- **Direct Portals**: Fast links to official university admission portals and ranking badges.

### 2. 🧮 BISE Board Marks & University Merit Calculator
- **Dual Calculation Modes**:
  - **Quick Marks Calculator**: Calculate total percentage, equivalent BISE Grade (A-1, A, B, C, D, E, F), and GPA from aggregate marks out of 1100, 500, or 1200.
  - **Subject-wise Breakdown**: Select specific group streams (Pre-Medical, Pre-Engineering, ICS, I.Com) and enter individual subject scores.
- **HEC / PMC Admission Merit Aggregator**: Integrates Intermediate scores with entry test scores (MDCAT, ECAT, NUST NET, FAST test) using standard 50/50 weighting formulas.

### 3. 🎯 Ilm Career Counseling & Stream Advisor
- **Interactive Advisory Wizard**: A 4-step personalized quiz designed for Pakistani students deciding between FSc Pre-Medical, FSc Pre-Engineering, ICS, I.Com, CSS competitive exams, or freelancing.
- **Tailored Strategic Roadmaps**: Detailed insights into current industry scope in Pakistan, university recommendations, and step-by-step career milestones.

### 4. 📚 Resource & Download Center
- **Free Textbook PDFs**: Instant access to textbooks and study resources from provincial boards (Punjab PCTB, Sindh STBB, Federal FBISE, KPK, and Balochistan textbook boards).
- **Past Papers & Notes**: Solved numericals, past 5-year board exam papers, and MDCAT/ECAT MCQ compilations.

### 5. 💰 HEC & PEEF Scholarships Hub
- **Curated Scholarship Directory**: Filter merit-based, need-based, government, and international grants (Punjab Educational Endowment Fund - PEEF, Benazir/HEC Undergraduate Scholarship, USAID, Chevening UK, Commonwealth, and Chinese CSC Scholarships).
- **Eligibility & Deadlines**: Clear coverage details, eligibility criteria, and application links.

### 6. 🔔 Live Academic Alerts & Notifications
- **Real-Time Updates**: Latest announcements on BISE result declarations, MDCAT syllabus changes, and HEC scholarship deadlines.
- **Admission Alert Signup**: Custom email notification form for students to receive targeted deadline reminders based on their city, board, and study stream.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📁 Project Structure

```text
├── src/
│   ├── components/
│   │   ├── UniversityFinder.tsx    # HEC University search & filter grid
│   │   ├── GpaCalculator.tsx       # BISE Board GPA & PMC/HEC Merit calculator
│   │   ├── CounsellingQuiz.tsx     # Career counseling & stream advisor wizard
│   │   ├── ResourceCenter.tsx      # Free PDF textbook & past paper downloads
│   ├── data/
│   │   ├── universities.ts         # Comprehensive dataset of Pakistani universities
│   │   ├── scholarships.ts         # HEC & PEEF scholarship directory data
│   ├── types.ts                    # Global TypeScript interfaces & types
│   ├── App.tsx                     # Main application entry & landing hero
│   ├── main.tsx                    # React application root
│   └── index.css                   # Global CSS with Tailwind setup
├── public/                         # Static assets
├── index.html                      # Main HTML page
├── package.json                    # Project dependencies & scripts
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite build & server configuration
└── README.md                       # Comprehensive project documentation
```

---

## 🚀 Getting Started Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) and `npm` installed.

### Installation

1. **Clone or Download the Repository**:
   ```bash
   git clone https://github.com/your-username/pakistan-education-hub.git
   cd pakistan-education-hub
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

4. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🇵🇰 Educational Board & Institution References

This application integrates guidance compliant with standard Pakistani educational bodies:
- **Higher Education Commission (HEC Pakistan)**
- **Board of Intermediate and Secondary Education (BISE)** - Punjab, Sindh, KPK, Balochistan, Federal (FBISE)
- **Pakistan Medical and Dental Council (PMDC)**
- **Federal Public Service Commission (FPSC CSS)**

---

## 📄 License

This project is licensed under the Apache-2.0 License.
