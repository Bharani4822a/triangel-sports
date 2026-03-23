'use client';
import React, { createContext, useContext, useState } from 'react';

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional';
export type BatchTime = 'Morning 6-8 AM' | 'Morning 8-10 AM' | 'Evening 4-6 PM' | 'Evening 6-8 PM';
export type BookingStatus = 'Available' | 'Pending' | 'Booked';
export type PaymentStatus = 'Paid' | 'Pending' | 'Overdue';

export interface Student {
  id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  skillLevel: SkillLevel;
  batch: BatchTime;
  joinDate: string;
  feeStatus: PaymentStatus;
  monthlyFee: number;
  group: string;
  parentName?: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late';
}

export interface FeeRecord {
  id: string;
  studentId: string;
  studentName: string;
  month: string;
  amount: number;
  status: PaymentStatus;
  paidDate?: string;
  receiptNo?: string;
}

export interface CourtBooking {
  id: string;
  courtNo: number;
  date: string;
  timeSlot: string;
  userName: string;
  userId: string;
  status: BookingStatus | 'Rejected';
  price: number;
  transactionId?: string;
  paymentProof?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'danger';
  createdAt: string;
  read: boolean;
  targetRole?: 'all' | 'admin' | 'coach' | 'student';
}

export interface Tournament {
  id: string;
  name: string;
  date: string;
  venue: string;
  category: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  participants: string[];
  results?: { position: number; name: string; score: string }[];
}

const INITIAL_STUDENTS: Student[] = [
  { id: 's1', name: 'Arjun Sharma', age: 16, email: 'arjun@gmail.com', phone: '9876543001', skillLevel: 'Intermediate', batch: 'Morning 6-8 AM', joinDate: '2024-01-15', feeStatus: 'Paid', monthlyFee: 1500, group: 'Group A', parentName: 'Ramesh Sharma' },
  { id: 's2', name: 'Priya Patel', age: 14, email: 'priya@gmail.com', phone: '9876543002', skillLevel: 'Beginner', batch: 'Evening 4-6 PM', joinDate: '2024-02-10', feeStatus: 'Pending', monthlyFee: 1200, group: 'Group B', parentName: 'Suresh Patel' },
  { id: 's3', name: 'Rahul Mehta', age: 18, email: 'rahul@gmail.com', phone: '9876543003', skillLevel: 'Advanced', batch: 'Morning 8-10 AM', joinDate: '2023-11-05', feeStatus: 'Paid', monthlyFee: 2000, group: 'Group A', parentName: 'Vijay Mehta' },
  { id: 's4', name: 'Sneha Kumar', age: 12, email: 'sneha@gmail.com', phone: '9876543004', skillLevel: 'Beginner', batch: 'Evening 6-8 PM', joinDate: '2024-03-01', feeStatus: 'Overdue', monthlyFee: 1200, group: 'Group C', parentName: 'Anil Kumar' },
  { id: 's5', name: 'Vikram Singh', age: 22, email: 'vikram@gmail.com', phone: '9876543005', skillLevel: 'Professional', batch: 'Morning 6-8 AM', joinDate: '2023-06-20', feeStatus: 'Paid', monthlyFee: 3000, group: 'Group A' },
  { id: 's6', name: 'Anita Reddy', age: 17, email: 'anita@gmail.com', phone: '9876543006', skillLevel: 'Intermediate', batch: 'Evening 4-6 PM', joinDate: '2024-01-20', feeStatus: 'Paid', monthlyFee: 1500, group: 'Group B' },
  { id: 's7', name: 'Mohan Das', age: 20, email: 'mohan@gmail.com', phone: '9876543007', skillLevel: 'Advanced', batch: 'Morning 8-10 AM', joinDate: '2023-09-15', feeStatus: 'Pending', monthlyFee: 2000, group: 'Group A' },
  { id: 's8', name: 'Kavitha Nair', age: 15, email: 'kavitha@gmail.com', phone: '9876543008', skillLevel: 'Intermediate', batch: 'Evening 6-8 PM', joinDate: '2024-02-28', feeStatus: 'Paid', monthlyFee: 1500, group: 'Group C' },
  { id: 's9', name: 'Ravi Joshi', age: 13, email: 'ravi@gmail.com', phone: '9876543009', skillLevel: 'Beginner', batch: 'Evening 4-6 PM', joinDate: '2024-03-10', feeStatus: 'Paid', monthlyFee: 1200, group: 'Group B' },
  { id: 's10', name: 'Pooja Iyer', age: 19, email: 'pooja@gmail.com', phone: '9876543010', skillLevel: 'Advanced', batch: 'Morning 6-8 AM', joinDate: '2023-12-01', feeStatus: 'Paid', monthlyFee: 2000, group: 'Group A' },
];

const today = new Date().toISOString().split('T')[0];

const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  ...INITIAL_STUDENTS.map((s, i) => ({ id: `a${i}1`, studentId: s.id, date: today, status: i % 3 === 0 ? 'Absent' as const : 'Present' as const })),
];

const INITIAL_FEES: FeeRecord[] = [
  { id: 'f1', studentId: 's1', studentName: 'Arjun Sharma', month: '2025-03', amount: 1500, status: 'Paid', paidDate: '2025-03-05', receiptNo: 'RCP001' },
  { id: 'f2', studentId: 's2', studentName: 'Priya Patel', month: '2025-03', amount: 1200, status: 'Pending' },
  { id: 'f3', studentId: 's3', studentName: 'Rahul Mehta', month: '2025-03', amount: 2000, status: 'Paid', paidDate: '2025-03-02', receiptNo: 'RCP002' },
  { id: 'f4', studentId: 's4', studentName: 'Sneha Kumar', month: '2025-03', amount: 1200, status: 'Overdue' },
  { id: 'f5', studentId: 's5', studentName: 'Vikram Singh', month: '2025-03', amount: 3000, status: 'Paid', paidDate: '2025-03-01', receiptNo: 'RCP003' },
  { id: 'f6', studentId: 's6', studentName: 'Anita Reddy', month: '2025-03', amount: 1500, status: 'Paid', paidDate: '2025-03-08', receiptNo: 'RCP004' },
  { id: 'f7', studentId: 's7', studentName: 'Mohan Das', month: '2025-03', amount: 2000, status: 'Pending' },
  { id: 'f8', studentId: 's8', studentName: 'Kavitha Nair', month: '2025-03', amount: 1500, status: 'Paid', paidDate: '2025-03-10', receiptNo: 'RCP005' },
];

const INITIAL_BOOKINGS: CourtBooking[] = [
  { id: 'b1', courtNo: 1, date: today, timeSlot: '06:00 - 07:00', userName: 'Vikram Singh', userId: 's5', status: 'Booked', price: 200 },
  { id: 'b2', courtNo: 2, date: today, timeSlot: '07:00 - 08:00', userName: 'Arjun Sharma', userId: 's1', status: 'Pending', price: 200, transactionId: 'TXN12345' },
  { id: 'b3', courtNo: 1, date: today, timeSlot: '08:00 - 09:00', userName: 'Rahul Mehta', userId: 's3', status: 'Booked', price: 250 },
];

const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'Practice Schedule Change', message: 'Tomorrow\'s morning session will start at 6:30 AM instead of 6:00 AM due to court maintenance.', type: 'info', createdAt: today, read: false, targetRole: 'all' },
  { id: 'n2', title: 'Fee Reminder', message: 'Monthly fees for March are due. Please clear pending dues to avoid suspension.', type: 'warning', createdAt: today, read: false, targetRole: 'student' },
  { id: 'n3', title: 'Tournament Registration Open', message: 'District Badminton Championship registrations are now open! Register before March 30.', type: 'success', createdAt: today, read: false, targetRole: 'all' },
];

const INITIAL_TOURNAMENTS: Tournament[] = [
  { id: 't1', name: 'SmashPro Internal Championship 2025', date: '2025-04-15', venue: 'SmashPro Court', category: 'All Categories', status: 'Upcoming', participants: ['Arjun Sharma', 'Vikram Singh', 'Rahul Mehta', 'Anita Reddy'] },
  { id: 't2', name: 'District Junior Badminton 2025', date: '2025-03-20', venue: 'City Sports Complex', category: 'Under 18', status: 'Upcoming', participants: ['Priya Patel', 'Sneha Kumar', 'Kavitha Nair'] },
  { id: 't3', name: 'Academy Doubles Tournament', date: '2025-02-10', venue: 'SmashPro Court', category: 'Open Doubles', status: 'Completed', participants: ['Arjun Sharma', 'Mohan Das', 'Pooja Iyer', 'Anita Reddy'], results: [{ position: 1, name: 'Pooja & Anita', score: '21-18, 21-15' }, { position: 2, name: 'Arjun & Mohan', score: '18-21, 15-21' }] },
];

interface DataContextType {
  students: Student[];
  attendance: AttendanceRecord[];
  fees: FeeRecord[];
  bookings: CourtBooking[];
  notifications: Notification[];
  tournaments: Tournament[];
  addStudent: (s: Omit<Student, 'id'>) => void;
  updateStudent: (id: string, s: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  markAttendance: (studentId: string, date: string, status: AttendanceRecord['status']) => void;
  updateFeeStatus: (feeId: string, status: PaymentStatus, receiptNo?: string) => void;
  addFee: (fee: Omit<FeeRecord, 'id'>) => void;
  addBooking: (booking: Omit<CourtBooking, 'id'>) => void;
  updateBookingStatus: (id: string, status: CourtBooking['status']) => void;
  addNotification: (n: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  addTournament: (t: Omit<Tournament, 'id'>) => void;
  registerForTournament: (tournamentId: string, name: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [fees, setFees] = useState<FeeRecord[]>(INITIAL_FEES);
  const [bookings, setBookings] = useState<CourtBooking[]>(INITIAL_BOOKINGS);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [tournaments, setTournaments] = useState<Tournament[]>(INITIAL_TOURNAMENTS);

  const addStudent = (s: Omit<Student, 'id'>) =>
    setStudents(prev => [...prev, { ...s, id: `s${Date.now()}` }]);

  const updateStudent = (id: string, s: Partial<Student>) =>
    setStudents(prev => prev.map(st => st.id === id ? { ...st, ...s } : st));

  const deleteStudent = (id: string) =>
    setStudents(prev => prev.filter(st => st.id !== id));

  const markAttendance = (studentId: string, date: string, status: AttendanceRecord['status']) => {
    setAttendance(prev => {
      const existing = prev.findIndex(a => a.studentId === studentId && a.date === date);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = { ...updated[existing], status };
        return updated;
      }
      return [...prev, { id: `a${Date.now()}`, studentId, date, status }];
    });
  };

  const updateFeeStatus = (feeId: string, status: PaymentStatus, receiptNo?: string) =>
    setFees(prev => prev.map(f => f.id === feeId ? { ...f, status, paidDate: status === 'Paid' ? today : undefined, receiptNo } : f));

  const addFee = (fee: Omit<FeeRecord, 'id'>) =>
    setFees(prev => [...prev, { ...fee, id: `f${Date.now()}` }]);

  const addBooking = (booking: Omit<CourtBooking, 'id'>) =>
    setBookings(prev => [...prev, { ...booking, id: `b${Date.now()}` }]);

  const updateBookingStatus = (id: string, status: CourtBooking['status']) =>
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));

  const addNotification = (n: Omit<Notification, 'id' | 'createdAt' | 'read'>) =>
    setNotifications(prev => [{ ...n, id: `n${Date.now()}`, createdAt: today, read: false }, ...prev]);

  const markNotificationRead = (id: string) =>
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  const addTournament = (t: Omit<Tournament, 'id'>) =>
    setTournaments(prev => [...prev, { ...t, id: `t${Date.now()}` }]);

  const registerForTournament = (tournamentId: string, name: string) =>
    setTournaments(prev => prev.map(t => t.id === tournamentId ? { ...t, participants: [...t.participants, name] } : t));

  return (
    <DataContext.Provider value={{ students, attendance, fees, bookings, notifications, tournaments, addStudent, updateStudent, deleteStudent, markAttendance, updateFeeStatus, addFee, addBooking, updateBookingStatus, addNotification, markNotificationRead, addTournament, registerForTournament }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
