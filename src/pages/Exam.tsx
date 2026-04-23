import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getQuestionsForJurusan } from '../data/questions';
import { Question } from '../types';
import { CheckCircle2, Clock, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import { KKM_SCORE } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function ExamPage() {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (user?.jurusan) {
      setQuestions(getQuestionsForJurusan(user.jurusan));
    }
  }, [user]);

  useEffect(() => {
    if (isFinished || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [isFinished, timeLeft]);

  const handleSelect = (qId: string, optIdx: number) => {
    setAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });
    return Math.round((correct / questions.length) * 100);
  };

  const finishExam = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setIsFinished(true);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (isFinished) {
    const passed = score >= KKM_SCORE;
    return (
      <div className="max-w-3xl mx-auto py-12 text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-xl"
        >
          <div className={cn(
            "w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg",
            passed ? "bg-green-100 text-green-600 shadow-green-100" : "bg-red-100 text-red-600 shadow-red-100"
          )}>
            {passed ? <CheckCircle2 className="w-12 h-12" /> : <AlertCircle className="w-12 h-12" />}
          </div>
          <h2 className="text-4xl font-bold mb-2">Ujian Selesai!</h2>
          <p className="text-gray-500 mb-10 font-bold uppercase tracking-widest text-xs">Hasil Ujian Online {user?.jurusan}</p>
          
          <div className="text-8xl font-black mb-4 tracking-tighter tabular-nums">
             {score}
          </div>
          <div className={cn(
            "inline-block px-8 py-2 rounded-full font-bold text-sm mb-10",
            passed ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
          )}>
            {passed ? 'LULUS (DI ATAS KKM)' : 'TIDAK LULUS (DI BAWAH KKM)'}
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-10">
             <div className="p-6 bg-gray-50 rounded-3xl">
                <p className="text-xs text-gray-400 font-bold uppercase mb-1">KKM Sekolah</p>
                <p className="text-2xl font-bold">{KKM_SCORE}</p>
             </div>
             <div className="p-6 bg-gray-50 rounded-3xl">
                <p className="text-xs text-gray-400 font-bold uppercase mb-1">Total Soal</p>
                <p className="text-2xl font-bold">{questions.length}</p>
             </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentQ = questions[currentIdx];
  if (!currentQ) return <div className="text-center py-20 p-8">Memuat soal ujian...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between bg-white p-8 rounded-[2rem] border border-gray-100">
        <div className="flex items-center gap-5">
           <div className="w-14 h-14 bg-red-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl">
             {user?.jurusan?.[0]}
           </div>
           <div>
             <h3 className="font-bold text-xl leading-tight">Ujian Kompetensi {user?.jurusan}</h3>
             <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">{questions.length} Butir Soal • Online Exam</p>
           </div>
        </div>
        
        <div className={cn(
          "flex items-center gap-4 px-8 py-4 rounded-[1.5rem] border font-bold text-2xl tabular-nums",
          timeLeft < 300 ? "bg-red-50 text-red-600 border-red-100 animate-pulse" : "bg-slate-900 text-white border-slate-900"
        )}>
          <Clock className="w-6 h-6" />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Main Exam Area */}
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Question Content */}
        <div className="lg:col-span-3 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIdx}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="bg-white p-12 rounded-[2.5rem] border border-gray-100 min-h-[500px] flex flex-col shadow-sm"
            >
              <div className="mb-8">
                <span className="bg-red-50 text-red-600 px-4 py-1 rounded-full text-xs font-black uppercase mb-4 inline-block">
                  Soal No. {currentIdx + 1}
                </span>
                <p className="text-2xl font-bold leading-relaxed tracking-tight">
                  {currentQ.text}
                </p>
              </div>

              <div className="space-y-4 mt-auto">
                {currentQ.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(currentQ.id, i)}
                    className={cn(
                      "w-full text-left p-6 rounded-3xl border-2 transition-all flex items-center gap-6 group",
                      answers[currentQ.id] === i 
                        ? "border-red-600 bg-red-50 text-red-700 shadow-md shadow-red-100" 
                        : "border-gray-50 bg-gray-50 hover:border-gray-200 hover:bg-white"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 transition-colors",
                      answers[currentQ.id] === i ? "bg-red-600 text-white" : "bg-white text-gray-400 group-hover:text-gray-900"
                    )}>
                      {String.fromCharCode(65 + i)}
                    </div>
                    <span className="font-bold text-lg">{opt}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between pt-4">
             <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(c => c - 1)}
                className="flex items-center gap-2 px-8 py-4 bg-white border border-gray-100 rounded-2xl font-bold text-gray-500 disabled:opacity-50 hover:bg-gray-50 transition-all"
             >
               <ArrowLeft className="w-5 h-5" /> Prev
             </button>
             <button
                disabled={currentIdx === questions.length - 1}
                onClick={() => setCurrentIdx(c => c + 1)}
                className="flex items-center gap-2 px-8 py-4 bg-white border border-gray-100 rounded-2xl font-bold text-gray-900 disabled:opacity-50 hover:bg-gray-50 transition-all"
             >
               Next <ArrowRight className="w-5 h-5" />
             </button>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm h-fit sticky top-8">
           <h4 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-6">Navigasi Soal</h4>
           <div className="grid grid-cols-5 gap-2">
             {questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  className={cn(
                    "w-full aspect-square rounded-xl text-xs font-bold transition-all border",
                    currentIdx === i ? "border-slate-900 bg-slate-900 text-white" : 
                    answers[questions[i].id] !== undefined ? "bg-red-50 border-red-100 text-red-600" :
                    "bg-gray-50 border-gray-50 text-gray-400 hover:border-gray-200"
                  )}
                >
                  {i + 1}
                </button>
             ))}
           </div>

           <div className="mt-10 pt-10 border-t border-gray-100">
             <button
                onClick={finishExam}
                className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-100"
             >
                Selesaikan Ujian
             </button>
             <p className="text-[10px] text-gray-400 text-center mt-4 uppercase tracking-widest leading-loose">
               Pastikan semua jawaban <br/> terisi dengan benar.
             </p>
           </div>
        </div>
      </div>
    </div>
  );
}
