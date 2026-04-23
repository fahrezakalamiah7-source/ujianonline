import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Clock, CheckCircle2, AlertCircle, Calendar, MapPin, UserCheck } from 'lucide-react';
import { format } from 'date-fns';
import { OFFICE_LOCATION } from '../constants';
import { cn } from '../lib/utils';

export default function AttendancePage() {
  const { user } = useAuth();
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [hasCheckedOut, setHasCheckedOut] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);

  const currentTime = new Date();
  
  const handleCheckIn = () => {
    setCheckInTime(format(new Date(), 'HH:mm:ss'));
    setHasCheckedIn(true);
  };

  const handleCheckOut = () => {
    setCheckOutTime(format(new Date(), 'HH:mm:ss'));
    setHasCheckedOut(true);
  };

  return (
    <div className="max-w-4xl space-y-8">
      {/* Location Header */}
      <div className="bg-white p-8 rounded-[2rem] border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
           <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
             <MapPin className="w-7 h-7" />
           </div>
           <div>
             <h3 className="font-bold text-xl leading-tight">Presensi Kehadiran</h3>
             <p className="text-sm text-gray-500 font-medium">{OFFICE_LOCATION} • SMK Prima Unggul</p>
           </div>
        </div>
        <div className="bg-gray-50 px-6 py-4 rounded-2xl border border-gray-100 text-center">
           <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Status Lokasi</div>
           <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
             <CheckCircle2 className="w-4 h-4" />
             <span>Dalam Radius Kerja</span>
           </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Clock Card */}
        <div className="bg-slate-900 rounded-[2.5rem] p-12 text-white relative overflow-hidden flex flex-col items-center">
           <div className="relative z-10 text-center">
              <p className="text-white/50 font-bold uppercase tracking-[0.2em] text-xs mb-4">Waktu Hari Ini</p>
              <h2 className="text-7xl font-bold mb-4 tracking-tighter tabular-nums">{format(currentTime, 'HH:mm')}</h2>
              <p className="text-xl font-medium text-white/70">{format(currentTime, 'EEEE, dd MMMM yyyy')}</p>
           </div>
           <div className="mt-12 w-full grid grid-cols-2 gap-4 relative z-10">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 text-center border border-white/10">
                 <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest mb-2">Datang</p>
                 <p className="text-xl font-bold">{checkInTime || '--:--'}</p>
              </div>
               <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 text-center border border-white/10">
                 <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest mb-2">Pulang</p>
                 <p className="text-xl font-bold">{checkOutTime || '--:--'}</p>
              </div>
           </div>

           <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 rounded-full blur-3xl" />
           <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl" />
        </div>

        {/* Action Card */}
        <div className="bg-white rounded-[2.5rem] p-12 border border-gray-100 flex flex-col justify-center gap-8">
           <div className="space-y-4">
              <button
                disabled={hasCheckedIn}
                onClick={handleCheckIn}
                className={cn(
                  "w-full py-6 rounded-3xl font-bold text-xl flex items-center justify-center gap-4 transition-all",
                  hasCheckedIn 
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                    : "bg-red-600 text-white hover:bg-red-700 shadow-xl shadow-red-100"
                )}
              >
                <Clock className="w-6 h-6" />
                {hasCheckedIn ? 'Sudah Absen Masuk' : 'Absen Masuk Sekarang'}
              </button>

              <button
                disabled={!hasCheckedIn || hasCheckedOut}
                onClick={handleCheckOut}
                className={cn(
                  "w-full py-6 rounded-3xl font-bold text-xl flex items-center justify-center gap-4 transition-all border-2",
                  (!hasCheckedIn || hasCheckedOut)
                    ? "bg-white border-gray-100 text-gray-300 cursor-not-allowed"
                    : "bg-white border-slate-900 text-slate-900 hover:bg-slate-50"
                )}
              >
                <UserCheck className="w-6 h-6" />
                {hasCheckedOut ? 'Sudah Absen Pulang' : 'Absen Pulang Sekarang'}
              </button>
           </div>

           <div className="bg-amber-50 rounded-3xl p-6 border border-amber-100 flex gap-4">
              <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
              <div>
                <p className="text-sm font-bold text-amber-900">Peringatan Kehadiran</p>
                <p className="text-xs text-amber-700 leading-relaxed mt-1">
                  Harap melakukan presensi sesuai dengan jam operasional sekolah. Keterlambatan lebih dari 15 menit akan tercatat secara otomatis.
                </p>
              </div>
           </div>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 p-10">
         <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold tracking-tight">Riwayat Mingguan</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500 font-bold bg-gray-50 px-4 py-2 rounded-full">
               <Calendar className="w-4 h-4" />
               <span>April 2026</span>
            </div>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full">
               <thead>
                  <tr className="text-left border-b border-gray-50">
                     <th className="pb-4 text-[10px] uppercase tracking-widest font-black text-gray-400">Tanggal</th>
                     <th className="pb-4 text-[10px] uppercase tracking-widest font-black text-gray-400">Jam Masuk</th>
                     <th className="pb-4 text-[10px] uppercase tracking-widest font-black text-gray-400">Jam Pulang</th>
                     <th className="pb-4 text-[10px] uppercase tracking-widest font-black text-gray-400">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {[1, 2, 3].map(i => (
                    <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                       <td className="py-6 font-bold text-gray-900">Senin, {20-i} Apr</td>
                       <td className="py-6 font-medium text-gray-600">07:5{i}</td>
                       <td className="py-6 font-medium text-gray-600">16:45</td>
                       <td className="py-6">
                          <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm border border-green-100">Hadir</span>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
