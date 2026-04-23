import { Question } from '../types';

export const EXAM_QUESTIONS: Record<string, Question[]> = {
  'DEFAULT': Array.from({ length: 30 }, (_, i) => ({
    id: `q-${i}`,
    examId: 'general-exam',
    text: `Contoh Pertanyaan ke-${i + 1}: Apa langkah pertama dalam menyelesaikan masalah teknologi di era digital?`,
    options: [
      'Mematikan perangkat',
      'Melakukan identifikasi masalah',
      'Bertanya kepada atasan',
      'Membeli perangkat baru',
      'Mengabaikan masalah'
    ],
    correctAnswer: 1
  }))
};

// Generate specific questions for each department
export const getQuestionsForJurusan = (jurusan: string): Question[] => {
  const base = EXAM_QUESTIONS['DEFAULT'];
  return base.map((q, idx) => {
    let text = q.text;
    if (jurusan === 'TKJ') text = `[TKJ] ${q.text.replace('teknologi', 'jaringan komputer')}`;
    if (jurusan === 'DKV') text = `[DKV] ${q.text.replace('teknologi', 'desain grafis')}`;
    if (jurusan === 'AK') text = `[AK] ${q.text.replace('teknologi', 'akuntansi keuangan')}`;
    return { ...q, text };
  });
};
