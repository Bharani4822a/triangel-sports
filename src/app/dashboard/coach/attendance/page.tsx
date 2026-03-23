'use client';
import { useState } from 'react';
import { useData } from '@/context/DataContext';
import { CalendarCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CoachAttendancePage() {
  const { students, attendance, markAttendance } = useData();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterBatch, setFilterBatch] = useState('');

  const todayRecords = attendance.filter(a => a.date === selectedDate);
  const getStatus = (studentId: string) => todayRecords.find(a => a.studentId === studentId)?.status || 'Absent';

  const handleMark = (studentId: string, status: 'Present' | 'Absent' | 'Late') => {
    markAttendance(studentId, selectedDate, status);
    toast.success(`Marked ${status}`);
  };

  const filtered = students.filter(s => !filterBatch || s.batch === filterBatch);

  const present = todayRecords.filter(a => filtered.some(s => s.id === a.studentId && a.status === 'Present')).length;
  const percentage = filtered.length > 0 ? Math.round((present / filtered.length) * 100) : 0;

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
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: '#f9fafb' }}>Mark Attendance</h1>
        <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '0.25rem' }}>Track attendance for your students</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#111827', border: '1px solid #1f2937', borderRadius: '1rem', padding: '0.5rem 1rem' }}>
          <button onClick={() => changeDate(-1)} style={{ background: '#1f2937', border: '1px solid #374151', borderRadius: '0.5rem', padding: '0.5rem', cursor: 'pointer', color: '#9ca3af', display: 'flex', alignItems: 'center' }}><ChevronLeft size={18} /></button>
          <input type="date" className="input-field" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} style={{ width: 'auto', border: 'none', background: 'transparent' }} />
          <button onClick={() => changeDate(1)} style={{ background: '#1f2937', border: '1px solid #374151', borderRadius: '0.5rem', padding: '0.5rem', cursor: 'pointer', color: '#9ca3af', display: 'flex', alignItems: 'center' }}><ChevronRight size={18} /></button>
        </div>

        <select className="input-field" value={filterBatch} onChange={e => setFilterBatch(e.target.value)} style={{ width: 'auto', minWidth: '180px' }}>
          <option value="">All Batches</option>
          <option value="Morning 6-8 AM">Morning 6-8 AM</option>
          <option value="Morning 8-10 AM">Morning 8-10 AM</option>
          <option value="Evening 4-6 PM">Evening 4-6 PM</option>
          <option value="Evening 6-8 PM">Evening 6-8 PM</option>
        </select>
        
        <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '1rem', padding: '0.5rem 1rem', display: 'flex', gap: '1rem' }}>
            <div style={{color: '#9ca3af', fontSize: '0.85rem'}}>Attendance: <span style={{fontWeight: 700, color: '#f9fafb'}}>{percentage}%</span></div>
            <div style={{color: '#9ca3af', fontSize: '0.85rem'}}>Present: <span style={{fontWeight: 700, color: '#10b981'}}>{present}</span></div>
            <div style={{color: '#9ca3af', fontSize: '0.85rem'}}>Absent: <span style={{fontWeight: 700, color: '#ef4444'}}>{filtered.length - present}</span></div>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '0.75rem' }}>
        {filtered.map(s => {
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
