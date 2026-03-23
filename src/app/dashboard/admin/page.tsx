'use client';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Users, CreditCard, CalendarCheck, BookOpen, TrendingUp, Bell, Trophy, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const attendanceData = [
  { day: 'Mon', present: 42, absent: 8 },
  { day: 'Tue', present: 45, absent: 5 },
  { day: 'Wed', present: 38, absent: 12 },
  { day: 'Thu', present: 47, absent: 3 },
  { day: 'Fri', present: 44, absent: 6 },
  { day: 'Sat', present: 40, absent: 10 },
];

const feeData = [
  { name: 'Paid', value: 65, color: '#10b981' },
  { name: 'Pending', value: 25, color: '#f59e0b' },
  { name: 'Overdue', value: 10, color: '#ef4444' },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const { students, fees, bookings, notifications, attendance } = useData();

  const totalFeeCollected = fees.filter(f => f.status === 'Paid').reduce((s, f) => s + f.amount, 0);
  const totalFeePending = fees.filter(f => f.status !== 'Paid').reduce((s, f) => s + f.amount, 0);
  const todayBookings = bookings.filter(b => b.date === new Date().toISOString().split('T')[0]);
  const todayAttendance = attendance.filter(a => a.date === new Date().toISOString().split('T')[0]);
  const unread = notifications.filter(n => !n.read).length;

  const stats = [
    { label: 'Total Students', value: students.length, icon: Users, color: '#6366f1', bg: 'rgba(99,102,241,0.1)', change: '+3 this month' },
    { label: 'Fees Collected', value: `₹${totalFeeCollected.toLocaleString()}`, icon: CreditCard, color: '#10b981', bg: 'rgba(16,185,129,0.1)', change: 'This month' },
    { label: 'Fee Pending', value: `₹${totalFeePending.toLocaleString()}`, icon: AlertCircle, color: '#ef4444', bg: 'rgba(239,68,68,0.1)', change: `${fees.filter(f => f.status !== 'Paid').length} students` },
    { label: "Today's Attendance", value: `${todayAttendance.filter(a => a.status === 'Present').length}/${students.length}`, icon: CalendarCheck, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', change: `${Math.round((todayAttendance.filter(a => a.status === 'Present').length / students.length) * 100)}% present` },
    { label: 'Court Bookings', value: todayBookings.length, icon: BookOpen, color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', change: `${todayBookings.filter(b => b.status === 'Pending').length} pending approval` },
    { label: 'Notifications', value: unread, icon: Bell, color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', change: 'Unread alerts' },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <div>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: '#f9fafb' }}>
              Admin Dashboard
            </h1>
            <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Welcome back, <span style={{ color: '#818cf8', fontWeight: 600 }}>{user?.name}</span>! Here&apos;s your academy overview.
            </p>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '2rem' }} className="admin-stats-grid">
        {stats.map((stat, i) => (
          <div key={stat.label} className="stat-card animate-fade-in" style={{ animationDelay: `${i * 0.08}s` }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div>
                <div style={{ color: '#9ca3af', fontSize: '0.8rem', fontWeight: 500, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f9fafb', fontFamily: 'Outfit, sans-serif' }}>{stat.value}</div>
              </div>
              <div style={{ width: '48px', height: '48px', background: stat.bg, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <stat.icon size={22} color={stat.color} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <TrendingUp size={13} color={stat.color} />
              <span style={{ color: stat.color, fontSize: '0.78rem', fontWeight: 500 }}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '2rem' }} className="charts-grid">
        {/* Attendance bar chart */}
        <div className="card">
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#f9fafb', marginBottom: '1.5rem', fontSize: '1.05rem' }}>Weekly Attendance Overview</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={attendanceData} barGap={4}>
              <XAxis dataKey="day" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#1f2937', border: '1px solid #374151', borderRadius: '0.75rem', color: '#f9fafb', fontSize: '0.85rem' }} />
              <Bar dataKey="present" name="Present" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="absent" name="Absent" fill="#ef444444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Fee distribution pie */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#f9fafb', marginBottom: '1.5rem', fontSize: '1.05rem' }}>Fee Status</h3>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={feeData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                  {feeData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#1f2937', border: '1px solid #374151', borderRadius: '0.75rem', color: '#f9fafb', fontSize: '0.85rem' }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', marginTop: '0.5rem' }}>
              {feeData.map(d => (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.83rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: d.color }} />
                    <span style={{ color: '#9ca3af' }}>{d.name}</span>
                  </div>
                  <span style={{ color: '#f9fafb', fontWeight: 600 }}>{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent activities */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="activities-grid">
        {/* Pending bookings */}
        <div className="card">
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#f9fafb', marginBottom: '1.25rem', fontSize: '1.05rem' }}>Pending Court Bookings</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {bookings.filter(b => b.status === 'Pending').slice(0, 4).map(b => (
              <div key={b.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', background: '#1f2937', borderRadius: '0.75rem' }}>
                <div>
                  <div style={{ color: '#f9fafb', fontWeight: 600, fontSize: '0.9rem' }}>{b.userName}</div>
                  <div style={{ color: '#9ca3af', fontSize: '0.8rem' }}>Court {b.courtNo} • {b.timeSlot}</div>
                </div>
                <span className="badge badge-yellow">Pending</span>
              </div>
            ))}
            {bookings.filter(b => b.status === 'Pending').length === 0 && (
              <div style={{ color: '#6b7280', textAlign: 'center', padding: '1rem', fontSize: '0.9rem' }}>No pending bookings</div>
            )}
          </div>
        </div>

        {/* Fee overdue */}
        <div className="card">
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#f9fafb', marginBottom: '1.25rem', fontSize: '1.05rem' }}>Fee Alerts</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {fees.filter(f => f.status !== 'Paid').slice(0, 4).map(f => (
              <div key={f.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', background: '#1f2937', borderRadius: '0.75rem' }}>
                <div>
                  <div style={{ color: '#f9fafb', fontWeight: 600, fontSize: '0.9rem' }}>{f.studentName}</div>
                  <div style={{ color: '#9ca3af', fontSize: '0.8rem' }}>₹{f.amount} • {f.month}</div>
                </div>
                <span className={`badge ${f.status === 'Overdue' ? 'badge-red' : 'badge-yellow'}`}>{f.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .admin-stats-grid { grid-template-columns: 1fr 1fr !important; }
          .charts-grid { grid-template-columns: 1fr !important; }
          .activities-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .admin-stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
