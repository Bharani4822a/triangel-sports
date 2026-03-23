'use client';
import { useState } from 'react';
import { useData, Student, SkillLevel, BatchTime } from '@/context/DataContext';
import { UserPlus, Search, Edit2, Trash2, X, Check, Users } from 'lucide-react';
import toast from 'react-hot-toast';

const SKILL_LEVELS: SkillLevel[] = ['Beginner', 'Intermediate', 'Advanced', 'Professional'];
const BATCHES: BatchTime[] = ['Morning 6-8 AM', 'Morning 8-10 AM', 'Evening 4-6 PM', 'Evening 6-8 PM'];
const GROUPS = ['Group A', 'Group B', 'Group C', 'Group D'];

const emptyForm = { name: '', age: 14, email: '', phone: '', skillLevel: 'Beginner' as SkillLevel, batch: 'Morning 6-8 AM' as BatchTime, joinDate: new Date().toISOString().split('T')[0], feeStatus: 'Pending' as any, monthlyFee: 1200, group: 'Group A', parentName: '' };

export default function AdminStudentsPage() {
  const { students, addStudent, updateStudent, deleteStudent } = useData();
  const [search, setSearch] = useState('');
  const [filterBatch, setFilterBatch] = useState('');
  const [filterSkill, setFilterSkill] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filtered = students.filter(s =>
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase())) &&
    (!filterBatch || s.batch === filterBatch) &&
    (!filterSkill || s.skillLevel === filterSkill)
  );

  const openAdd = () => { setForm(emptyForm); setEditId(null); setShowModal(true); };
  const openEdit = (s: Student) => { setForm({ name: s.name, age: s.age, email: s.email, phone: s.phone, skillLevel: s.skillLevel, batch: s.batch, joinDate: s.joinDate, feeStatus: s.feeStatus, monthlyFee: s.monthlyFee, group: s.group, parentName: s.parentName || '' }); setEditId(s.id); setShowModal(true); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) { updateStudent(editId, form); toast.success('Student updated!'); }
    else { addStudent(form); toast.success('Student added!'); }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    deleteStudent(id);
    setDeleteConfirm(null);
    toast.success('Student removed');
  };

  const skillColors: Record<string, string> = { Beginner: '#10b981', Intermediate: '#f59e0b', Advanced: '#6366f1', Professional: '#ef4444' };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: '#f9fafb' }}>Student Management</h1>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '0.25rem' }}>{students.length} students enrolled</p>
        </div>
        <button className="btn-primary" onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem' }}>
          <UserPlus size={18} /> Add Student
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <Search size={16} color="#6b7280" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          <input className="input-field" placeholder="Search students..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: '2.75rem' }} />
        </div>
        <select className="input-field" value={filterBatch} onChange={e => setFilterBatch(e.target.value)} style={{ width: 'auto', minWidth: '180px' }}>
          <option value="">All Batches</option>
          {BATCHES.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
        <select className="input-field" value={filterSkill} onChange={e => setFilterSkill(e.target.value)} style={{ width: 'auto', minWidth: '150px' }}>
          <option value="">All Skill Levels</option>
          {SKILL_LEVELS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Age</th>
              <th>Batch</th>
              <th>Skill Level</th>
              <th>Group</th>
              <th>Monthly Fee</th>
              <th>Fee Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `linear-gradient(135deg, ${skillColors[s.skillLevel]}, ${skillColors[s.skillLevel]}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 700, color: 'white', flexShrink: 0 }}>
                      {s.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: '#f9fafb' }}>{s.name}</div>
                      <div style={{ color: '#6b7280', fontSize: '0.78rem' }}>{s.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ color: '#9ca3af' }}>{s.age}</td>
                <td><span className="badge badge-blue" style={{ fontSize: '0.72rem' }}>{s.batch}</span></td>
                <td><span className="badge" style={{ background: `${skillColors[s.skillLevel]}15`, color: skillColors[s.skillLevel], border: `1px solid ${skillColors[s.skillLevel]}33` }}>{s.skillLevel}</span></td>
                <td style={{ color: '#9ca3af' }}>{s.group}</td>
                <td style={{ color: '#f9fafb', fontWeight: 600 }}>₹{s.monthlyFee.toLocaleString()}</td>
                <td><span className={`badge ${s.feeStatus === 'Paid' ? 'badge-green' : s.feeStatus === 'Overdue' ? 'badge-red' : 'badge-yellow'}`}>{s.feeStatus}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => openEdit(s)} style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '0.5rem', padding: '0.4rem', cursor: 'pointer', color: '#818cf8', transition: 'all 0.2s' }}>
                      <Edit2 size={15} />
                    </button>
                    <button onClick={() => setDeleteConfirm(s.id)} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '0.5rem', padding: '0.4rem', cursor: 'pointer', color: '#ef4444', transition: 'all 0.2s' }}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
            <Users size={40} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
            <div>No students found</div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.3rem', fontWeight: 700, color: '#f9fafb' }}>{editId ? 'Edit Student' : 'Add New Student'}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                {[
                  { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Student name' },
                  { key: 'age', label: 'Age', type: 'number', placeholder: '14' },
                  { key: 'email', label: 'Email', type: 'email', placeholder: 'email@example.com' },
                  { key: 'phone', label: 'Phone', type: 'tel', placeholder: '98765XXXXX' },
                  { key: 'parentName', label: "Parent's Name", type: 'text', placeholder: 'Parent name' },
                  { key: 'monthlyFee', label: 'Monthly Fee (₹)', type: 'number', placeholder: '1500' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ display: 'block', color: '#9ca3af', fontSize: '0.8rem', marginBottom: '0.4rem', fontWeight: 500 }}>{f.label}</label>
                    <input type={f.type} className="input-field" placeholder={f.placeholder} value={(form as any)[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: f.type === 'number' ? Number(e.target.value) : e.target.value }))} required={f.key !== 'parentName'} />
                  </div>
                ))}
              </div>
              {[
                { key: 'skillLevel', label: 'Skill Level', options: SKILL_LEVELS },
                { key: 'batch', label: 'Batch', options: BATCHES },
                { key: 'group', label: 'Group', options: GROUPS },
              ].map(sel => (
                <div key={sel.key} style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', color: '#9ca3af', fontSize: '0.8rem', marginBottom: '0.4rem', fontWeight: 500 }}>{sel.label}</label>
                  <select className="input-field" value={(form as any)[sel.key]} onChange={e => setForm(p => ({ ...p, [sel.key]: e.target.value }))}>
                    {sel.options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <Check size={16} /> {editId ? 'Update Student' : 'Add Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal-content" style={{ maxWidth: '380px' }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#f9fafb', marginBottom: '0.5rem' }}>Delete Student?</h3>
              <p style={{ color: '#9ca3af', marginBottom: '1.5rem', fontSize: '0.9rem' }}>This action cannot be undone.</p>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setDeleteConfirm(null)}>Cancel</button>
                <button style={{ flex: 1, background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: 'white', padding: '0.75rem', borderRadius: '0.75rem', border: 'none', cursor: 'pointer', fontWeight: 600 }} onClick={() => handleDelete(deleteConfirm)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
