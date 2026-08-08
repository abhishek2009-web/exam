import React, { useState, useEffect } from 'react';
import { getExamById } from '../data/examCategories';
import confetti from 'canvas-confetti';
import { Award, Clock, CheckCircle2, XCircle, AlertCircle, Bookmark, ArrowRight, RefreshCw, Trophy, FileCheck } from 'lucide-react';

export const TestSimulator = ({ currentExamId, testsList, onSaveTestResult }) => {
  const currentExam = getExamById(currentExamId);

  // Find test matching current exam or fallback
  const examTests = testsList.filter(t => t.examId === currentExamId);
  const activeTest = examTests[0] || testsList[0];

  const [testState, setTestState] = useState('idle'); // 'idle' | 'running' | 'submitted'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [qId]: optionIndex }
  const [markedForReview, setMarkedForReview] = useState([]);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [testResult, setTestResult] = useState(null);

  // Timer countdown hook
  useEffect(() => {
    let interval = null;
    if (testState === 'running' && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [testState, secondsRemaining]);

  const handleStartTest = () => {
    if (!activeTest) return;
    setUserAnswers({});
    setMarkedForReview([]);
    setCurrentQuestionIndex(0);
    setSecondsRemaining((activeTest.timeLimitMinutes || 15) * 60);
    setTestState('running');
  };

  const handleSelectOption = (qId, optionIdx) => {
    setUserAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  const toggleMarkReview = (qId) => {
    setMarkedForReview(prev =>
      prev.includes(qId) ? prev.filter(id => id !== qId) : [...prev, qId]
    );
  };

  const handleSubmitTest = () => {
    if (!activeTest) return;

    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;
    let totalScore = 0;

    const questions = activeTest.questions;
    const scheme = activeTest.markingScheme || currentExam.markingSchemeObj || { correct: 4, incorrect: -1, unattempted: 0 };

    questions.forEach(q => {
      const selectedOption = userAnswers[q.id];
      if (selectedOption === undefined) {
        unattemptedCount += 1;
        totalScore += scheme.unattempted || 0;
      } else if (selectedOption === q.correctIndex) {
        correctCount += 1;
        totalScore += scheme.correct || 4;
      } else {
        incorrectCount += 1;
        totalScore += scheme.incorrect || -1;
      }
    });

    const maxScore = questions.length * (scheme.correct || 4);
    const accuracy = questions.length - unattemptedCount > 0
      ? Math.round((correctCount / (questions.length - unattemptedCount)) * 100)
      : 0;

    const resultObj = {
      testId: activeTest.id,
      examId: currentExamId,
      examName: currentExam.name,
      testTitle: activeTest.title,
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      totalQuestions: questions.length,
      correctCount,
      incorrectCount,
      unattemptedCount,
      totalScore,
      maxScore,
      accuracy,
      timeSpentSeconds: (activeTest.timeLimitMinutes * 60) - secondsRemaining
    };

    setTestResult(resultObj);
    setTestState('submitted');
    onSaveTestResult(resultObj);

    // Fire celebration confetti if accuracy >= 70%
    if (accuracy >= 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!activeTest) {
    return (
      <div className="relative z-10 max-w-4xl mx-auto p-12 text-center text-slate-300">
        No test available for this exam yet.
      </div>
    );
  }

  const currentQ = activeTest.questions[currentQuestionIndex];

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* 1. IDLE STATE — TEST INTRO & START SCREEN */}
      {testState === 'idle' && (
        <div className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl glass-card border border-emerald-500/30 space-y-8 shadow-2xl shadow-emerald-950/40 text-center">
          
          <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {currentExam.name} • Official Pattern
            </span>
            <h2 className="text-3xl font-black text-white">{activeTest.title}</h2>
            <p className="text-xs text-slate-400">Simulate actual exam conditions with timer, question palette, and negative marking.</p>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="block text-[10px] text-slate-400 font-semibold uppercase">Total Questions</span>
              <span className="text-lg font-black text-white">{activeTest.questions.length} Questions</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="block text-[10px] text-slate-400 font-semibold uppercase">Time Limit</span>
              <span className="text-lg font-black text-emerald-400">{activeTest.timeLimitMinutes} Mins</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="block text-[10px] text-slate-400 font-semibold uppercase">Marking Scheme</span>
              <span className="text-xs font-extrabold text-cyan-300">{currentExam.markingScheme}</span>
            </div>
          </div>

          <button
            onClick={handleStartTest}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-600 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all flex items-center justify-center space-x-2"
          >
            <span>Begin Mock Exam Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>

        </div>
      )}

      {/* 2. RUNNING STATE — LIVE TEST ARENA */}
      {testState === 'running' && currentQ && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Question Panel */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Top Bar: Question # & Timer */}
            <div className="flex items-center justify-between p-4 rounded-2xl glass-panel border border-white/10">
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                  Q {currentQuestionIndex + 1} of {activeTest.questions.length}
                </span>
                <span className="text-xs text-slate-400 font-medium">{currentQ.subject}</span>
              </div>

              <div className="flex items-center space-x-2 px-4 py-1.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 font-mono text-sm font-bold">
                <Clock className="w-4 h-4 text-red-400 animate-pulse" />
                <span>{formatTime(secondsRemaining)}</span>
              </div>
            </div>

            {/* Question Text Card */}
            <div className="p-6 sm:p-8 rounded-3xl glass-card border border-white/10 space-y-6">
              <h3 className="text-lg font-bold text-white leading-relaxed">
                {currentQ.question}
              </h3>

              {/* Options Radio List */}
              <div className="space-y-3">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = userAnswers[currentQ.id] === optIdx;

                  return (
                    <div
                      key={optIdx}
                      onClick={() => handleSelectOption(currentQ.id, optIdx)}
                      className={`p-4 rounded-2xl cursor-pointer border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-emerald-400 bg-emerald-950/40 text-emerald-200 shadow-md shadow-emerald-500/20 font-bold'
                          : 'border-white/10 bg-white/5 text-slate-200 hover:border-white/20 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-xs sm:text-sm">{opt}</span>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-emerald-400 bg-emerald-400' : 'border-slate-500'
                      }`}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-slate-950" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => toggleMarkReview(currentQ.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  markedForReview.includes(currentQ.id)
                    ? 'bg-amber-500/30 text-amber-300 border border-amber-500/40'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>{markedForReview.includes(currentQ.id) ? 'Marked for Review' : 'Mark for Review'}</span>
              </button>

              <div className="flex items-center space-x-3">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs disabled:opacity-40"
                >
                  Prev
                </button>
                <button
                  onClick={() => {
                    if (currentQuestionIndex < activeTest.questions.length - 1) {
                      setCurrentQuestionIndex(prev => prev + 1);
                    } else {
                      handleSubmitTest();
                    }
                  }}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs shadow-md shadow-emerald-500/20"
                >
                  {currentQuestionIndex === activeTest.questions.length - 1 ? 'Submit Test' : 'Next Question →'}
                </button>
              </div>
            </div>

          </div>

          {/* Right Question Palette Drawer */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Question Navigation Palette</h4>
              
              <div className="grid grid-cols-5 gap-2">
                {activeTest.questions.map((q, idx) => {
                  const isAnswered = userAnswers[q.id] !== undefined;
                  const isMarked = markedForReview.includes(q.id);
                  const isCurrent = currentQuestionIndex === idx;

                  let colorClass = 'bg-white/10 text-slate-300 border-white/10';
                  if (isCurrent) colorClass = 'border-cyan-400 ring-2 ring-cyan-400/50 bg-cyan-950 text-cyan-300 font-black';
                  else if (isMarked) colorClass = 'bg-amber-500/30 text-amber-300 border-amber-500/40';
                  else if (isAnswered) colorClass = 'bg-emerald-500/30 text-emerald-300 border-emerald-500/40 font-bold';

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`p-2.5 rounded-xl border text-xs text-center transition-all ${colorClass}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2 text-[11px] text-slate-400 font-medium">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500/40" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded bg-amber-500/30 border border-amber-500/40" />
                  <span>Marked for Review</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded bg-white/10 border border-white/10" />
                  <span>Unattempted</span>
                </div>
              </div>

              <button
                onClick={handleSubmitTest}
                className="w-full py-3 rounded-xl bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold hover:bg-red-500/30 transition-all mt-4"
              >
                Finish & Submit Test
              </button>
            </div>
          </div>

        </div>
      )}

      {/* 3. SUBMITTED STATE — SCORE BREAKDOWN & SOLUTIONS */}
      {testState === 'submitted' && testResult && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Result Banner Card */}
          <div className="p-8 rounded-3xl glass-card border border-cyan-500/30 space-y-6 shadow-2xl text-center max-w-4xl mx-auto">
            
            <div className="w-16 h-16 mx-auto rounded-3xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
              <Trophy className="w-8 h-8" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Performance Recorded
              </span>
              <h2 className="text-3xl font-black text-white mt-2">Test Scorecard Summary</h2>
              <p className="text-xs text-slate-400 mt-1">{testResult.testTitle}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="block text-[10px] text-slate-400 font-semibold uppercase">Total Score</span>
                <span className="text-2xl font-black text-cyan-400">{testResult.totalScore} / {testResult.maxScore}</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="block text-[10px] text-slate-400 font-semibold uppercase">Accuracy</span>
                <span className="text-2xl font-black text-emerald-400">{testResult.accuracy}%</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="block text-[10px] text-slate-400 font-semibold uppercase">Correct Answers</span>
                <span className="text-2xl font-black text-emerald-400">{testResult.correctCount}</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="block text-[10px] text-slate-400 font-semibold uppercase">Incorrect (-ve)</span>
                <span className="text-2xl font-black text-red-400">{testResult.incorrectCount}</span>
              </div>
            </div>

            <button
              onClick={() => setTestState('idle')}
              className="px-6 py-3 rounded-2xl bg-cyan-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all inline-flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retake Test</span>
            </button>
          </div>

          {/* Solutions Breakdown */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <FileCheck className="w-5 h-5 text-cyan-400" />
              <span>Step-by-Step Solutions & Key Explanations</span>
            </h3>

            <div className="space-y-4">
              {activeTest.questions.map((q, idx) => {
                const userChoice = userAnswers[q.id];
                const isCorrect = userChoice === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className={`p-6 rounded-2xl glass-card border space-y-3 ${
                      isCorrect ? 'border-emerald-500/30 bg-emerald-950/10' : 'border-red-500/30 bg-red-950/10'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-300">Q {idx + 1}: {q.subject}</span>
                      <span className={isCorrect ? 'text-emerald-400' : 'text-red-400'}>
                        {isCorrect ? 'Correct (+4)' : userChoice !== undefined ? 'Incorrect (-1)' : 'Unattempted (0)'}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white">{q.question}</h4>

                    <div className="space-y-1.5 text-xs">
                      {q.options.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`p-2.5 rounded-xl border ${
                            oIdx === q.correctIndex
                              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200 font-bold'
                              : oIdx === userChoice
                              ? 'bg-red-500/20 border-red-500/40 text-red-200 font-bold'
                              : 'bg-white/5 border-white/5 text-slate-400'
                          }`}
                        >
                          {opt} {oIdx === q.correctIndex && ' (Correct Answer ✅)'}
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-slate-300 space-y-1">
                      <span className="text-cyan-400 font-bold block">Solution Explanation:</span>
                      <p>{q.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
