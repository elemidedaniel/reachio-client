export default function Table({ columns, children, loading }) {
  return (
    <div style={{ overflowX: 'auto', borderRadius: '10px', border: '1px solid #E5E7EB' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
        <thead>
          <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
            {columns.map(col => (
              <th key={col} style={{
                padding: '11px 16px', textAlign: 'left',
                fontSize: '12px', fontWeight: '500',
                color: '#6B7280', whiteSpace: 'nowrap',
                letterSpacing: '0.02em',
              }}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} style={{ padding: '48px', textAlign: 'center', color: '#9CA3AF', fontSize: '13px' }}>
                Loading...
              </td>
            </tr>
          ) : children}
        </tbody>
      </table>
    </div>
  );
}

export function Tr({ children, onClick }) {
  return (
    <tr
      onClick={onClick}
      style={{
        borderBottom: '1px solid #F3F4F6',
        transition: 'background 0.1s',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onMouseEnter={e => { if (onClick) e.currentTarget.style.background = '#F9FAFB'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
    >
      {children}
    </tr>
  );
}

export function Td({ children, muted }) {
  return (
    <td style={{
      padding: '13px 16px',
      color: muted ? '#9CA3AF' : '#374151',
      whiteSpace: 'nowrap',
    }}>
      {children}
    </td>
  );
}