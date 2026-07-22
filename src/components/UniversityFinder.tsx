import React, { useState, useMemo } from 'react';
import { Search, MapPin, Building, GraduationCap, DollarSign, ExternalLink, SlidersHorizontal, Check } from 'lucide-react';
import { universitiesData } from '../data/universities';
import { University } from '../types';

export default function UniversityFinder() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedFee, setSelectedFee] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique lists for filtering
  const cities = useMemo(() => {
    const list = universitiesData.map(u => u.city);
    return ['All', ...Array.from(new Set(list))];
  }, []);

  const disciplines = [
    'All',
    'Computer Science',
    'Engineering',
    'Medical',
    'Business',
    'Social Sciences',
    'Law',
    'Arts'
  ];

  const filteredUniversities = useMemo(() => {
    return universitiesData.filter(uni => {
      const matchSearch = 
        uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.abbreviation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.city.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchDiscipline = selectedDiscipline === 'All' || uni.disciplines.includes(selectedDiscipline as any);
      const matchCity = selectedCity === 'All' || uni.city === selectedCity;
      const matchType = selectedType === 'All' || uni.type === selectedType;
      const matchFee = selectedFee === 'All' || uni.feeRange === selectedFee;

      return matchSearch && matchDiscipline && matchCity && matchType && matchFee;
    });
  }, [searchTerm, selectedDiscipline, selectedCity, selectedType, selectedFee]);

  const feeRangeLabel = (range: string) => {
    switch (range) {
      case 'Low': return 'Low (<100k PKR/sem)';
      case 'Medium': return 'Medium (100k-300k PKR/sem)';
      case 'High': return 'High (>300k PKR/sem)';
      default: return '';
    }
  };

  return (
    <div id="university-finder" className="space-y-6">
      {/* Finder Header & Search Bar */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold font-sans text-gray-900 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-emerald-700" />
              Pakistani Universities Matcher
            </h3>
            <p className="text-gray-500 text-xs">Explore and match premier public and private HEC-accredited institutions in Pakistan</p>
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all self-start md:self-auto"
          >
            <SlidersHorizontal className="w-4 h-4 text-gray-500" />
            {showFilters ? 'Hide Filters' : 'Show Advanced Filters'}
          </button>
        </div>

        {/* Primary Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search universities by name, abbreviation (NUST, LUMS, FAST) or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-gray-800 font-medium"
          />
        </div>

        {/* Quick Discipline Pill Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0 mr-1">Discipline:</span>
          {disciplines.map(disc => (
            <button
              key={disc}
              onClick={() => setSelectedDiscipline(disc)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all shrink-0 border ${selectedDiscipline === disc ? 'bg-emerald-800 text-white border-emerald-800 font-semibold' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              {disc}
            </button>
          ))}
        </div>

        {/* Expandable Advanced Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100 animate-fadeIn">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Campus Location</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city === 'All' ? 'All Cities / Online' : city}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Sponsorship / Sector</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                <option value="All">All Sectors (Public & Private)</option>
                <option value="Public">Public Sector (Government)</option>
                <option value="Private">Private Sector (Non-Government)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Semester Fee Range</label>
              <select
                value={selectedFee}
                onChange={(e) => setSelectedFee(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                <option value="All">All Budgets / Fees</option>
                <option value="Low">Low (&lt; 100,000 PKR)</option>
                <option value="Medium">Medium (100,000 - 300,000 PKR)</option>
                <option value="High">High (&gt; 300,000 PKR)</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Grid Results */}
      {filteredUniversities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUniversities.map(uni => (
            <div
              key={uni.id}
              className="bg-white rounded-xl border border-gray-100 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 font-bold flex items-center justify-center border border-emerald-100 shadow-inner group-hover:bg-emerald-800 group-hover:text-white transition-all">
                      {uni.logoPlaceholder}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 group-hover:text-emerald-800 transition-all font-sans">
                        {uni.abbreviation}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-semibold uppercase">{uni.type} Sector</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                    {uni.city}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-sm font-semibold text-gray-700 mb-2 leading-snug">
                  {uni.name}
                </h3>

                {/* Rating category */}
                <p className="text-[11px] text-emerald-700 font-medium bg-emerald-50/60 px-2 py-1 rounded border border-emerald-100 mb-3">
                  🏆 {uni.rankCategory}
                </p>

                {/* Disciplines tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {uni.disciplines.map(disc => (
                    <span key={disc} className="text-[9px] font-bold px-1.5 py-0.5 bg-gray-50 text-gray-500 border border-gray-100 rounded">
                      {disc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  {feeRangeLabel(uni.feeRange)}
                </span>

                <a
                  href={uni.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-emerald-800 hover:text-emerald-600 flex items-center gap-1 transition-all"
                >
                  Visit Site
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-2xl border border-dashed border-gray-200 p-12 text-center">
          <Building className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h4 className="text-sm font-bold text-gray-700 mb-1">No Universities Match Your Filters</h4>
          <p className="text-gray-400 text-xs max-w-sm mx-auto">Try clearing your filters or search criteria to view premier Pakistani educational institutes.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedDiscipline('All');
              setSelectedCity('All');
              setSelectedType('All');
              setSelectedFee('All');
            }}
            className="mt-4 px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-all"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
