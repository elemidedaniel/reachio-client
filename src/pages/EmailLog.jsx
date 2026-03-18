import { useState, useEffect } from 'react';
import api from '../lib/api';
import PageHeader from '../components/layout/PageHeader';
import Table, { Tr, Td } from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import EmptyState from '../components/ui/EmptyState';

const COLUMNS = ['Company', 'Subject', 'Sent At', 'Opened', 'Replied', 'Type', ''];

export default function EmailLog() {
  const [logs, setLogs]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [viewLog, setViewLog]   = useState(null);

  useEffect(() => { fetchLogs(); }, []);

  const fetchLogs = async () => {
    try {
      const res = await api.get('/api/emails/logs');
      setLogs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!loading && logs.length === 0) return (
    <div>
      <PageHeader title="Email Log" subtitle="All emails sent through Reachio" />
      <EmptyState
        icon="📬"
        title="No emails sent yet"
        subtitle="Once your scheduler runs or you send manually, all emails will appear here."
      />
    </div>
  );

  return (
    <div>
      <PageHeader
        title="Email Log"
        subtitle={`${logs.length} email${logs.length !== 1 ? 's' : ''} sent`}
      />

      <Table columns={COLUMNS} loading={loading}>
        {logs.map(log => (
          <Tr key={log.id}>
            <Td>
              <div>
                <p style={{ fontWeight: '500', color: '#0F0F0F', marginBottom: '1px' }}>
                  {log.companies?.name || '—'}
                </p>
                <p style={{ fontSize: '12px', color: '#9CA3AF' }}>
                  {log.companies?.employee_email || '—'}
                </p>
              </div>
            </Td>
            <Td>
              <p style={{ maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#374151' }}>
                {log.subject}
              </p>
            </Td>
            <Td muted>{new Date(log.sent_at).toLocaleString()}</Td>
            <Td>
              <Badge label={log.opened ? 'Opened' : 'Not opened'} type={log.opened ? 'success' : 'warning'} />
            </Td>
            <Td>
              <Badge label={log.replied ? 'Replied' : 'No reply'} type={log.replied ? 'success' : 'warning'} />
            </Td>
            <Td>
              <Badge label={log.is_followup ? 'Follow-up' : 'Initial'} type={log.is_followup ? 'warning' : 'info'} />
            </Td>
            <Td>
              <button
                onClick={() => setViewLog(log)}
                style={{
                  fontSize: '12.5px', color: 'var(--accent)',
                  background: 'none', border: 'none',
                  cursor: 'pointer', fontFamily: 'inherit',
                  padding: 0,
                }}
              >
                View
              </button>
            </Td>
          </Tr>
        ))}
      </Table>

      {/* View email modal */}
      <Modal open={!!viewLog} onClose={() => setViewLog(null)} title="Email Details" width="600px">
        {viewLog && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <InfoRow label="Company"   value={viewLog.companies?.name || '—'} />
              <InfoRow label="To"        value={viewLog.companies?.employee_email || '—'} />
              <InfoRow label="Sent"      value={new Date(viewLog.sent_at).toLocaleString()} />
              <InfoRow label="Type"      value={viewLog.is_followup ? 'Follow-up' : 'Initial'} />
              <InfoRow label="Opened"    value={viewLog.opened ? 'Yes' : 'No'} />
              <InfoRow label="Replied"   value={viewLog.replied ? 'Yes' : 'No'} />
            </div>
            <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '12px 16px', border: '1px solid #E5E7EB' }}>
              <p style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Subject</p>
              <p style={{ fontSize: '14px', fontWeight: '500', color: '#0F0F0F' }}>{viewLog.subject}</p>
            </div>
            <div style={{ background: '#fff', borderRadius: '8px', padding: '16px', border: '1px solid #E5E7EB' }}>
              <p style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Body</p>
              <pre style={{ fontSize: '13px', color: '#374151', lineHeight: '1.75', whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0 }}>
                {viewLog.body_rendered}
              </pre>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '10px 14px', border: '1px solid #E5E7EB' }}>
      <p style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
      <p style={{ fontSize: '13.5px', color: '#374151', fontWeight: '500', margin: 0 }}>{value}</p>
    </div>
  );
}