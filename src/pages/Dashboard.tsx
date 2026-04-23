import React from 'react';
import { 
  Users, 
  CheckCircle2, 
  GraduationCap, 
  Calendar,
  Clock,
  ArrowUpRight,
  UserCheck2,
  FileText
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { format } from 'date-fns';
import { OFFICE_LOCATION } from '../constants';
import { motion } from 'motion/react';

export default function DashboardPage() {
  const { user } = useAuth();
  const today = new Date();

  const stats = [
    { label: 'Siswa Aktif', value: '1,248', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Hadir Hari Ini', value: '92%', icon: UserCheck2, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Ujian Berlangsung', value: '4', icon: GraduationCap, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Karyawan Absen', value: '154', icon: CheckCircle2, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between"
      >
        <div className="relative z-10">
          <p className="text-red-100 font-bold mb-2 uppercase tracking-widest text-xs">Informasi Sekolah</p>
          <h2 className="text-4xl font-bold mb-4">Selamat Datang, {user?.nama}!</h2>
          <p className="text-red-100 max-w-md leading-relaxed">
            Hari ini adalah hari {format(today, 'EEEE')}, saatnya untuk tetap produktif di lingkungan SMK Prima Unggul {OFFICE_LOCATION}.
          </p>
        </div>
        <div className="mt-6 md:mt-0 flex gap-4 relative z-10">
          <div className="bg-white/20 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center min-w-[120px]">
             <Clock className="w-6 h-6 mx-auto mb-2 opacity-80" />
             <div className="text-2xl font-bold">{format(today, 'HH:mm')}</div>
             <div className="text-[10px] uppercase font-bold text-red-100 tracking-wider">Waktu Lokal</div>
          </div>
          <div className="bg-white/20 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center min-w-[120px]">
             <Calendar className="w-6 h-6 mx-auto mb-2 opacity-80" />
             <div className="text-2xl font-bold">{format(today, 'dd')}</div>
             <div className="text-[10px] uppercase font-bold text-red-100 tracking-wider">{format(today, 'MMM yyyy')}</div>
          </div>
        </div>

        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-red-400/20 rounded-full -translate-x-1/2 translate-y-1/2" />
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2rem] border border-gray-100 hover:shadow-xl hover:shadow-gray-100 transition-all group">
            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-7 h-7" />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                <h4 className="text-3xl font-bold">{stat.value}</h4>
              </div>
              <div className="text-green-500 flex items-center text-xs font-bold">
                <ArrowUpRight className="w-4 h-4" />
                <span>+12%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 p-10">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-bold tracking-tight">Aktivitas Terkini</h3>
            <button className="text-red-600 text-sm font-bold hover:underline">Lihat Semua</button>
          </div>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-6 p-4 hover:bg-gray-50 rounded-2xl transition-colors">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6 text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">Ujian Matematika Diselesaikan</p>
                  <p className="text-xs text-gray-500">Oleh Siswa: Budi Santoso • Jurusan TKJ</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-red-600">Terverifikasi</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">2 Menit Lalu</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white">
          <h3 className="text-2xl font-bold mb-8 tracking-tight">Aksi Cepat</h3>
          <div className="space-y-4">
            <button className="w-full bg-white/10 hover:bg-white/20 border border-white/10 p-6 rounded-3xl flex items-center gap-4 transition-all text-left">
              <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold">Input Absen Siswa</p>
                <p className="text-xs text-white/50">Hadir: 1,024/1,248</p>
              </div>
            </button>
            <button className="w-full bg-white/10 hover:bg-white/20 border border-white/10 p-6 rounded-3xl flex items-center gap-4 transition-all text-left">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold">Buat Paket Ujian</p>
                <p className="text-xs text-white/50">Simpan sebagai Draft</p>
              </div>
            </button>
            <button className="w-full bg-red-600 hover:bg-red-700 p-6 rounded-3xl flex items-center gap-4 transition-all text-left">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold font-sans">Tambah Akun Baru</p>
                <p className="text-xs text-white/70">Guru / Staff / Siswa</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
