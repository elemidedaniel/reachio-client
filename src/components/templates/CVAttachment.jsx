import Input from '../ui/Input';

export default function CVAttachment({ value, onChange, profileCvUrl }) {
  return (
    <div style={{
      background: '#F9FAFB', borderRadius: '8px',
      border: '1px solid #E5E7EB', padding: '16px',
      display: 'flex', flexDirection: 'column', gap: '10px',
    }}>
      <div>
        <p style={{ fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '3px' }}>
          Attach CV to this template (optional)
        </p>
        <p style={{ fontSize: '12px', color: '#9CA3AF' }}>
          {value
            ? 'Using custom CV for this template'
            : profileCvUrl
              ? 'Using profile CV (default)'
              : 'No CV attached — emails will send without attachment'}
        </p>
      </div>
      <Input
        value={value || ''}
        onChange={onChange}
        placeholder="https://drive.google.com/your-cv.pdf (optional)"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          style={{
            fontSize: '12px', color: '#EF4444', background: 'none',
            border: 'none', cursor: 'pointer', textAlign: 'left',
            fontFamily: 'inherit', padding: 0,
          }}
        >
          Remove custom CV — use profile CV instead
        </button>
      )}
    </div>
  );
}