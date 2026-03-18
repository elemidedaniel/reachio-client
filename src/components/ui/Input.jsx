export default function Input({
  label, value, onChange, placeholder,
  type = 'text', error, required = false,
  disabled = false, hint,
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      {label && (
        <label style={{ fontSize: '12.5px', fontWeight: '500', color: '#374151' }}>
          {label} {required && <span style={{ color: '#EF4444' }}>*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        style={{
          padding: '9px 12px',
          fontSize: '13.5px',
          border: `1px solid ${error ? '#FCA5A5' : '#E5E7EB'}`,
          borderRadius: '8px',
          outline: 'none',
          background: disabled ? '#F9FAFB' : '#fff',
          color: '#0F0F0F',
          transition: 'border-color 0.15s',
          width: '100%',
          fontFamily: 'inherit',
        }}
        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
        onBlur={e => e.target.style.borderColor = error ? '#FCA5A5' : '#E5E7EB'}
      />
      {hint && !error && <p style={{ fontSize: '12px', color: '#9CA3AF' }}>{hint}</p>}
      {error && <p style={{ fontSize: '12px', color: '#EF4444' }}>{error}</p>}
    </div>
  );
}