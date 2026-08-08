import React, { useState } from 'react';
import { EXAM_CATEGORIES } from '../data/examCategories';
import { Cpu, Stethoscope, Landmark, TrendingUp, Scale, Building2, Globe, Search, CheckCircle2, Sparkles, X } from 'lucide-react';

const ICON_MAP = {
  Cpu: Cpu,
  Stethoscope: Stethoscope,
  Landmark: Landmark,
  TrendingUp: TrendingUp,
  Scale: Scale,
  Building2: Building2,
  Globe: Globe
};

export const ExamSelectorModal = ({ isOpen, onClose, currentExamId, onSelectExam }) => {
  const [activeCategoryTab, setActiveCategoryTab] = useState(EXAM_CATEGORIES[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const currentCategoryObj = EXAM_CATEGORIES.find(c => c.id === activeCategoryTab) || EXAM_CATEGORIES[0];

  // Filter exams across all categories if search query exists
  const filteredExamsAcrossAll = searchQuery.trim()
    ? EXAM_CATEGORIES.flatMap(cat => cat.exams.map(e => ({ ...e, categoryName: cat.name })))
        .filter(e => e.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                     e.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                     e.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())))
    : currentCategoryObj.exams;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl glass-panel border border-cyan-500/30 shadow-2xl shadow-cyan-950/50 overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-slate-900/60">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-wide">Select Target Competitive Exam</h2>
              <p className="text-xs text-slate-400">Choose from 20+ national and global entrance exams tailored with 3D study modules</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 px-6 bg-slate-950/40 border-b border-white/5">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search exam by name (e.g., JEE Main, NEET, UPSC, GATE, CAT, CLAT)..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl glass-input text-sm text-slate-100 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Category Tabs (Shown if not searching) */}
        {!searchQuery && (
          <div className="flex overflow-x-auto gap-2 p-4 px-6 bg-slate-900/40 border-b border-white/5 no-scrollbar">
            {EXAM_CATEGORIES.map(cat => {
              const IconComp = ICON_MAP[cat.icon] || Cpu;
              const isActive = activeCategoryTab === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryTab(cat.id)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 scale-105'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Exam Cards Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredExamsAcrossAll.map(exam => {
            const isSelected = currentExamId === exam.id;

            return (
              <div
                key={exam.id}
                onClick={() => {
                  onSelectExam(exam.id);
                  onClose();
                }}
                className={`group relative p-5 rounded-2xl glass-card cursor-pointer border transition-all duration-300 ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/30 shadow-xl shadow-cyan-500/20 ring-2 ring-cyan-400/50'
                    : 'border-white/10 hover:border-cyan-500/40 hover:bg-white/5'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        {exam.badge}
                      </span>
                      {exam.categoryName && (
                        <span className="text-[10px] text-slate-400">{exam.categoryName}</span>
                      )}
                    </div>
                    
                    <h3 className="mt-2 text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {exam.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">{exam.fullName}</p>
                  </div>

                  {isSelected && (
                    <CheckCircle2 className="w-6 h-6 text-cyan-400 flex-shrink-0 animate-bounce" />
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="text-emerald-400 font-medium">{exam.markingScheme}</span>
                  <span className="text-cyan-400 font-semibold">{exam.targetLabel}</span>
                </div>

                <div className="mt-2 flex flex-wrap gap-1.5">
                  {exam.subjects.map((subj, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-slate-300">
                      {subj}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 bg-slate-900/80 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>Active Syllabus: Updated 2026 Curriculum</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all shadow-md shadow-cyan-500/20"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
