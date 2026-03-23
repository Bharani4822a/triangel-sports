'use client';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { LayoutDashboard, CreditCard, CalendarCheck, BookOpen, Bell, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function StudentDashboard() {
  const { user } = useAuth();
  const { students, attendance, fees, notifications, tournaments } = useData();
  const today = new Date().toISOString().split('T')[0];

  // For demo, map student user to 's1'
  const studentId = 's1';
  const student = students.find(s => s.id === studentId);
  const myAttendance = attendance.filter(a => a.studentId === studentId);
  const myFee = fees.find(f => f.studentId === studentId && f.month === '2025-03');
  const unread = notifications.filter(n => !n.read).length;
  const upcomingTournaments = tournaments.filter(t => t.status === 'Upcoming').length;
  const presentDays = myAttendance.filter(a => a.status === 'Present').length;
  const attendancePct = myAttendance.length > 0 ? Math.round((presentDays / myAttendance.length) * 100) : 100;

  const cards = [
    { label: 'Attendance', value: `${attendancePct}%`, sub: `${presentDays} days present`, color: '#10b981', icon: CalendarCheck, href: '/dashboard/student/attendance' },
    { label: 'Fee Status', value: myFee?.status || 'No record', sub: myFee ? `₹${myFee.amount} • ${myFee.month}` : '', color: myFee?.status === 'Paid' ? '#10b981' : '#ef4444', icon: CreditCard, href: '/dashboard/student/fees' },
    { label: 'Notifications', value: unread, sub: 'Unread messages', color: '#f59e0b', icon: Bell, href: '/dashboard/student/notifications' },
    { label: 'Tournaments', value: upcomingTournaments, sub: 'Upcoming events', color: '#8b5cf6', icon: Trophy, href: '/dashboard/student/tournaments' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        {/* Profile banner */}
        <div className="card" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(245,158,11,0.1))', borderColor: 'rgba(99,102,241,0.3)', display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #818cf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', flexShrink: 0 }}>
            🎯
          </div>
          <div>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.6rem', fontWeight: 800, color: '#f9fafb', marginBottom: '0.25rem' }}>Welcome, {student?.name || user?.name}! 👋</h1>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span className="badge badge-blue">{student?.batch}</span>
              <span className="badge badge-gray">{student?.skillLevel}</span>
              <span className="badge badge-gray">{student?.group}</span>
            </div>
          </div>
        </div>

        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem', fontWeight: 700, color: '#f9fafb', marginBottom: '1rem' }}>Your Overview</h2>
      </div>

      {/* Quick stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '2rem' }} className="student-stats-grid">
        {cards.map((c, i) => (
          <Link key={c.label} href={c.href} style={{ textDecoration: 'none' }}>
            <div className="stat-card animate-fade-in" style={{ animationDelay: `${i * 0.1}s`, cursor: 'pointer', height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <div style={{ color: '#6b7280', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>{c.label}</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: c.color, fontFamily: 'Outfit, sans-serif' }}>{c.value}</div>
                </div>
                <div style={{ width: '44px', height: '44px', background: `${c.color}18`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <c.icon size={20} color={c.color} />
                </div>
              </div>
              <div style={{ color: '#6b7280', fontSize: '0.78rem' }}>{c.sub}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Attendance progress */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="student-panels">
        <div className="card">
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#f9fafb', marginBottom: '1rem', fontSize: '1.05rem' }}>My Attendance</h3>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <div style={{ fontSize: '3.5rem', fontWeight: 900, color: attendancePct >= 75 ? '#10b981' : '#ef4444', fontFamily: 'Outfit, sans-serif' }}>{attendancePct}%</div>
            <div style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Monthly attendance rate</div>
          </div>
          <div className="progress-bar" style={{ marginBottom: '0.5rem' }}>
            <div className="progress-fill" style={{ width: `${attendancePct}%`, background: attendancePct >= 75 ? 'linear-gradient(90deg,#10b981,#34d399)' : 'linear-gradient(90deg,#ef4444,#f87171)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#6b7280' }}>
            <span>75% required</span>
            <span style={{ color: attendancePct >= 75 ? '#10b981' : '#ef4444', fontWeight: 600 }}>{attendancePct >= 75 ? '✓ Good standing' : '⚠ Below requirement'}</span>
          </div>
        </div>

        {/* Notifications */}
        <div className="card">
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#f9fafb', marginBottom: '1rem', fontSize: '1.05rem' }}>Recent Notifications</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {notifications.slice(0, 4).map(n => {
              const typeColor = { info: '#3b82f6', warning: '#f59e0b', success: '#10b981', danger: '#ef4444' };
              const typeIcon = { info: 'ℹ️', warning: '⚠️', success: '✅', danger: '🚨' };
              return (
                <div key={n.id} style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', background: '#1f2937', borderRadius: '0.6rem', borderLeft: `3px solid ${typeColor[n.type]}`, opacity: n.read ? 0.6 : 1 }}>
                  <span style={{ fontSize: '1rem' }}>{typeIcon[n.type]}</span>
                  <div>
                    <div style={{ color: '#f9fafb', fontWeight: 600, fontSize: '0.85rem' }}>{n.title}</div>
                    <div style={{ color: '#6b7280', fontSize: '0.75rem', marginTop: '0.15rem' }}>{n.message.substring(0, 60)}...</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .student-stats-grid { grid-template-columns: 1fr 1fr !important; } .student-panels { grid-template-columns: 1fr !important; } }
        @media (max-width: 640px) { .student-stats-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
