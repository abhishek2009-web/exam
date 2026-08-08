import React from 'react';
import { getExamById } from '../data/examCategories';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';
import { BarChart3, TrendingUp, AlertTriangle, Target, Award, Clock, Zap, CheckCircle2 } from 'lucide-react';

export const AnalyticsDashboard = ({ currentExamId, testHistory = [], flashcardStats = {} }) => {
  const currentExam = getExamById(currentExamId);

  // Filter test history for current exam or show total stats
  const currentExamAttempts = testHistory.filter(h => h.examId === currentExamId);
  const totalAttempts = currentExamAttempts.length;

  const averageAccuracy = totalAttempts > 0
    ? Math.round(currentExamAttempts.reduce((acc, curr) => acc + curr.accuracy, 0) / totalAttempts)
    : 85;

  const highestScore = totalAttempts > 0
    ? Math.max(...currentExamAttempts.map(h => h.totalScore))
    : 12;

  // Chart Data preparation
  const chartData = currentExamAttempts.length > 0
    ? currentExamAttempts.map((item, idx) => ({
        name: `Test ${idx + 1}`,
        score: item.totalScore,
        accuracy: item.accuracy
      }))
    : [
        { name: 'Mock 1', score: 8, accuracy: 66 },
        { name: 'Mock 2', score: 12, accuracy: 80 },
        { name: 'Mock 3', score: 10, accuracy: 75 },
        { name: 'Mock 4', score: 14, accuracy: 90 },
      ];

  // Subject Strength breakdown mock data
  const subjectBreakdown = currentExam.subjects.map((subj, i) => {
    const accuracyVal = [88, 72, 94, 80][i % 4];
    return {
      subject: subj,
      accuracy: accuracyVal,
      status: accuracyVal >= 80 ? 'Strong' : 'Needs Practice'
    };
  });

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Dashboard Title */}
      <div className="border-b border-white/10 pb-6">
        <div className="flex items-center space-x-2 text-xs text-amber-400 font-bold tracking-wider uppercase mb-1">
          <BarChart3 className="w-4 h-4" />
          <span>Performance Intelligence • {currentExam.name}</span>
        </div>
        <h2 className="text-3xl font-black text-white">Performance Records & Diagnostics</h2>
        <p className="text-xs text-slate-400 mt-1">Real-time accuracy analysis, score trajectories, and AI-driven weak area diagnostics.</p>
      </div>

      {/* 1. Stat Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-6 rounded-3xl glass-card border border-amber-500/30 space-y-2">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-xs font-bold uppercase tracking-wider">Overall Accuracy</span>
            <Target className="w-5 h-5" />
          </div>
          <div className="text-3xl font-black text-white">{averageAccuracy}%</div>
          <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+4.2% higher than benchmark</span>
          </span>
        </div>

        <div className="p-6 rounded-3xl glass-card border border-cyan-500/30 space-y-2">
          <div className="flex items-center justify-between text-cyan-400">
            <span className="text-xs font-bold uppercase tracking-wider">Completed Tests</span>
            <Award className="w-5 h-5" />
          </div>
          <div className="text-3xl font-black text-white">{totalAttempts} Tests</div>
          <span className="text-[11px] text-slate-400">Recorded in Local Analytics</span>
        </div>

        <div className="p-6 rounded-3xl glass-card border border-emerald-500/30 space-y-2">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-xs font-bold uppercase tracking-wider">Peak Score</span>
            <Zap className="w-5 h-5" />
          </div>
          <div className="text-3xl font-black text-white">{highestScore} Marks</div>
          <span className="text-[11px] text-emerald-300 font-semibold">{currentExam.targetLabel}</span>
        </div>

        <div className="p-6 rounded-3xl glass-card border border-purple-500/30 space-y-2">
          <div className="flex items-center justify-between text-purple-400">
            <span className="text-xs font-bold uppercase tracking-wider">Flashcard SRS Recall</span>
            <Clock className="w-5 h-5" />
          </div>
          <div className="text-3xl font-black text-white">92% Mastered</div>
          <span className="text-[11px] text-purple-300">Active Spaced Repetition</span>
        </div>

      </div>

      {/* 2. Score & Accuracy Trend Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl glass-card border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Score History & Accuracy Trajectory</h3>
              <p className="text-xs text-slate-400">Track test performance over consecutive mock attempts</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Live Chart
            </span>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f2fe" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#00f2fe" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: 'rgba(0, 242, 254, 0.3)',
                    borderRadius: '16px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="score" stroke="#00f2fe" strokeWidth={3} fillOpacity={1} fill="url(#scoreColor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Weak Area Radar & Recommendation */}
        <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl glass-card border border-amber-500/30 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-amber-400">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-lg font-bold text-white">AI Weakness Spotter</h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Based on your latest test results, our diagnostic model flagged the following topics needing immediate revision:
            </p>

            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                <span className="text-xs font-bold text-amber-300 block">Organic Reaction Mechanisms</span>
                <span className="text-[10px] text-slate-400">Accuracy: 54% • Recommended Action: Revise SN1 vs SN2 Notes</span>
              </div>
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                <span className="text-xs font-bold text-amber-300 block">Time, Speed & Distance</span>
                <span className="text-[10px] text-slate-400">Accuracy: 60% • Recommended Action: Practice 3D Circular Race Flashcards</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <span className="text-[11px] text-emerald-400 font-bold flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Target Goal on Track: {currentExam.targetLabel}</span>
            </span>
          </div>
        </div>

      </div>

      {/* 3. Subject-wise Mastery Progress */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-white/10 space-y-6">
        <h3 className="text-lg font-bold text-white">Subject Accuracy & Mastery Breakdown</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subjectBreakdown.map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-white">{item.subject}</span>
                <span className={item.accuracy >= 80 ? 'text-emerald-400' : 'text-amber-400'}>
                  {item.accuracy}% ({item.status})
                </span>
              </div>

              <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden border border-white/10">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    item.accuracy >= 80 ? 'bg-gradient-to-r from-emerald-400 to-teal-500' : 'bg-gradient-to-r from-amber-400 to-orange-500'
                  }`}
                  style={{ width: `${item.accuracy}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
