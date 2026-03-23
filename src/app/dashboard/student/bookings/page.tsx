'use client';
import { useState } from 'react';
import { useData } from '@/context/DataContext';
import { Calendar, Clock, CreditCard, AlertCircle, Check, MapPin, X } from 'lucide-react';
import toast from 'react-hot-toast';

const COURTS = [1, 2, 3, 4];
const TIME_SLOTS = ['06:00 - 07:00', '07:00 - 08:00', '08:00 - 09:00', '09:00 - 10:00', '16:00 - 17:00', '17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00'];
const PRICE_PER_HOUR = 200;

export default function StudentBookingsPage() {
  const { bookings, addBooking } = useData();
  const studentName = 'Arjun Sharma'; // Demo data
  const studentId = 's1';

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedCourt, setSelectedCourt] = useState<number | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [txnId, setTxnId] = useState('');

  const getSlotStatus = (court: number, slot: string) => {
    const b = bookings.find(b => b.courtNo === court && b.timeSlot === slot && b.date === date);
    return b ? b.status : 'Available';
  };

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourt || !selectedSlot) return;
    
    addBooking({
      courtNo: selectedCourt,
      date,
      timeSlot: selectedSlot,
      userName: studentName,
      userId: studentId,
      status: 'Pending',
      price: PRICE_PER_HOUR,
      transactionId: txnId || undefined
    });
    
    toast.success('Booking requested! Awaiting admin approval.');
    setShowPayment(false);
    setSelectedSlot(null);
    setSelectedCourt(null);
    setTxnId('');
  };

  const myBookings = bookings.filter(b => b.userId === studentId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: '#f9fafb' }}>Court Booking</h1>
        <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '0.25rem' }}>Book a court for extra practice sessions</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '7fr 3fr', gap: '1.5rem' }} className="booking-grid">
        {/* Booking Selection */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem', fontWeight: 700, color: '#f9fafb' }}>Select Slot</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={18} color="#9ca3af" />
              <input type="date" className="input-field" value={date} onChange={e => { setDate(e.target.value); setSelectedSlot(null); setSelectedCourt(null); }} min={new Date().toISOString().split('T')[0]} style={{ width: 'auto', padding: '0.5rem' }} />
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ minWidth: '600px', marginBottom: '1rem' }}>
              <thead>
                <tr style={{ background: '#1f2937' }}>
                  <th style={{ padding: '0.75rem', width: '120px' }}>Time</th>
                  {COURTS.map(c => <th key={c} style={{ padding: '0.75rem', textAlign: 'center' }}>Court {c}</th>)}
                </tr>
              </thead>
              <tbody>
                {TIME_SLOTS.map(slot => (
                  <tr key={slot} style={{ borderBottom: '1px solid #1f2937' }}>
                    <td style={{ padding: '0.75rem', color: '#9ca3af', fontSize: '0.85rem' }}>{slot}</td>
                    {COURTS.map(court => {
                      const status = getSlotStatus(court, slot);
                      const isSelected = selectedCourt === court && selectedSlot === slot;
                      return (
                        <td key={court} style={{ padding: '0.5rem' }}>
                          <button
                            disabled={status !== 'Available'}
                            onClick={() => { setSelectedCourt(court); setSelectedSlot(slot); }}
                            className={`court-slot ${status === 'Available' ? 'available' : status === 'Pending' ? 'pending' : 'booked'} ${isSelected ? 'selected' : ''}`}
                            style={{ width: '100%', border: isSelected ? '2px solid #6366f1' : undefined }}
                          >
                            {isSelected ? 'Selected' : status}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem', color: '#9ca3af', justifyContent: 'center', borderTop: '1px solid #1f2937', paddingTop: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: '12px', height: '12px', background: 'rgba(16,185,129,0.15)', border: '1px solid #10b981', borderRadius: '3px' }} /> Available</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: '12px', height: '12px', background: 'rgba(245,158,11,0.15)', border: '1px solid #f59e0b', borderRadius: '3px' }} /> Pending</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: '12px', height: '12px', background: 'rgba(239,68,68,0.15)', border: '1px solid #ef4444', borderRadius: '3px' }} /> Booked</div>
          </div>
        </div>

        {/* Payment Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ background: 'linear-gradient(135deg, #1f2937, #111827)', borderColor: '#374151' }}>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: '#f9fafb', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CreditCard size={18} color="#818cf8" /> Booking Summary
            </h3>
            
            {selectedCourt && selectedSlot ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d1d5db', fontSize: '0.9rem' }}>
                  <span>Date</span> <span style={{ fontWeight: 600, color: '#f9fafb' }}>{date}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d1d5db', fontSize: '0.9rem' }}>
                  <span>Time</span> <span style={{ fontWeight: 600, color: '#f9fafb' }}>{selectedSlot}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d1d5db', fontSize: '0.9rem' }}>
                  <span>Court</span> <span style={{ fontWeight: 600, color: '#f9fafb' }}>Court {selectedCourt}</span>
                </div>
                <div style={{ height: '1px', background: '#374151', margin: '0.25rem 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#9ca3af' }}>Total Amount</span>
                  <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981', fontFamily: 'Outfit, sans-serif' }}>₹{PRICE_PER_HOUR}</span>
                </div>
                
                <button className="btn-primary" style={{ marginTop: '1rem', width: '100%' }} onClick={() => setShowPayment(true)}>
                  Proceed to Pay
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#6b7280' }}>
                <Clock size={32} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
                <div style={{ fontSize: '0.9rem' }}>Select a time slot and court to continue</div>
              </div>
            )}
          </div>

          {/* My Bookings History */}
          <div className="card">
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: '#f9fafb', marginBottom: '1rem' }}>My Bookings</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {myBookings.slice(0, 3).map(b => (
                <div key={b.id} style={{ padding: '0.75rem', background: '#111827', borderRadius: '0.5rem', border: '1px solid #1f2937', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ color: '#f9fafb', fontWeight: 600 }}>{b.date}</span>
                    <span className={`badge ${b.status === 'Booked' ? 'badge-green' : b.status === 'Pending' ? 'badge-yellow' : 'badge-red'}`} style={{ padding: '0.1rem 0.4rem', fontSize: '0.65rem' }}>{b.status}</span>
                  </div>
                  <div style={{ color: '#9ca3af' }}>Court {b.courtNo} • {b.timeSlot}</div>
                </div>
              ))}
              {myBookings.length === 0 && <div style={{ color: '#6b7280', textAlign: 'center', fontSize: '0.85rem', padding: '1rem 0' }}>No previous bookings</div>}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="modal-overlay" onClick={() => setShowPayment(false)}>
          <div className="modal-content" style={{ maxWidth: '400px' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.3rem', fontWeight: 700, color: '#f9fafb' }}>Complete Payment</h2>
              <button onClick={() => setShowPayment(false)} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Scan QR to Pay</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', fontFamily: 'Outfit, sans-serif', marginBottom: '1rem' }}>₹{PRICE_PER_HOUR}</div>
              
              <div style={{ background: 'white', padding: '1rem', borderRadius: '1rem', display: 'inline-block', marginBottom: '1rem' }}>
                {/* Fake QR Code using CSS grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '4px', width: '120px', height: '120px' }}>
                  {[...Array(36)].map((_, i) => (
                    <div key={i} style={{ background: Math.random() > 0.4 ? 'black' : 'white', borderRadius: Math.random() > 0.8 ? '0' : '2px' }} />
                  ))}
                </div>
              </div>
              <div style={{ color: '#818cf8', fontSize: '0.85rem', fontWeight: 600 }}>UPI ID: smashpro@upi</div>
            </div>

            <form onSubmit={handleBook}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: '#9ca3af', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Transaction ID (Optional)</label>
                <input type="text" className="input-field" placeholder="Enter UPI Ref No." value={txnId} onChange={e => setTxnId(e.target.value)} />
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
                <AlertCircle size={16} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '0.8rem', color: '#d1d5db', lineHeight: 1.5 }}>
                  Your booking will be marked as <strong style={{ color: '#f59e0b' }}>Pending</strong>. Admin will verify the payment and approve the slot.
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <Check size={18} /> Confirm Payment
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`@media (max-width: 1024px) { .booking-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
