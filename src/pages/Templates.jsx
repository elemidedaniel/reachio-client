import { useState, useEffect } from 'react';
import api from '../lib/api';
import PageHeader from '../components/layout/PageHeader';
import TemplateCard from '../components/templates/TemplateCard';
import TemplateEditor from '../components/templates/TemplateEditor';
import EmailPreview from '../components/emails/EmailPreview';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';

export default function Templates() {
  const [templates, setTemplates]   = useState([]);
  const [profile, setProfile]       = useState(null);
  const [loading, setLoading]       = useState(true);
  const [showAdd, setShowAdd]       = useState(false);
  const [editItem, setEditItem]     = useState(null);
  const [previewItem, setPreviewItem] = useState(null);
  const [error, setError]           = useState('');

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [tRes, pRes] = await Promise.all([
        api.get('/api/templates'),
        api.get('/api/profile'),
      ]);
      setTemplates(tRes.data);
      setProfile(pRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (form) => {
    setError('');
    try {
      const res = await api.post('/api/templates', form);
      setTemplates(p => [res.data, ...p]);
      setShowAdd(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create template');
    }
  };

  const handleEdit = async (form) => {
    setError('');
    try {
      const res = await api.put(`/api/templates/${editItem.id}`, form);
      setTemplates(p => p.map(t => t.id === editItem.id ? res.data : t));
      setEditItem(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update template');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this template?')) return;
    try {
      await api.delete(`/api/templates/${id}`);
      setTemplates(p => p.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const mainTemplates   = templates.filter(t => !t.is_followup);
  const followupTemplate = templates.find(t => t.is_followup);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
      <p style={{ color: '#9CA3AF' }}>Loading templates...</p>
    </div>
  );

  return (
    <div>
      <PageHeader
        title="Templates"
        subtitle="Up to 3 email templates + 1 follow-up template"
        action={
          <Button onClick={() => setShowAdd(true)} disabled={mainTemplates.length >= 3 && !!followupTemplate}>
            + New Template
          </Button>
        }
      />

      {/* Main templates */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Email Templates ({mainTemplates.length}/3)
          </h3>
        </div>

        {mainTemplates.length === 0 ? (
          <EmptyState
            icon="✉"
            title="No templates yet"
            subtitle="Create your first email template. Use variables to personalise each email automatically."
            action={() => setShowAdd(true)}
            actionLabel="Create Template"
          />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
            {mainTemplates.map(t => (
              <TemplateCard
                key={t.id}
                template={t}
                onEdit={setEditItem}
                onDelete={handleDelete}
                onPreview={setPreviewItem}
              />
            ))}
          </div>
        )}
      </div>

      {/* Follow-up template */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Follow-up Template ({followupTemplate ? '1' : '0'}/1)
          </h3>
        </div>

        {!followupTemplate ? (
          <EmptyState
            icon="↩"
            title="No follow-up template"
            subtitle="Create a follow-up template for companies that haven't replied after a few days."
            action={() => setShowAdd(true)}
            actionLabel="Create Follow-up"
          />
        ) : (
          <div style={{ maxWidth: '400px' }}>
            <TemplateCard
              template={followupTemplate}
              onEdit={setEditItem}
              onDelete={handleDelete}
              onPreview={setPreviewItem}
            />
          </div>
        )}
      </div>

      {/* Add Modal */}
      <Modal open={showAdd} onClose={() => { setShowAdd(false); setError(''); }} title="Create Template" width="680px">
        {error && (
          <div style={{ padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', background: '#FEF2F2', border: '1px solid #FECACA', fontSize: '13px', color: '#DC2626' }}>
            {error}
          </div>
        )}
        <TemplateEditor
          onSave={handleAdd}
          onClose={() => { setShowAdd(false); setError(''); }}
          profileCvUrl={profile?.cv_url}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal open={!!editItem} onClose={() => { setEditItem(null); setError(''); }} title="Edit Template" width="680px">
        {error && (
          <div style={{ padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', background: '#FEF2F2', border: '1px solid #FECACA', fontSize: '13px', color: '#DC2626' }}>
            {error}
          </div>
        )}
        <TemplateEditor
          onSave={handleEdit}
          onClose={() => { setEditItem(null); setError(''); }}
          initial={editItem}
          profileCvUrl={profile?.cv_url}
        />
      </Modal>

      {/* Preview Modal */}
      <Modal open={!!previewItem} onClose={() => setPreviewItem(null)} title="Email Preview" width="600px">
        <EmailPreview
          template={previewItem}
          profile={profile}
          company={{ name: 'Acme Inc', employee_name: 'John Smith', employee_role: 'CTO' }}
        />
      </Modal>
    </div>
  );
}