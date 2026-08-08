import React from 'react';
import { getExamById, EXAM_CATEGORIES } from '../data/examCategories';
import { Sparkles, BookOpen, Layers, Award, BarChart3, ArrowRight, ShieldCheck, Zap, Target } from 'lucide-react';

export const HeroSection = ({ currentExamId, onSelectView, onOpenExamModal }) => {
  const currentExam = getExamById(currentExamId);

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 space-y-16">
      
      {/* 1. Main Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Title & CTA */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-panel border border-cyan-500/30 text-xs font-semibold text-cyan-300 shadow-xl shadow-cyan-950/50">
            <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Updated 2026 Curriculum & Exam Marking Schemes</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Master Competitive Exams with <span className="text-gradient-cyan">3D Visual Learning</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
            Prepare for <span className="text-cyan-300 font-bold">{currentExam.name}</span> and 20+ top entrance exams with interactive high-yield notes, spatial 3D flashcards, realistic test simulators, and live performance analytics.
          </p>

          {/* Quick Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onSelectView('tests')}
              className="group flex items-center space-x-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/30 hover:scale-105 hover:shadow-cyan-400/50 transition-all"
            >
              <Award className="w-5 h-5 text-slate-950" />
              <span>Start Mock Test</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onSelectView('flashcards')}
              className="flex items-center space-x-3 px-7 py-4 rounded-2xl glass-panel border border-white/20 text-white font-bold text-sm hover:border-cyan-400/60 hover:bg-white/10 transition-all hover:scale-105"
            >
              <Layers className="w-5 h-5 text-cyan-400" />
              <span>3D Flashcards Deck</span>
            </button>

            <button
              onClick={onOpenExamModal}
              className="px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white hover:border-white/30 transition-all"
            >
              Change Exam ({currentExam.badge})
            </button>
          </div>

          {/* Feature Micro-Badges */}
          <div className="pt-4 flex flex-wrap gap-6 text-xs text-slate-400 font-medium">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Negative Marking Simulator</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Spatial 3D Memory Engine</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-amber-400" />
              <span>AI Weak Spot Radar</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Floating Glass Card Widget */}
        <div className="lg:col-span-5 relative">
          
          {/* Glowing Aura Background */}
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-600/20 rounded-3xl blur-2xl opacity-70 animate-pulse-glow" />

          {/* Glass Widget Card */}
          <div className="relative p-6 sm:p-8 rounded-3xl glass-card border border-cyan-500/30 space-y-6 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{currentExam.name}</h3>
                  <p className="text-xs text-slate-400">{currentExam.targetLabel}</p>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Active Target
              </span>
            </div>

            {/* Exam Marking & Duration Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <span className="block text-[10px] text-slate-400 font-semibold uppercase">Exam Duration</span>
                <span className="text-base font-extrabold text-white">{currentExam.durationMinutes} Minutes</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <span className="block text-[10px] text-slate-400 font-semibold uppercase">Marking Scheme</span>
                <span className="text-xs font-bold text-cyan-300">{currentExam.markingScheme}</span>
              </div>
            </div>

            {/* Subjects List Pill Badges */}
            <div>
              <span className="block text-[10px] text-slate-400 font-semibold uppercase mb-2">Tested Subjects</span>
              <div className="flex flex-wrap gap-2">
                {currentExam.subjects.map((subj, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-xl bg-cyan-500/10 text-cyan-300 text-xs font-semibold border border-cyan-500/20">
                    {subj}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Action Link */}
            <button
              onClick={() => onSelectView('syllabus')}
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all border border-white/10"
            >
              <span>View Official 2026 Syllabus Checklist</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        </div>

      </div>

      {/* 2. Entrance Exam Categories Carousel / Quick Bar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Supported Competitive Exam Domains</h2>
          <button onClick={onOpenExamModal} className="text-xs text-cyan-400 font-semibold hover:underline">
            View All 20+ Exams →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {EXAM_CATEGORIES.map(cat => (
            <div
              key={cat.id}
              onClick={onOpenExamModal}
              className="p-4 rounded-2xl glass-card cursor-pointer border border-white/10 hover:border-cyan-500/40 text-center space-y-2 group transition-all"
            >
              <div className="w-10 h-10 mx-auto rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors line-clamp-1">
                {cat.name}
              </h4>
              <span className="text-[10px] text-slate-400 font-medium">
                {cat.exams.length} Exams
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Core Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Notes Vault */}
        <div
          onClick={() => onSelectView('notes')}
          className="group relative p-6 rounded-3xl glass-card cursor-pointer border border-white/10 hover:border-cyan-500/50 space-y-4 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30 group-hover:scale-110 transition-transform">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
            High-Yield Notes Vault
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Formula cheat sheets, key summaries, mind-maps, and custom markdown notes categorized by subject and topic.
          </p>
          <span className="inline-flex items-center space-x-1 text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
            <span>Explore Notes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* 3D Flashcards */}
        <div
          onClick={() => onSelectView('flashcards')}
          className="group relative p-6 rounded-3xl glass-card cursor-pointer border border-white/10 hover:border-purple-500/50 space-y-4 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30 group-hover:scale-110 transition-transform">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
            3D Spatial Flashcards
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Flip 3D cards in spatial view with mouse physics, track SRS spaced-repetition memory recall, and build your own decks.
          </p>
          <span className="inline-flex items-center space-x-1 text-xs font-bold text-purple-400 group-hover:translate-x-1 transition-transform">
            <span>Flip Decks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Real Test Simulator */}
        <div
          onClick={() => onSelectView('tests')}
          className="group relative p-6 rounded-3xl glass-card cursor-pointer border border-white/10 hover:border-emerald-500/50 space-y-4 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 group-hover:scale-110 transition-transform">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
            Real Test Simulator
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Timed mock exam environment with exact negative marking algorithms, question palette, and detailed step-by-step solutions.
          </p>
          <span className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
            <span>Take Test</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Analytics Dashboard */}
        <div
          onClick={() => onSelectView('analytics')}
          className="group relative p-6 rounded-3xl glass-card cursor-pointer border border-white/10 hover:border-amber-500/50 space-y-4 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 group-hover:scale-110 transition-transform">
            <BarChart3 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
            Performance Analytics
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Accuracy radar, score history graphs, time management analysis, and intelligent AI weak spot diagnostics.
          </p>
          <span className="inline-flex items-center space-x-1 text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
            <span>View Performance</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

      </div>

    </div>
  );
};
