'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'coach' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@trianglesportsacademy.com', role: 'admin', phone: '+91 98765 43210' },
  { id: '2', name: 'Coach Rajan', email: 'coach@trianglesportsacademy.com', role: 'coach', phone: '+91 98765 11111' },
  { id: '3', name: 'Student Arjun', email: 'student@trianglesportsacademy.com', role: 'student', phone: '+91 98765 22222' },
];

const DEMO_PASSWORDS: Record<string, string> = {
  'admin@trianglesportsacademy.com': 'admin123',
  'coach@trianglesportsacademy.com': 'coach123',
  'student@trianglesportsacademy.com': 'student123',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('smashpro_user');
    if (stored) setUser(JSON.parse(stored));
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const match = DEMO_USERS.find(u => u.email === email);
    if (match && DEMO_PASSWORDS[email] === password) {
      setUser(match);
      localStorage.setItem('smashpro_user', JSON.stringify(match));
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('smashpro_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
