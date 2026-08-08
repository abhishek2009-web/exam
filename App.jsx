import React, { useState, useEffect } from 'react';
import { EXAM_CATEGORIES, getExamById } from './data/examCategories';
import { INITIAL_NOTES } from './data/notesData';
import { INITIAL_FLASHCARDS } from './data/flashcardsData';
import { MOCK_TESTS } from './data/testsData';

import { ThreeCanvas } from './components/ThreeCanvas';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { NotesSection } from './components/NotesSection';
import { FlashcardDeck } from './components/FlashcardDeck';
import { TestSimulator } from './components/TestSimulator';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { SyllabusViewer } from './components/SyllabusViewer';
import { ExamSelectorModal } from './components/ExamSelectorModal';

export function App() {
  const [activeView, setActiveView] = useState('hero');
  const [currentExamId, setCurrentExamId] = useState(() => {
    return localStorage.getItem('exam_nexus_active_exam') || 'jee_main';
  });
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);

  // Persistent notes state
  const [notesList, setNotesList] = useState(() => {
    const saved = localStorage.getItem('exam_nexus_notes');
    return saved ? JSON.parse(saved) : INITIAL_NOTES;
  });

  // Persistent flashcards state
  const [flashcardsList, setFlashcardsList] = useState(() => {
    const saved = localStorage.getItem('exam_nexus_flashcards');
    return saved ? JSON.parse(saved) : INITIAL_FLASHCARDS;
  });

  // Persistent test performance history state
  const [testHistory, setTestHistory] = useState(() => {
    const saved = localStorage.getItem('exam_nexus_test_history');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to local storage on changes
  useEffect(() => {
    localStorage.setItem('exam_nexus_active_exam', currentExamId);
  }, [currentExamId]);

  useEffect(() => {
    localStorage.setItem('exam_nexus_notes', JSON.stringify(notesList));
  }, [notesList]);

  useEffect(() => {
    localStorage.setItem('exam_nexus_flashcards', JSON.stringify(flashcardsList));
  }, [flashcardsList]);

  useEffect(() => {
    localStorage.setItem('exam_nexus_test_history', JSON.stringify(testHistory));
  }, [testHistory]);

  const currentExamObj = getExamById(currentExamId);

  const handleAddCustomNote = (newNote) => {
    setNotesList(prev => [newNote, ...prev]);
  };

  const handleAddCustomFlashcard = (newCard) => {
    setFlashcardsList(prev => [newCard, ...prev]);
  };

  const handleSaveTestResult = (resultObj) => {
    setTestHistory(prev => [resultObj, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#070a13] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black font-sans">
      
      {/* 3D Animated Background Canvas */}
      <ThreeCanvas
        themeMode={currentExamObj.theme}
        activeCategory={currentExamObj.categoryId}
      />

      {/* Top Navbar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        currentExamId={currentExamId}
        onOpenExamModal={() => setIsExamModalOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeView === 'hero' && (
          <HeroSection
            currentExamId={currentExamId}
            onSelectView={setActiveView}
            onOpenExamModal={() => setIsExamModalOpen(true)}
          />
        )}

        {activeView === 'notes' && (
          <NotesSection
            currentExamId={currentExamId}
            notesList={notesList}
            onAddCustomNote={handleAddCustomNote}
          />
        )}

        {activeView === 'flashcards' && (
          <FlashcardDeck
            currentExamId={currentExamId}
            flashcardsList={flashcardsList}
            onAddCustomFlashcard={handleAddCustomFlashcard}
          />
        )}

        {activeView === 'tests' && (
          <TestSimulator
            currentExamId={currentExamId}
            testsList={MOCK_TESTS}
            onSaveTestResult={handleSaveTestResult}
          />
        )}

        {activeView === 'analytics' && (
          <AnalyticsDashboard
            currentExamId={currentExamId}
            testHistory={testHistory}
          />
        )}

        {activeView === 'syllabus' && (
          <SyllabusViewer
            currentExamId={currentExamId}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-6 text-center text-xs text-slate-500 glass-panel">
        <p>© 2026 ExamNexus 3D • Tailored for JEE, NEET, UPSC, GATE, CAT, CLAT, SSC, and Global Entrance Exams.</p>
      </footer>

      {/* Global Exam Selector Modal */}
      <ExamSelectorModal
        isOpen={isExamModalOpen}
        onClose={() => setIsExamModalOpen(false)}
        currentExamId={currentExamId}
        onSelectExam={setCurrentExamId}
      />

    </div>
  );
}
