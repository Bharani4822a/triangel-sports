'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  LayoutDashboard, Users, CalendarCheck, Trophy, 
  Bell, Settings, LogOut, ChevronLeft, CreditCard,
  Target
} from 'lucide-react';
import { useState } from 'react';

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  if (!user) return null;

  const role = user.role;
  
  const menuItems = {
    admin: [
      { label: 'Overview', href: '/dashboard/admin', icon: LayoutDashboard },
      { label: 'Students', href: '/dashboard/admin/students', icon: Users },
      { label: 'Attendance', href: '/dashboard/admin/attendance', icon: CalendarCheck },
      { label: 'Fees & Payments', href: '/dashboard/admin/fees', icon: CreditCard },
      { label: 'Tournaments', href: '/dashboard/admin/tournaments', icon: Trophy },
      { label: 'Notifications', href: '/dashboard/admin/notifications', icon: Bell },
    ],
    coach: [
      { label: 'Overview', href: '/dashboard/coach', icon: LayoutDashboard },
      { label: 'My Students', href: '/dashboard/coach/students', icon: Users },
      { label: 'Mark Attendance', href: '/dashboard/coach/attendance', icon: CalendarCheck },
      { label: 'Tournaments', href: '/dashboard/coach/tournaments', icon: Trophy },
      { label: 'Announcements', href: '/dashboard/coach/notifications', icon: Bell },
    ],
    student: [
      { label: 'My Dashboard', href: '/dashboard/student', icon: LayoutDashboard },
      { label: 'My Attendance', href: '/dashboard/student/attendance', icon: CalendarCheck },
      { label: 'Fees & Dues', href: '/dashboard/student/fees', icon: CreditCard },
      { label: 'Events', href: '/dashboard/student/tournaments', icon: Trophy },
      { label: 'Notifications', href: '/dashboard/student/notifications', icon: Bell },
    ]
  }[role];

  return (
    <aside style={{ 
      width: collapsed ? '80px' : '280px', 
      background: '#111827', 
      borderRight: '1px solid #1f2937', 
      height: '100vh', 
      position: 'sticky', 
      top: 0, 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: 50,
      overflowX: collapsed ? 'visible' : 'hidden'
    }} className="dashboard-sidebar">
      
      {/* Sidebar Header */}
      <div style={{ padding: '2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid #1f2937', minHeight: '100px' }}>
        <img src="/logo.png" alt="TSA" style={{ width: '40px', height: '40px', objectFit: 'contain', flexShrink: 0 }} />
        {!collapsed && (
          <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#f9fafb', fontSize: '1.1rem' }}>Triangle</div>
            <div style={{ fontSize: '0.6rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sports Academy</div>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav style={{ flex: 1, padding: '1.5rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {menuItems?.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`sidebar-link ${isActive ? 'active' : ''}`}
              title={collapsed ? item.label : ''}
              style={{ justifyContent: collapsed ? 'center' : 'flex-start', padding: collapsed ? '0.75rem' : '0.75rem 1rem' }}
            >
              <item.icon size={20} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Info & Actions */}
      <div style={{ padding: '1.5rem 1rem', borderTop: '1px solid #1f2937' }}>
        {!collapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', padding: '0 0.5rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #f59e0b)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.8rem' }}>
              {user.name.charAt(0)}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ color: '#f9fafb', fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{user.name}</div>
              <div style={{ color: '#6b7280', fontSize: '0.7rem', textTransform: 'capitalize' }}>{user.role}</div>
            </div>
          </div>
        )}
        
        <button 
          onClick={() => setCollapsed(!collapsed)}
          style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid #1f2937', color: '#9ca3af', padding: '0.6rem', borderRadius: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}
        >
          <ChevronLeft size={18} style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
          {!collapsed && <span style={{ fontSize: '0.85rem' }}>Collapse</span>}
        </button>

        <button 
          onClick={logout}
          style={{ width: '100%', background: 'rgba(239,68,68,0.1)', border: 'none', color: '#ef4444', padding: '0.6rem', borderRadius: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 600 }}
        >
          <LogOut size={18} />
          {!collapsed && <span style={{ fontSize: '0.85rem' }}>Logout</span>}
        </button>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .dashboard-sidebar {
            display: none !important;
          }
        }
      `}</style>
    </aside>
  );
}
