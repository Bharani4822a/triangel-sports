'use client';
import { useData } from '@/context/DataContext';

export default function StudentAttendancePage() {
  const { attendance } = useData();
  const studentId = 's1'; // Demo student ID
  
  const myAttendance = attendance.filter(a => a.studentId === studentId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const presentDays = myAttendance.filter(a => a.status === 'Present').length;
  const attendancePct = myAttendance.length > 0 ? Math.round((presentDays / myAttendance.length) * 100) : 100;

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: '#f9fafb' }}>My Attendance</h1>
        <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '0.25rem' }}>View your monthly attendance record</p>
      </div>

      <div className="card" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ textAlign: 'center', flexShrink: 0 }}>
          <div style={{ fontSize: '3.5rem', fontWeight: 900, color: attendancePct >= 75 ? '#10b981' : '#ef4444', fontFamily: 'Outfit, sans-serif' }}>{attendancePct}%</div>
          <div style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Attendance Rate</div>
        </div>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#f9fafb', fontWeight: 600 }}>
            <span>{presentDays} Days Present</span>
            <span>{myAttendance.length - presentDays} Days Absent</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${attendancePct}%`, background: attendancePct >= 75 ? 'linear-gradient(90deg,#10b981,#34d399)' : 'linear-gradient(90deg,#ef4444,#f87171)' }} />
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
        {myAttendance.map(a => (
          <div key={a.id} className="card" style={{ textAlign: 'center', padding: '1.5rem', borderTop: `3px solid ${a.status === 'Present' ? '#10b981' : a.status === 'Absent' ? '#ef4444' : '#f59e0b'}` }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
              {a.status === 'Present' ? '✅' : a.status === 'Absent' ? '❌' : '⏳'}
            </div>
            <div style={{ fontWeight: 600, color: '#f9fafb', marginBottom: '0.25rem' }}>{a.date}</div>
            <span className={`badge ${a.status === 'Present' ? 'badge-green' : a.status === 'Absent' ? 'badge-red' : 'badge-yellow'}`}>{a.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
