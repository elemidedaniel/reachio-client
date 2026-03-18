import { useState, useEffect } from 'react';
import api from '../lib/api';
import PageHeader from '../components/layout/PageHeader';
import ProfileForm from '../components/profile/ProfileForm';
import WorksForm from '../components/profile/WorksForm';
import LinksForm from '../components/profile/LinksForm';
import ColorPicker from '../components/profile/ColorPicker';

const TABS = ['General', 'Works & Projects', 'Links', 'Appearance'];

export default function Profile() {
  const [activeTab, setActiveTab] = useState('General');
  const [profile, setProfile]     = useState(null);
  const [works, setWorks]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [success, setSuccess]     = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/api/profile');
      setProfile(res.data);
      setWorks(res.data.works || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (data) => {
    setSaving(true);
    try {
      const res = await api.put('/api/profile', data);
      setProfile(res.data);
      setSuccess('Profile saved successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
      <p style={{ color: '#9CA3AF', fontSize: '14px' }}>Loading profile...</p>
    </div>
  );

  return (
    <div>
      <PageHeader
        title="Profile"
        subtitle="Manage your personal information and outreach identity"
      />

      {/* ── Tabs ── */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #E5E7EB',
        marginBottom: '32px',
      }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 18px',
              fontSize: '13.5px',
              fontWeight: activeTab === tab ? '500' : '400',
              color: activeTab === tab ? 'var(--accent)' : '#6B7280',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab
                ? '2px solid var(--accent)'
                : '2px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.15s',
              fontFamily: 'inherit',
              marginBottom: '-1px',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Success message ── */}
      {success && (
        <div style={{
          padding: '10px 14px', borderRadius: '8px', marginBottom: '20px',
          background: '#F0FDF4', border: '1px solid #BBF7D0',
          fontSize: '13px', color: '#166534',
        }}>
          {success}
        </div>
      )}

      {/* ── Tab content ── */}
      {activeTab === 'General' && (
        <ProfileForm
          profile={profile}
          onSave={handleSaveProfile}
          saving={saving}
          works={works}
        />
      )}

      {activeTab === 'Works & Projects' && (
        <WorksForm
          works={works}
          onUpdate={(updated) => {
            setWorks(updated);
          }}
        />
      )}

      {activeTab === 'Links' && (
        <LinksForm
          profile={profile}
          onSave={handleSaveProfile}
          saving={saving}
        />
      )}

      {activeTab === 'Appearance' && (
        <ColorPicker
          profile={profile}
          onSave={handleSaveProfile}
          saving={saving}
        />
      )}
    </div>
  );
}