'use client';
import { useData } from '@/context/DataContext';
import { Check, X } from 'lucide-react';
import toast from 'react-hot-toast';

const COURTS = [1, 2, 3, 4];
const TIME_SLOTS = ['06:00 - 07:00', '07:00 - 08:00', '08:00 - 09:00', '09:00 - 10:00', '16:00 - 17:00', '17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00'];

export default function AdminBookingsPage() {
  const { bookings, updateBookingStatus } = useData();
  const today = new Date().toISOString().split('T')[0];

  const handleApprove = (id: string) => { updateBookingStatus(id, 'Booked'); toast.success('Booking approved!'); };
  const handleReject = (id: string) => { updateBookingStatus(id, 'Rejected'); toast.error('Booking rejected'); };

  const getSlotBooking = (court: number, slot: string) =>
    bookings.find(b => b.courtNo === court && b.timeSlot === slot && b.date === today);

  const statusColor = { Booked: '#10b981', Pending: '#f59e0b', Available: '#374151', Rejected: '#ef4444' };
  const statusText = { Booked: 'badge-green', Pending: 'badge-yellow', Available: 'badge-gray', Rejected: 'badge-red' };

  const pendingBookings = bookings.filter(b => b.status === 'Pending');
  const allBookings = bookings.sort((a, b) => b.id.localeCompare(a.id));

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: '#f9fafb' }}>Court Booking Management</h1>
        <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '0.25rem' }}>Review and approve court bookings</p>
      </div>

      {/* Court grid */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#f9fafb', marginBottom: '1rem', fontSize: '1.1rem' }}>Today&apos;s Court Status</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ minWidth: '700px' }}>
            <thead>
              <tr style={{ background: '#1f2937' }}>
                <th style={{ padding: '0.75rem 1rem', color: '#9ca3af', fontWeight: 600, fontSize: '0.8rem', textAlign: 'left' }}>Time Slot</th>
                {COURTS.map(c => <th key={c} style={{ padding: '0.75rem 1rem', color: '#9ca3af', fontWeight: 600, fontSize: '0.8rem', textAlign: 'center' }}>Court {c}</th>)}
              </tr>
            </thead>
            <tbody>
              {TIME_SLOTS.map(slot => (
                <tr key={slot} style={{ borderBottom: '1px solid #1f2937' }}>
                  <td style={{ padding: '0.75rem 1rem', color: '#9ca3af', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>{slot}</td>
                  {COURTS.map(court => {
                    const booking = getSlotBooking(court, slot);
                    const status = booking ? booking.status as string : 'Available';
                    return (
                      <td key={court} style={{ padding: '0.5rem', textAlign: 'center' }}>
                        <div style={{ padding: '0.5rem', borderRadius: '0.5rem', background: booking ? `${statusColor[status as keyof typeof statusColor]}15` : '#1f2937', border: `1px solid ${statusColor[status as keyof typeof statusColor]}`, fontSize: '0.75rem' }}>
                          {booking ? (
                            <>
                              <div style={{ color: '#f9fafb', fontWeight: 600, fontSize: '0.72rem', marginBottom: '0.2rem' }}>{booking.userName.split(' ')[0]}</div>
                              <span className={`badge ${statusText[status as keyof typeof statusText]}`} style={{ fontSize: '0.65rem', padding: '0.15rem 0.4rem' }}>{status}</span>
                            </>
                          ) : <span style={{ color: '#4b5563' }}>Free</span>}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pending approvals */}
      {pendingBookings.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#f59e0b', marginBottom: '1rem', fontSize: '1.1rem' }}>
            ⏳ Pending Approval ({pendingBookings.length})
          </h2>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {pendingBookings.map(b => (
              <div key={b.id} className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderColor: 'rgba(245,158,11,0.3)' }}>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <div><div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>Student</div><div style={{ color: '#f9fafb', fontWeight: 600 }}>{b.userName}</div></div>
                  <div><div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>Court</div><div style={{ color: '#f9fafb', fontWeight: 600 }}>Court {b.courtNo}</div></div>
                  <div><div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>Time</div><div style={{ color: '#f9fafb', fontWeight: 600 }}>{b.timeSlot}</div></div>
                  <div><div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>Amount</div><div style={{ color: '#f9fafb', fontWeight: 600 }}>₹{b.price}</div></div>
                  {b.transactionId && <div><div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>Transaction ID</div><div style={{ color: '#818cf8', fontWeight: 600 }}>{b.transactionId}</div></div>}
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button onClick={() => handleReject(b.id)} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '0.6rem', padding: '0.5rem 1rem', cursor: 'pointer', color: '#ef4444', fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <X size={15} /> Reject
                  </button>
                  <button onClick={() => handleApprove(b.id)} style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '0.6rem', padding: '0.5rem 1rem', cursor: 'pointer', color: '#10b981', fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Check size={15} /> Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All bookings */}
      <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#f9fafb', marginBottom: '1rem', fontSize: '1.1rem' }}>All Bookings</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr><th>User</th><th>Court</th><th>Date</th><th>Time</th><th>Amount</th><th>Status</th></tr>
          </thead>
          <tbody>
            {allBookings.map(b => (
              <tr key={b.id}>
                <td style={{ fontWeight: 600, color: '#f9fafb' }}>{b.userName}</td>
                <td style={{ color: '#9ca3af' }}>Court {b.courtNo}</td>
                <td style={{ color: '#9ca3af' }}>{b.date}</td>
                <td style={{ color: '#9ca3af' }}>{b.timeSlot}</td>
                <td style={{ color: '#f9fafb', fontWeight: 600 }}>₹{b.price}</td>
                <td><span className={`badge ${b.status === 'Booked' ? 'badge-green' : b.status === 'Pending' ? 'badge-yellow' : b.status === 'Rejected' ? 'badge-red' : 'badge-gray'}`}>{b.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
