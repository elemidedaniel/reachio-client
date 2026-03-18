import { useState, useEffect } from 'react';
import api from '../lib/api';
import PageHeader from '../components/layout/PageHeader';
import Input from '../components/ui/Input';
import Toggle from '../components/ui/Toggle';
import Button from '../components/ui/Button';

export default function Settings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [success, setSuccess]   = useState('');
  const [error, setError]       = useState('');

  useEffect(() => { fetchSettings(); }, []);

  const fetchSettings = async () => {
    try {
      const res = await api.get('/api/settings');
      setSettings(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const upd = (k, v) => setSettings(p => ({ ...p, [k]: v }));

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      await api.put('/api/settings', settings);
      setSuccess('Settings saved');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
      <p style={{ color: '#9CA3AF' }}>Loading settings...</p>
    </div>
  );

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Configure how and when your emails are sent"
      />

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '680px' }}>

        {/* Success / Error */}
        {success && (
          <div style={{ padding: '10px 14px', borderRadius: '8px', background: '#F0FDF4', border: '1px solid #BBF7D0', fontSize: '13px', color: '#166534' }}>
            {success}
          </div>
        )}
        {error && (
          <div style={{ padding: '10px 14px', borderRadius: '8px', background: '#FEF2F2', border: '1px solid #FECACA', fontSize: '13px', color: '#DC2626' }}>
            {error}
          </div>
        )}

        {/* Sending config */}
        <Section title="Sending Configuration">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Input
              label="Daily Send Limit"
              type="number"
              value={settings.daily_limit}
              onChange={v => upd('daily_limit', parseInt(v) || 1)}
              hint="Max emails to send per day"
            />
            <Input
              label="Send Time"
              type="time"
              value={settings.send_time}
              onChange={v => upd('send_time', v)}
              hint="Time to start sending each day"
            />
            <Input
              label="Interval Between Emails (minutes)"
              type="number"
              value={settings.interval_minutes}
              onChange={v => upd('interval_minutes', parseInt(v) || 1)}
              hint="Gap between each email sent"
            />
            <Input
              label="Follow-up After (days)"
              type="number"
              value={settings.followup_days}
              onChange={v => upd('followup_days', parseInt(v) || 1)}
              hint="Days to wait before sending follow-up"
            />
          </div>
        </Section>

        {/* Scheduler */}
        <Section title="Scheduler">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Toggle
              label="Enable Scheduler"
              hint="Automatically send emails at your set time every day"
              checked={settings.scheduler_active}
              onChange={v => upd('scheduler_active', v)}
            />
            <Toggle
              label="Require Preview Before Sending"
              hint="You must approve each email before the scheduler sends it"
              checked={settings.preview_required}
              onChange={v => upd('preview_required', v)}
            />
          </div>
        </Section>

        {/* Notifications */}
        <Section title="Notifications">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Toggle
              label="Notify when emails are sent"
              checked={settings.notify_on_send}
              onChange={v => upd('notify_on_send', v)}
            />
            <Toggle
              label="Notify on reply"
              checked={settings.notify_on_reply}
              onChange={v => upd('notify_on_reply', v)}
            />
            <Toggle
              label="Notify when company list is exhausted"
              checked={settings.notify_on_exhausted}
              onChange={v => upd('notify_on_exhausted', v)}
            />
            <Toggle
              label="Send daily summary to my email"
              hint="Receive a daily report of emails sent"
              checked={settings.daily_summary_email}
              onChange={v => upd('daily_summary_email', v)}
            />
          </div>
        </Section>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="submit" loading={saving}>Save Settings</Button>
        </div>

      </form>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{
      background: '#fff', borderRadius: '12px',
      border: '1px solid #E5E7EB', padding: '24px',
      display: 'flex', flexDirection: 'column', gap: '20px',
    }}>
      <h3 style={{ fontSize: '13.5px', fontWeight: '600', color: '#0F0F0F', margin: 0 }}>
        {title}
      </h3>
      {children}
    </div>
  );
}