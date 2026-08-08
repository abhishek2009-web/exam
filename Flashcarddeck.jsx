import React, { useState } from 'react';
import { getExamById } from '../data/examCategories';
import { Layers, RotateCw, CheckCircle, HelpCircle, Plus, Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';

export const FlashcardDeck = ({ currentExamId, flashcardsList, onAddCustomFlashcard, onUpdateSRS }) => {
  const currentExam = getExamById(currentExamId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeSubjectTab, setActiveSubjectTab] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Custom Flashcard Form
  const [newSubject, setNewSubject] = useState(currentExam.subjects[0] || 'Physics');
  const [newFront, setNewFront] = useState('');
  const [newBack, setNewBack] = useState('');
  const [newDifficulty, setNewDifficulty] = useState('Medium');

  // Filter flashcards by exam & active subject tab
  const filteredCards = flashcardsList.filter(card => {
    const matchesExam = card.examId === currentExamId || card.examId === 'all';
    const matchesSubject = activeSubjectTab === 'All' || card.subject.toLowerCase() === activeSubjectTab.toLowerCase();
    return matchesExam && matchesSubject;
  });

  const activeCard = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, filteredCards.length));
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % Math.max(1, filteredCards.length));
  };

  const handleRateSRS = (rating) => {
    if (activeCard && onUpdateSRS) {
      onUpdateSRS(activeCard.id, rating);
    }
    handleNext();
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newFront.trim() || !newBack.trim()) return;

    const customCard = {
      id: `fc_custom_${Date.now()}`,
      examId: currentExamId,
      subject: newSubject,
      chapter: 'User Custom Flashcard',
      front: newFront,
      back: newBack,
      difficulty: newDifficulty,
      tags: ['Custom']
    };

    onAddCustomFlashcard(customCard);
    setIsAddModalOpen(false);
    setNewFront('');
    setNewBack('');
  };

  const subjectsList = ['All', ...currentExam.subjects];

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs text-purple-400 font-bold tracking-wider uppercase mb-1">
            <Layers className="w-4 h-4" />
            <span>3D Spatial Memory Deck • {currentExam.name}</span>
          </div>
          <h2 className="text-3xl font-black text-white">Interactive 3D Flashcards</h2>
          <p className="text-xs text-slate-400 mt-1">Click the card to flip in 3D. Rate your recall difficulty to optimize active recall memory.</p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-extrabold text-xs shadow-lg shadow-purple-500/20 hover:scale-105 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Flashcard</span>
        </button>
      </div>

      {/* Subject Filter Pills */}
      <div className="flex overflow-x-auto gap-2 no-scrollbar">
        {subjectsList.map(subj => {
          const isActive = activeSubjectTab === subj;
          return (
            <button
              key={subj}
              onClick={() => {
                setActiveSubjectTab(subj);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              {subj}
            </button>
          );
        })}
      </div>

      {/* 3D FLASHCARD ARENA */}
      {filteredCards.length > 0 && activeCard ? (
        <div className="space-y-6">
          
          {/* Card Counter Badge */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-2">
            <span>Card {currentIndex + 1} of {filteredCards.length}</span>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {activeCard.subject} • {activeCard.difficulty}
            </span>
          </div>

          {/* 3D PERSPECTIVE FLIP CONTAINER */}
          <div className="w-full h-80 sm:h-96 perspective-1000">
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className={`relative w-full h-full cursor-pointer transition-transform duration-700 transform-style-3d ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              
              {/* FRONT SIDE */}
              <div className="absolute inset-0 w-full h-full rounded-3xl glass-card border-2 border-purple-500/30 p-8 sm:p-12 flex flex-col justify-between backface-hidden shadow-2xl shadow-purple-950/50 bg-gradient-to-br from-slate-900/90 to-purple-950/40">
                <div className="flex items-center justify-between text-xs text-purple-300 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4" />
                    <span>Question / Concept</span>
                  </span>
                  <span className="text-slate-400">Click to Flip 🔄</span>
                </div>

                <div className="my-auto text-center space-y-4">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-relaxed">
                    {activeCard.front}
                  </h3>
                </div>

                <div className="flex justify-center text-xs text-slate-400">
                  <span>Tap anywhere on card to reveal answer</span>
                </div>
              </div>

              {/* BACK SIDE */}
              <div className="absolute inset-0 w-full h-full rounded-3xl glass-card border-2 border-cyan-500/40 p-8 sm:p-12 flex flex-col justify-between rotate-y-180 backface-hidden shadow-2xl shadow-cyan-950/50 bg-gradient-to-br from-slate-900/95 to-cyan-950/50">
                <div className="flex items-center justify-between text-xs text-cyan-300 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" />
                    <span>Answer & Solution</span>
                  </span>
                  <span className="text-slate-400">Answer Revealed ✅</span>
                </div>

                <div className="my-auto text-center space-y-4 overflow-y-auto max-h-56 p-2">
                  <p className="text-base sm:text-lg font-semibold text-slate-100 leading-relaxed whitespace-pre-line">
                    {activeCard.back}
                  </p>
                </div>

                <div className="flex justify-center text-xs text-cyan-400 font-bold">
                  <span>Rate recall difficulty below to save SRS progress</span>
                </div>
              </div>

            </div>
          </div>

          {/* CARD CONTROLS & SRS RATING BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
            
            {/* Previous / Next Arrows */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handlePrev}
                className="p-3 rounded-2xl glass-panel border border-white/10 hover:border-white/30 text-white transition-all hover:scale-105"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="flex items-center space-x-2 px-5 py-3 rounded-2xl glass-panel border border-purple-500/30 text-purple-300 hover:border-purple-400 text-xs font-bold transition-all"
              >
                <RotateCw className="w-4 h-4 animate-spin-slow" />
                <span>Flip Card</span>
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-2xl glass-panel border border-white/10 hover:border-white/30 text-white transition-all hover:scale-105"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* SRS Rating Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleRateSRS('Hard')}
                className="px-4 py-2.5 rounded-xl bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold hover:bg-red-500/30 transition-all"
              >
                Hard 🔴
              </button>
              <button
                onClick={() => handleRateSRS('Medium')}
                className="px-4 py-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold hover:bg-amber-500/30 transition-all"
              >
                Medium 🟡
              </button>
              <button
                onClick={() => handleRateSRS('Easy')}
                className="px-4 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-500/30 transition-all"
              >
                Easy 🟢
              </button>
            </div>

          </div>

        </div>
      ) : (
        <div className="p-12 rounded-3xl glass-card border border-white/10 text-center space-y-3">
          <Layers className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Flashcards Available for this Subject</h3>
          <p className="text-xs text-slate-400">Create your own custom flashcard for this unit!</p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-purple-500 text-white font-bold text-xs"
          >
            Create Flashcard Now
          </button>
        </div>
      )}

      {/* CREATE FLASHCARD MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl glass-panel border border-purple-500/30 overflow-hidden p-6 sm:p-8 space-y-6 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-2 text-white font-bold text-lg">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span>Add New 3D Flashcard</span>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
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
                  <label className="block text-slate-300 font-semibold mb-1">Difficulty</label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value)}
                    className="w-full p-2.5 rounded-xl glass-input text-white"
                  >
                    <option value="Easy" className="bg-slate-900">Easy</option>
                    <option value="Medium" className="bg-slate-900">Medium</option>
                    <option value="Hard" className="bg-slate-900">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Front Question / Prompt *</label>
                <textarea
                  rows={3}
                  required
                  value={newFront}
                  onChange={(e) => setNewFront(e.target.value)}
                  placeholder="e.g. What is Einstein's photoelectric equation?"
                  className="w-full p-2.5 rounded-xl glass-input text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Back Answer / Explanation *</label>
                <textarea
                  rows={3}
                  required
                  value={newBack}
                  onChange={(e) => setNewBack(e.target.value)}
                  placeholder="e.g. E = hν = W₀ + K_max"
                  className="w-full p-2.5 rounded-xl glass-input text-white"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 text-white font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-extrabold shadow-lg shadow-purple-500/20"
                >
                  Add Card
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
