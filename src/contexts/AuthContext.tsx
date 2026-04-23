import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';

interface AuthContextType {
  user: User | null;
  login: (role: Role, username: string, extra?: any) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('smk_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (role: Role, username: string, extra?: any) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      nama: extra?.nama || username,
      role,
      jurusan: extra?.jurusan,
      kelas: extra?.kelas
    };
    setUser(newUser);
    localStorage.setItem('smk_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('smk_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
