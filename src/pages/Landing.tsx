import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, BookOpen, Users, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { DEPARTMENTS, OFFICE_LOCATION } from '../constants';
import { motion } from 'motion/react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 p-2 rounded-xl">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div className="leading-tight">
              <span className="text-xl font-bold block tracking-tight">SMK PRIMA UNGGUL</span>
              <span className="text-xs text-slate-500 font-medium uppercase tracking-widest">{OFFICE_LOCATION}</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/login" className="px-6 py-2.5 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-200">
              Portal Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-sm font-bold mb-6">
              Membangun Generasi Unggul & Mandiri
            </span>
            <h1 className="text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-8">
              Masa Depan <br/> <span className="text-red-600">Terang Starts Here.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg">
              SMK Prima Unggul hadir untuk mencetak tenaga kerja profesional yang siap bersaing di era digital dengan bekal iman dan takwa.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/login" className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all">
                Daftar Sekarang <ArrowRight className="w-5 h-5" />
              </Link>
              <div className="flex -space-x-4 items-center">
                <div className="w-12 h-12 rounded-full border-4 border-white bg-slate-200" />
                <div className="w-12 h-12 rounded-full border-4 border-white bg-slate-300" />
                <div className="w-12 h-12 rounded-full border-4 border-white bg-slate-400" />
                <span className="ml-6 text-sm font-bold text-slate-600">+1.5k Students Graduated</span>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square bg-red-600 rounded-[4rem] overflow-hidden relative shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Students" 
                className="w-full h-full object-cover mix-blend-overlay opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/60 to-transparent" />
            </div>
            {/* Stats Badge */}
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-xl border border-slate-100 max-w-[240px]">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-red-50 text-red-600 rounded-2xl">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold leading-none">98%</div>
                  <div className="text-xs text-slate-500 font-medium">Work Ready</div>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Lulusan kami telah terserap di berbagai industri kreatif & teknologi.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Jurusan Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 tracking-tight">Pilihan Jurusan Unggulan</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Kurikulum yang diselaraskan dengan kebutuhan industri masa kini.
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DEPARTMENTS.map((dept, idx) => (
            <motion.div 
              key={dept.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[3rem] border border-slate-100 hover:border-red-200 transition-all group"
            >
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{dept.name}</h3>
              <p className="text-slate-500 leading-relaxed">
                {dept.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
             <div className="bg-slate-900 p-2 rounded-xl">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">SMK PRIMA UNGGUL</span>
          </div>
          <div className="flex gap-8 text-sm font-bold text-slate-500">
            <a href="#" className="hover:text-red-600">Visi & Misi</a>
            <a href="#" className="hover:text-red-600">Kontak</a>
            <a href="#" className="hover:text-red-600">Berita</a>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <MapPin className="w-4 h-4" />
            <span>Kota {OFFICE_LOCATION}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
