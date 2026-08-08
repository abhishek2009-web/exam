import React, { useState } from 'react';
import { getExamById } from '../data/examCategories';
import { OFFICIAL_SYLLABUS } from '../data/syllabusData';
import { CheckSquare, CheckCircle2, Circle, Sparkles, BookOpen, AlertCircle } from 'lucide-react';

export const SyllabusViewer = ({ currentExamId }) => {
  const currentExam = getExamById(currentExamId);

  // Fetch official syllabus or fallback
  const syllabusData = OFFICIAL_SYLLABUS[currentExamId] || OFFICIAL_SYLLABUS['jee_main'];

  const [topicStatusMap, setTopicStatusMap] = useState({});

  const toggleTopic = (id) => {
    setTopicStatusMap(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Calculate overall syllabus completion percentage
  const totalTopicsCount = syllabusData.reduce((acc, curr) => acc + curr.topics.length, 0);
  const completedCount = syllabusData.reduce((acc, curr) => {
    const topicDoneCount = curr.topics.filter(t => 
      topicStatusMap[t.id] !== undefined ? topicStatusMap[t.id] : t.status === 'Completed'
    ).length;
    return acc + topicDoneCount;
  }, 0);

  const percentage = Math.round((completedCount / Math.max(1, totalTopicsCount)) * 100);

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs text-cyan-400 font-bold tracking-wider uppercase mb-1">
            <CheckSquare className="w-4 h-4" />
            <span>Official Curriculum Checklist • {currentExam.name}</span>
          </div>
          <h2 className="text-3xl font-black text-white">Updated 2026 Syllabus Tracker</h2>
          <p className="text-xs text-slate-400 mt-1">Track unit completion status, topic weightage, and target readiness.</p>
        </div>

        {/* Progress Badge */}
        <div className="p-4 rounded-2xl glass-card border border-cyan-500/30 flex items-center space-x-4">
          <div>
            <span className="block text-[10px] text-slate-400 font-bold uppercase">Syllabus Covered</span>
            <span className="text-2xl font-black text-cyan-400">{percentage}%</span>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-cyan-400/30 border-t-cyan-400 flex items-center justify-center font-extrabold text-xs text-white">
            {completedCount}/{totalTopicsCount}
          </div>
        </div>
      </div>

      {/* Syllabus Subjects & Topics List */}
      <div className="space-y-8">
        {syllabusData.map((subjGroup, idx) => (
          <div key={idx} className="p-6 sm:p-8 rounded-3xl glass-card border border-white/10 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <span>{subjGroup.subject}</span>
              </h3>
              <span className="text-xs text-slate-400 font-medium">{subjGroup.topics.length} Core Topics</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subjGroup.topics.map(topic => {
                const isDone = topicStatusMap[topic.id] !== undefined
                  ? topicStatusMap[topic.id]
                  : topic.status === 'Completed';

                return (
                  <div
                    key={topic.id}
                    onClick={() => toggleTopic(topic.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      isDone
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                        : 'bg-white/5 border-white/10 text-slate-200 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-500 flex-shrink-0" />
                      )}
                      <div>
                        <span className={`text-sm font-semibold block ${isDone ? 'line-through opacity-80' : ''}`}>
                          {topic.name}
                        </span>
                        <span className="text-[10px] text-slate-400">Weightage: {topic.weight}</span>
                      </div>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isDone ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {isDone ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
