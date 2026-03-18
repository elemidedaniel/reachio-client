import { useState } from 'react';
import api from '../../lib/api';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import EmptyState from '../ui/EmptyState';

export default function WorksForm({ works, onUpdate }) {
  const [showForm, setShowForm]   = useState(false);
  const [editItem, setEditItem]   = useState(null);
  const [saving, setSaving]       = useState(false);
  const [deleting, setDeleting]   = useState(null);
  const [form, setForm]           = useState({ title: '', description: '', url: '' });

  const upd = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const resetForm = () => {
    setForm({ title: '', description: '', url: '' });
    setEditItem(null);
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setForm({ title: item.title, description: item.description || '', url: item.url || '' });
    setEditItem(item);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) return;
    setSaving(true);
    try {
      if (editItem) {
        const res = await api.put(`/api/profile/works/${editItem.id}`, form);
        onUpdate(works.map(w => w.id === editItem.id ? res.data : w));
      } else {
        const res = await api.post('/api/profile/works', form);
        onUpdate([...works, res.data]);
      }
      resetForm();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      await api.delete(`/api/profile/works/${id}`);
      onUpdate(works.filter(w => w.id !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Works list */}
      <div style={{
        background: '#fff', borderRadius: '12px',
        border: '1px solid #E5E7EB', overflow: 'hidden',
      }}>
        {works.length === 0 && !showForm ? (
          <EmptyState
            icon="🗂"
            title="No works added yet"
            subtitle="Add your projects, case studies, or any work that represents you"
            action={() => setShowForm(true)}
            actionLabel="Add Work"
          />
        ) : (
          <div>
            {works.map((item, i) => (
              <div key={item.id} style={{
                padding: '16px 20px',
                borderBottom: i < works.length - 1 ? '1px solid #F3F4F6' : 'none',
                display: 'flex', alignItems: 'flex-start',
                justifyContent: 'space-between', gap: '16px',
              }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '13.5px', fontWeight: '500', color: '#0F0F0F', marginBottom: '3px' }}>
                    {item.title}
                  </p>
                  {item.description && (
                    <p style={{ fontSize: '12.5px', color: '#6B7280', lineHeight: '1.5', marginBottom: '4px' }}>
                      {item.description}
                    </p>
                  )}
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noreferrer"
                      style={{ fontSize: '12px', color: 'var(--accent)', textDecoration: 'none' }}>
                      {item.url}
                    </a>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  <Button size="sm" variant="ghost" onClick={() => handleEdit(item)}>Edit</Button>
                  <Button size="sm" variant="danger" loading={deleting === item.id} onClick={() => handleDelete(item.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit form */}
      {showForm && (
        <div style={{
          background: '#fff', borderRadius: '12px',
          border: '1px solid #E5E7EB', padding: '24px',
        }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#0F0F0F', marginBottom: '20px' }}>
            {editItem ? 'Edit Work' : 'Add Work'}
          </h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input
              label="Title"
              value={form.title}
              onChange={v => upd('title', v)}
              placeholder="Cryptex — Crypto Intelligence Platform"
              required
            />
            <Textarea
              label="Description"
              value={form.description}
              onChange={v => upd('description', v)}
              placeholder="Brief description of what you built and your role..."
              rows={3}
            />
            <Input
              label="URL (optional)"
              value={form.url}
              onChange={v => upd('url', v)}
              placeholder="https://yourproject.vercel.app"
            />
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <Button variant="ghost" onClick={resetForm}>Cancel</Button>
              <Button type="submit" loading={saving}>
                {editItem ? 'Save Changes' : 'Add Work'}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Add button */}
      {!showForm && works.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={() => setShowForm(true)}>+ Add Work</Button>
        </div>
      )}
    </div>
  );
}