export type Role = 'admin' | 'guru' | 'staff' | 'siswa';

export type Jurusan = 'TKJ' | 'DKV' | 'AK' | 'BC' | 'MPLB' | 'BD';

export interface User {
  id: string;
  username: string; // For Siswa this is NISN
  nama: string;
  role: Role;
  jurusan?: Jurusan;
  kelas?: string;
}

export interface Attendance {
  id: string;
  userId: string;
  timestamp: string;
  type: 'masuk' | 'pulang';
  date: string;
}

export interface StudentAttendance {
  id: string;
  studentId: string;
  guruId: string;
  date: string;
  status: 'hadir' | 'izin' | 'sakit' | 'alfa';
  timestamp: string;
}

export interface Exam {
  id: string;
  title: string;
  jurusan: Jurusan;
  duration: number; // in minutes
}

export interface Question {
  id: string;
  examId: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface ExamResult {
  id: string;
  studentId: string;
  examId: string;
  score: number;
  timestamp: string;
  answers: number[];
}
