'use client';
import { useState } from 'react';
import { useData } from '@/context/DataContext';
import { CalendarCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

const formatDate = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

export default function AdminAttendancePage() {
  const { students, attendance, markAttendance } = useData();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const todayRecords = attendance.filter(a => a.date === selectedDate);
  const getStatus = (studentId: string) => todayRecords.find(a => a.studentId === studentId)?.status || 'Absent';

  const handleMark = (studentId: string, status: 'Present' | 'Absent' | 'Late') => {
    markAttendance(studentId, selectedDate, status);
    toast.success(`Marked ${status}`);
  };

  const present = todayRecords.filter(a => a.status === 'Present').length;
  const absent = students.length - present;
  const percentage = students.length > 0 ? Math.round((present / students.length) * 100) : 0;

  const changeDate = (days: number) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + days);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const statusColors = { Present: '#10b981', Absent: '#ef4444', Late: '#f59e0b' };
  const statusBg = { Present: 'rgba(16,185,129,0.1)', Absent: 'rgba(239,68,68,0.1)', Late: 'rgba(245,158,11,0.1)' };

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: '#f9fafb' }}>Attendance Management</h1>
        <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '0.25rem' }}>Track daily attendance for all students</p>
      </div>

      {/* Date navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', background: '#111827', border: '1px solid #1f2937', borderRadius: '1rem', padding: '1rem 1.5rem', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button onClick={() => changeDate(-1)} style={{ background: '#1f2937', border: '1px solid #374151', borderRadius: '0.5rem', padding: '0.5rem', cursor: 'pointer', color: '#9ca3af', display: 'flex', alignItems: 'center' }}>
            <ChevronLeft size={18} />
          </button>
          <input type="date" className="input-field" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} style={{ width: 'auto' }} />
          <button onClick={() => changeDate(1)} style={{ background: '#1f2937', border: '1px solid #374151', borderRadius: '0.5rem', padding: '0.5rem', cursor: 'pointer', color: '#9ca3af', display: 'flex', alignItems: 'center' }}>
            <ChevronRight size={18} />
          </button>
          <span style={{ color: '#9ca3af', fontSize: '0.9rem' }}>{formatDate(selectedDate)}</span>
        </div>
        {/* Summary stats */}
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Present', value: present, color: '#10b981' },
            { label: 'Absent', value: absent, color: '#ef4444' },
            { label: 'Attendance %', value: `${percentage}%`, color: '#6366f1' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: s.color, fontFamily: 'Outfit, sans-serif' }}>{s.value}</div>
              <div style={{ color: '#6b7280', fontSize: '0.75rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${percentage}%` }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.4rem' }}>
          <span style={{ color: '#6b7280', fontSize: '0.78rem' }}>0%</span>
          <span style={{ color: '#818cf8', fontSize: '0.78rem', fontWeight: 600 }}>{percentage}% attendance today</span>
          <span style={{ color: '#6b7280', fontSize: '0.78rem' }}>100%</span>
        </div>
      </div>

      {/* Student list */}
      <div style={{ display: 'grid', gap: '0.75rem' }}>
        {students.map(s => {
          const status = getStatus(s.id);
          return (
            <div key={s.id} style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '0.75rem', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #818cf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0 }}>
                {s.name.charAt(0)}
              </div>
              <div style={{ flex: 1, minWidth: '150px' }}>
                <div style={{ fontWeight: 600, color: '#f9fafb' }}>{s.name}</div>
                <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>{s.batch} • {s.group}</div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {(['Present', 'Late', 'Absent'] as const).map(st => (
                  <button key={st} onClick={() => handleMark(s.id, st)} style={{ padding: '0.4rem 1rem', borderRadius: '0.6rem', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', border: status === st ? `2px solid ${statusColors[st]}` : '1px solid #374151', background: status === st ? statusBg[st] : 'transparent', color: status === st ? statusColors[st] : '#6b7280', transition: 'all 0.2s' }}>
                    {st}
                  </button>
                ))}
              </div>
              <span className={`badge ${status === 'Present' ? 'badge-green' : status === 'Late' ? 'badge-yellow' : 'badge-red'}`} style={{ minWidth: '70px', textAlign: 'center' }}>{status}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
