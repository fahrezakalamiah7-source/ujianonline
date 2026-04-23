import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowRight, User, Lock, KeyRound } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { DEPARTMENTS, OFFICE_LOCATION } from '../constants';
import { cn } from '../lib/utils';
import { Role, Jurusan } from '../types';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<Role>('siswa');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [jurusan, setJurusan] = useState<Jurusan>('TKJ');
  const [nama, setNama] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, validate with Supabase here
    login(activeTab, username, { 
      nama: nama || (activeTab === 'siswa' ? `Siswa ${username}` : `Staff ${username}`),
      jurusan: activeTab === 'siswa' ? jurusan : undefined 
    });
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-white rounded-[3rem] shadow-2xl shadow-slate-200 overflow-hidden border border-slate-100">
        
        {/* Left Side - Visual */}
        <div className="hidden lg:flex flex-col bg-red-600 p-16 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl w-fit mb-10">
               <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-5xl font-bold leading-tight mb-6">
              Sistem Portal <br/> Akademik.
            </h2>
            <p className="text-red-100 text-lg leading-relaxed max-w-md">
              Akses ujian online, absensi, dan rekap nilai dalam satu platform terintegrasi.
            </p>
          </div>
          
          <div className="mt-auto relative z-10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-red-400 flex items-center justify-center font-bold">
              PU
            </div>
            <div>
              <p className="font-bold">SMK Prima Unggul</p>
              <p className="text-xs text-red-200 uppercase tracking-widest">{OFFICE_LOCATION}</p>
            </div>
          </div>

          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-700 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-50" />
        </div>

        {/* Right Side - Form */}
        <div className="p-12 md:p-16">
          <div className="mb-10">
            <h3 className="text-3xl font-bold mb-2">Selamat Datang</h3>
            <p className="text-slate-500 text-sm">Silahkan login ke akun anda untuk melanjutkan.</p>
          </div>

          {/* Role Tabs */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8">
            <button
              onClick={() => setActiveTab('siswa')}
              className={cn(
                "flex-1 py-3 text-sm font-bold rounded-xl transition-all",
                activeTab === 'siswa' ? "bg-white text-red-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              Siswa
            </button>
            <button
              onClick={() => setActiveTab('guru')}
              className={cn(
                "flex-1 py-3 text-sm font-bold rounded-xl transition-all",
                activeTab === 'guru' ? "bg-white text-red-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              Guru / Staff
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={cn(
                "flex-1 py-3 text-sm font-bold rounded-xl transition-all",
                activeTab === 'admin' ? "bg-white text-red-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                {activeTab === 'siswa' ? 'Username / NISN' : 'Username'}
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder={activeTab === 'siswa' ? "Contoh: 12345678" : "Contoh: admin@smkpu.sch.id"}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all font-medium"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {activeTab === 'siswa' && (
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                  Jurusan
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <select
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all font-medium appearance-none"
                    value={jurusan}
                    onChange={(e) => setJurusan(e.target.value as Jurusan)}
                  >
                    {DEPARTMENTS.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-red-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-all shadow-lg shadow-red-100 mt-6"
            >
              Masuk Sekarang <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <p className="text-center text-slate-400 text-xs mt-10">
            Lupa password? Hubungi <span className="text-red-600 font-bold">Tim IT Center</span>
          </p>
        </div>
      </div>
    </div>
  );
}
