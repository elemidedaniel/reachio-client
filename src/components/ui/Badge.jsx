const STATUS_STYLES = {
  Pending:      { bg: '#FEF9C3', color: '#854D0E' },
  Sent:         { bg: '#DBEAFE', color: '#1E40AF' },
  Opened:       { bg: '#D1FAE5', color: '#065F46' },
  Replied:      { bg: '#F0FDF4', color: '#166534' },
  'Followed Up':{ bg: '#EDE9FE', color: '#5B21B6' },
  Blacklisted:  { bg: '#FEE2E2', color: '#991B1B' },
  info:         { bg: '#DBEAFE', color: '#1E40AF' },
  success:      { bg: '#D1FAE5', color: '#065F46' },
  warning:      { bg: '#FEF9C3', color: '#854D0E' },
  error:        { bg: '#FEE2E2', color: '#991B1B' },
};

export default function Badge({ label, type }) {
  const style = STATUS_STYLES[label] || STATUS_STYLES[type] || STATUS_STYLES['info'];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '3px 9px', borderRadius: '20px',
      fontSize: '11.5px', fontWeight: '500',
      background: style.bg, color: style.color,
      whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  );
}