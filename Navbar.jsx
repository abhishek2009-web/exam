import React from 'react';
import { getExamById } from '../data/examCategories';
import { Sparkles, BookOpen, Layers, Award, BarChart3, CheckSquare, Flame, ChevronDown } from 'lucide-react';

export const Navbar = ({ activeView, setActiveView, currentExamId, onOpenExamModal, streakCount = 5 }) => {
  const currentExam = getExamById(currentExamId);

  const navItems = [
    { id: 'hero', label: 'Overview', icon: Sparkles },
    { id: 'notes', label: 'Notes Vault', icon: BookOpen },
    { id: 'flashcards', label: '3D Flashcards', icon: Layers },
    { id: 'tests', label: 'Test Arena', icon: Award },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'syllabus', label: 'Syllabus 2026', icon: CheckSquare }
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Exam Selector Pill */}
          <div className="flex items-center space-x-4">
            <div 
              onClick={() => setActiveView('hero')}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition-all">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
                </div>
              </div>

              <div>
                <span className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                  Exam<span className="text-cyan-400">Nexus</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    3D
                  </span>
                </span>
                <span className="block text-[10px] text-slate-400 tracking-wider uppercase font-semibold">
                  All Entrance Exams
                </span>
              </div>
            </div>

            {/* Target Exam Switcher Button */}
            <button
              onClick={onOpenExamModal}
              className="hidden sm:flex items-center space-x-2 px-3.5 py-1.5 rounded-2xl glass-panel border border-cyan-500/30 hover:border-cyan-400/60 bg-cyan-950/40 text-cyan-300 transition-all hover:scale-105 shadow-md shadow-cyan-950/50 group"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-bold">{currentExam.name}</span>
              <ChevronDown className="w-4 h-4 text-cyan-400 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Header Stats & Mobile Trigger */}
          <div className="flex items-center space-x-3">
            {/* Daily Streak Badge */}
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold shadow-md shadow-amber-500/10">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-bounce" />
              <span>{streakCount} Day Streak</span>
            </div>

            {/* Mobile Exam Change Button */}
            <button
              onClick={onOpenExamModal}
              className="sm:hidden px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30"
            >
              {currentExam.name.split(' ')[0]}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden flex justify-around p-2 bg-slate-950/90 border-t border-white/10 backdrop-blur-lg">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex flex-col items-center p-2 rounded-xl text-[10px] font-semibold ${
                isActive ? 'text-cyan-400' : 'text-slate-400'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
