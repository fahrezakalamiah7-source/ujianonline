import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserCheck, 
  Users, 
  History, 
  Settings, 
  GraduationCap, 
  LogOut,
  ClipboardList,
  UserPlus
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../lib/utils';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) return <>{children}</>;

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/app', roles: ['admin', 'guru', 'staff', 'siswa'] },
    { name: 'Absensi Karyawan', icon: UserCheck, path: '/app/absensi-karyawan', roles: ['admin', 'guru', 'staff'] },
    { name: 'Absensi Siswa', icon: ClipboardList, path: '/app/absensi-siswa', roles: ['admin', 'guru'] },
    { name: 'Ujian Online', icon: GraduationCap, path: '/app/ujian', roles: ['siswa'] },
    { name: 'Hasil Ujian', icon: History, path: '/app/hasil-ujian', roles: ['guru', 'admin'] },
    { name: 'Rekap Absensi', icon: History, path: '/app/rekap', roles: ['admin', 'guru'] },
    { name: 'Data Siswa', icon: Users, path: '/app/data-siswa', roles: ['admin'] },
    { name: 'User Management', icon: UserPlus, path: '/app/users', roles: ['admin'] },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(user.role));

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6">
          <Link to="/app" className="flex items-center gap-2 font-bold text-xl text-red-600">
            <GraduationCap className="w-8 h-8" />
            <span>SMK PU</span>
          </Link>
          <div className="mt-1 text-xs text-gray-500 uppercase tracking-wider font-semibold">
            Tangerang Selatan
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {filteredMenu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium",
                location.pathname === item.path
                  ? "bg-red-50 text-red-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-gray-100 rounded-2xl p-4">
            <p className="text-xs text-gray-500 mb-1">Signed in as</p>
            <p className="font-bold text-sm truncate">{user.nama}</p>
            <p className="text-[10px] text-gray-500 uppercase bg-white px-2 py-0.5 rounded-full inline-block mt-1">
              {user.role}
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-bottom border-gray-200 flex items-center justify-between px-8 z-10 shrink-0">
          <h1 className="font-bold text-lg">
            {filteredMenu.find(m => m.path === location.pathname)?.name || 'Dashboard'}
          </h1>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors bg-gray-50 px-4 py-2 rounded-full font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
