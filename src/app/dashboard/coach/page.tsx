'use client';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Users, CalendarCheck, Bell, Trophy, TrendingUp } from 'lucide-react';

export default function CoachDashboard() {
  const { user } = useAuth();
  const { students, attendance, notifications, tournaments } = useData();
  const today = new Date().toISOString().split('T')[0];

  const todayAttendance = attendance.filter(a => a.date === today);
  const present = todayAttendance.filter(a => a.status === 'Present').length;
  const unread = notifications.filter(n => !n.read).length;
  const upcomingTournaments = tournaments.filter(t => t.status === 'Upcoming').length;

  const stats = [
    { label: 'Total Students', value: students.length, icon: Users, color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
    { label: "Today's Present", value: `${present}/${students.length}`, icon: CalendarCheck, color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
    { label: 'Unread Alerts', value: unread, icon: Bell, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
    { label: 'Upcoming Events', value: upcomingTournaments, icon: Trophy, color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
  ];

  const absentees = students.filter(s => {
    const record = todayAttendance.find(a => a.studentId === s.id);
    return !record || record.status === 'Absent';
  });

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: '#f9fafb' }}>Coach Dashboard</h1>
        <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '0.25rem' }}>Welcome, <span style={{ color: '#f59e0b', fontWeight: 600 }}>{user?.name}</span>! Here&apos;s your daily overview.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '2rem' }} className="coach-stats-grid">
        {stats.map((s, i) => (
          <div key={s.label} className="stat-card animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <div style={{ color: '#6b7280', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>{s.label}</div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f9fafb', fontFamily: 'Outfit, sans-serif' }}>{s.value}</div>
              </div>
              <div style={{ width: '44px', height: '44px', background: s.bg, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <s.icon size={20} color={s.color} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <TrendingUp size={12} color={s.color} />
              <span style={{ color: s.color, fontSize: '0.75rem' }}>Today</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="coach-panels-grid">
        {/* Today's absentees */}
        <div className="card">
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#f9fafb', marginBottom: '1.25rem', fontSize: '1.05rem' }}>
            Today&apos;s Absentees <span style={{ color: '#ef4444', fontSize: '0.85rem' }}>({absentees.length})</span>
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {absentees.slice(0, 6).map(s => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem', background: '#1f2937', borderRadius: '0.6rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(239,68,68,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0 }}>
                  {s.name.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#f9fafb', fontWeight: 600, fontSize: '0.88rem' }}>{s.name}</div>
                  <div style={{ color: '#6b7280', fontSize: '0.75rem' }}>{s.batch}</div>
                </div>
                <span className="badge badge-red" style={{ fontSize: '0.7rem' }}>Absent</span>
              </div>
            ))}
            {absentees.length === 0 && <div style={{ color: '#10b981', textAlign: 'center', padding: '1rem', fontSize: '0.9rem' }}>🎉 Full attendance today!</div>}
          </div>
        </div>

        {/* Student skill distribution */}
        <div className="card">
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#f9fafb', marginBottom: '1.25rem', fontSize: '1.05rem' }}>Student Groups</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {['Group A', 'Group B', 'Group C'].map(group => {
              const count = students.filter(s => s.group === group).length;
              const pct = students.length ? Math.round((count / students.length) * 100) : 0;
              return (
                <div key={group}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span style={{ color: '#9ca3af', fontSize: '0.85rem' }}>{group}</span>
                    <span style={{ color: '#f9fafb', fontWeight: 600, fontSize: '0.85rem' }}>{count} students</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: '1.5rem', borderTop: '1px solid #1f2937', paddingTop: '1.25rem' }}>
            <h4 style={{ color: '#9ca3af', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.75rem' }}>By Skill Level</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {[
                { level: 'Beginner', color: '#10b981' }, { level: 'Intermediate', color: '#f59e0b' },
                { level: 'Advanced', color: '#6366f1' }, { level: 'Professional', color: '#ef4444' },
              ].map(({ level, color }) => (
                <div key={level} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#1f2937', padding: '0.4rem 0.75rem', borderRadius: '0.5rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />
                  <span style={{ color: '#9ca3af', fontSize: '0.8rem' }}>{level}</span>
                  <span style={{ color: '#f9fafb', fontWeight: 700, fontSize: '0.8rem' }}>{students.filter(s => s.skillLevel === level).length}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .coach-stats-grid { grid-template-columns: 1fr 1fr !important; } .coach-panels-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 640px) { .coach-stats-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
