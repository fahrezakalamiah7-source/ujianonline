import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AppLayout from './components/Layout';
import LandingPage from './pages/Landing';
import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';
import ExamPage from './pages/Exam';
import AttendancePage from './pages/Attendance';

function ProtectedRoute({ children, roles }: { children: React.ReactNode; roles?: string[] }) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return <div className="h-screen flex items-center justify-center font-bold">SMK Prima Unggul Portal...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/app" replace />;
  
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/app" element={
            <ProtectedRoute>
              <AppLayout>
                <DashboardPage />
              </AppLayout>
            </ProtectedRoute>
          } />

          <Route path="/app/ujian" element={
            <ProtectedRoute roles={['siswa']}>
              <AppLayout>
                <ExamPage />
              </AppLayout>
            </ProtectedRoute>
          } />

          <Route path="/app/absensi-karyawan" element={
            <ProtectedRoute roles={['admin', 'guru', 'staff']}>
              <AppLayout>
                <AttendancePage />
              </AppLayout>
            </ProtectedRoute>
          } />

          {/* Placeholder for other routes */}
          <Route path="/app/*" element={
            <ProtectedRoute>
              <AppLayout>
                <div className="flex flex-col items-center justify-center h-full text-center">
                   <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                      <Settings className="w-10 h-10 text-gray-300" />
                   </div>
                   <h2 className="text-2xl font-bold mb-2">Halaman Sedang Dikembangkan</h2>
                   <p className="text-gray-400">Menu ini akan segera tersedia pada update berikutnya.</p>
                </div>
              </AppLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

import { Settings } from 'lucide-react';
