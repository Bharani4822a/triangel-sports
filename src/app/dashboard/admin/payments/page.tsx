'use client';
import { useData } from '@/context/DataContext';
import { Receipt, Download } from 'lucide-react';

export default function AdminPaymentsPage() {
  const { fees, bookings } = useData();

  const paidFees = fees.filter(f => f.status === 'Paid');
  const paidBookings = bookings.filter(b => b.status === 'Booked');
  const totalRevenue = paidFees.reduce((s, f) => s + f.amount, 0) + paidBookings.reduce((s, b) => s + b.price, 0);

  const transactions = [
    ...paidFees.map(f => ({ id: f.id, type: 'Fee Payment', name: f.studentName, amount: f.amount, date: f.paidDate || f.month, receipt: f.receiptNo, color: '#10b981' })),
    ...paidBookings.map(b => ({ id: b.id, type: 'Court Booking', name: b.userName, amount: b.price, date: b.date, receipt: `BKG-${b.id.toUpperCase()}`, color: '#6366f1' })),
  ].sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: '#f9fafb' }}>Payments & Receipts</h1>
        <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '0.25rem' }}>Complete payment record for all transactions</p>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '2rem' }} className="pay-stat-grid">
        {[
          { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: '💰', color: '#10b981' },
          { label: 'Fee Payments', value: `₹${paidFees.reduce((s, f) => s + f.amount, 0).toLocaleString()}`, icon: '🧾', color: '#6366f1' },
          { label: 'Court Bookings', value: `₹${paidBookings.reduce((s, b) => s + b.price, 0).toLocaleString()}`, icon: '🏸', color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} className="stat-card" style={{ borderColor: `${s.color}33` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ color: '#6b7280', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>{s.label}</div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: s.color, fontFamily: 'Outfit, sans-serif' }}>{s.value}</div>
              </div>
              <div style={{ fontSize: '2rem' }}>{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Transaction table */}
      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #1f2937', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#f9fafb' }}>All Transactions</h3>
          <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Download size={15} /> Export
          </button>
        </div>
        <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Receipt / ID</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(t => (
                <tr key={t.id}>
                  <td>
                    <span className="badge" style={{ background: `${t.color}15`, color: t.color, border: `1px solid ${t.color}33`, fontSize: '0.75rem' }}>
                      {t.type}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600, color: '#f9fafb' }}>{t.name}</td>
                  <td style={{ color: '#10b981', fontWeight: 700, fontSize: '1rem' }}>₹{t.amount.toLocaleString()}</td>
                  <td style={{ color: '#9ca3af' }}>{t.date}</td>
                  <td style={{ color: '#818cf8', fontFamily: 'monospace', fontSize: '0.85rem' }}>{t.receipt}</td>
                  <td><span className="badge badge-green">Paid</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          {transactions.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
              <Receipt size={40} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
              <div>No payment records yet</div>
            </div>
          )}
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .pay-stat-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
