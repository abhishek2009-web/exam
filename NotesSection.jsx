import React, { useState } from 'react';
import { getExamById } from '../data/examCategories';
import { BookOpen, Search, Plus, Bookmark, Check, Volume2, Sparkles, X, ChevronRight, FileText } from 'lucide-react';

export const NotesSection = ({ currentExamId, notesList, onAddCustomNote }) => {
  const currentExam = getExamById(currentExamId);

  const [activeSubjectTab, setActiveSubjectTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNoteModal, setSelectedNoteModal] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);

  // Form state for creating custom note
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState(currentExam.subjects[0] || 'Physics');
  const [newChapter, setNewChapter] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [newContent, setNewContent] = useState('');

  // Toggle bookmark
  const toggleBookmark = (id, e) => {
    e.stopPropagation();
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Speak note summary aloud
  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Filter notes
  const examFilteredNotes = notesList.filter(note => 
    note.examId === currentExamId || note.examId === 'all'
  );

  const finalNotes = examFilteredNotes.filter(note => {
    const matchesSubject = activeSubjectTab === 'All' || note.subject.toLowerCase() === activeSubjectTab.toLowerCase();
    const matchesSearch = !searchQuery || 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const subjectsList = ['All', ...currentExam.subjects];

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const customNote = {
      id: `note_custom_${Date.now()}`,
      examId: currentExamId,
      subject: newSubject,
      chapter: newChapter || 'General Notes',
      title: newTitle,
      readTime: '3 min read',
      highYieldTag: 'User Custom Note',
      summary: newSummary || newTitle,
      content: newContent,
      formulas: [],
      keyPoints: [newSummary || 'User generated personal study note']
    };

    onAddCustomNote(customNote);
    setIsAddNoteOpen(false);
    setNewTitle('');
    setNewChapter('');
    setNewSummary('');
    setNewContent('');
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Top Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs text-cyan-400 font-bold tracking-wider uppercase mb-1">
            <BookOpen className="w-4 h-4" />
            <span>High-Yield Study Vault • {currentExam.name}</span>
          </div>
          <h2 className="text-3xl font-black text-white">Syllabus Notes & Formula Sheets</h2>
          <p className="text-xs text-slate-400 mt-1">Concise, exam-oriented study notes with formulas, key takeaways, and mind-maps.</p>
        </div>

        <button
          onClick={() => setIsAddNoteOpen(true)}
          className="flex items-center space-x-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Note</span>
        </button>
      </div>

      {/* Search & Subject Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        
        {/* Subject Pills */}
        <div className="flex overflow-x-auto gap-2 w-full sm:w-auto no-scrollbar">
          {subjectsList.map(subj => {
            const isActive = activeSubjectTab === subj;
            return (
              <button
                key={subj}
                onClick={() => setActiveSubjectTab(subj)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                {subj}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes by title or formula..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs text-white"
          />
        </div>
      </div>

      {/* Notes Cards Grid */}
      {finalNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {finalNotes.map(note => {
            const isBookmarked = bookmarkedIds.includes(note.id);

            return (
              <div
                key={note.id}
                onClick={() => setSelectedNoteModal(note)}
                className="group relative p-6 rounded-3xl glass-card cursor-pointer border border-white/10 hover:border-cyan-500/40 space-y-4 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      {note.subject}
                    </span>

                    <button
                      onClick={(e) => toggleBookmark(note.id, e)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isBookmarked ? 'text-amber-400 bg-amber-400/10' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
                    </button>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">{note.chapter}</span>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mt-0.5 line-clamp-1">
                      {note.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {note.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="text-amber-400 font-semibold">{note.highYieldTag}</span>
                  <span className="flex items-center space-x-1 text-cyan-400 font-bold group-hover:translate-x-1 transition-transform">
                    <span>Read Note</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 rounded-3xl glass-card border border-white/10 text-center space-y-3">
          <BookOpen className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Notes Found for this Subject</h3>
          <p className="text-xs text-slate-400">Try clearing your search query or add a custom note for this topic!</p>
          <button
            onClick={() => setIsAddNoteOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
          >
            Create Note Now
          </button>
        </div>
      )}

      {/* FULL NOTE READER MODAL */}
      {selectedNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl glass-panel border border-cyan-500/30 overflow-hidden shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-slate-900/80">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 uppercase">
                  {selectedNoteModal.subject} • {selectedNoteModal.chapter}
                </span>
                <h3 className="text-xl font-extrabold text-white">{selectedNoteModal.title}</h3>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleSpeak(selectedNoteModal.summary)}
                  title="Read aloud note summary"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-300 transition-colors"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedNoteModal(null)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Note Content Scroll Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              
              {/* Formula Cards Block */}
              {selectedNoteModal.formulas && selectedNoteModal.formulas.length > 0 && (
                <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 space-y-2">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">💡 High-Yield Formula Cheat-Sheet</span>
                  <div className="space-y-1.5 font-mono text-xs text-cyan-200">
                    {selectedNoteModal.formulas.map((f, i) => (
                      <div key={i} className="p-2 rounded-lg bg-black/40 border border-cyan-500/20">
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Main Content Body */}
              <div className="prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed whitespace-pre-line">
                {selectedNoteModal.content}
              </div>

              {/* Key Takeaway Bullets */}
              {selectedNoteModal.keyPoints && selectedNoteModal.keyPoints.length > 0 && (
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-3">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">🎯 Quick Exam Revision Takeaways</span>
                  <ul className="space-y-2">
                    {selectedNoteModal.keyPoints.map((pt, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 px-6 bg-slate-900/80 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span>{selectedNoteModal.readTime}</span>
              <button
                onClick={() => setSelectedNoteModal(null)}
                className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold"
              >
                Close Note
              </button>
            </div>

          </div>
        </div>
      )}

      {/* CREATE CUSTOM NOTE MODAL */}
      {isAddNoteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl rounded-3xl glass-panel border border-cyan-500/30 overflow-hidden p-6 sm:p-8 space-y-6 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-2 text-white font-bold text-lg">
                <FileText className="w-5 h-5 text-cyan-400" />
                <span>Create Custom Study Note</span>
              </div>
              <button onClick={() => setIsAddNoteOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Subject</label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full p-2.5 rounded-xl glass-input text-white"
                  >
                    {currentExam.subjects.map((s, i) => (
                      <option key={i} value={s} className="bg-slate-900">{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Chapter / Unit</label>
                  <input
                    type="text"
                    value={newChapter}
                    onChange={(e) => setNewChapter(e.target.value)}
                    placeholder="e.g. Modern Physics"
                    className="w-full p-2.5 rounded-xl glass-input text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Note Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Photoelectric Equation Derivation & Tricks"
                  className="w-full p-2.5 rounded-xl glass-input text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Short Summary / Highlights</label>
                <input
                  type="text"
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="Brief 1-liner summary..."
                  className="w-full p-2.5 rounded-xl glass-input text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Detailed Content *</label>
                <textarea
                  rows={5}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Write formulas, explanations, key points..."
                  className="w-full p-2.5 rounded-xl glass-input text-white"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddNoteOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 text-white font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 font-extrabold shadow-lg shadow-cyan-500/20"
                >
                  Save Note
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
