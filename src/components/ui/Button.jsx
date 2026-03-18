export default function Button({
  children, onClick, variant = 'primary',
  size = 'md', disabled = false, type = 'button',
  fullWidth = false, loading = false,
}) {
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: '6px', fontWeight: '500', borderRadius: '8px',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.6 : 1,
    transition: 'all 0.15s ease', border: 'none',
    fontFamily: 'inherit', width: fullWidth ? '100%' : 'auto',
  };

  const sizes = {
    sm: { padding: '6px 12px', fontSize: '12px' },
    md: { padding: '9px 16px', fontSize: '13.5px' },
    lg: { padding: '11px 22px', fontSize: '14.5px' },
  };

  const variants = {
    primary:   { background: 'var(--accent)', color: '#fff' },
    secondary: { background: '#F3F4F6', color: '#374151' },
    danger:    { background: '#FEF2F2', color: '#EF4444' },
    ghost:     { background: 'transparent', color: '#6B7280', border: '1px solid #E5E7EB' },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{ ...base, ...sizes[size], ...variants[variant] }}
      onMouseEnter={e => {
        if (!disabled && !loading) {
          if (variant === 'primary') e.currentTarget.style.opacity = '0.88';
          if (variant === 'secondary') e.currentTarget.style.background = '#E5E7EB';
          if (variant === 'ghost') e.currentTarget.style.background = '#F9FAFB';
          if (variant === 'danger') e.currentTarget.style.background = '#FEE2E2';
        }
      }}
      onMouseLeave={e => {
        if (!disabled && !loading) {
          if (variant === 'primary') e.currentTarget.style.opacity = '1';
          if (variant === 'secondary') e.currentTarget.style.background = '#F3F4F6';
          if (variant === 'ghost') e.currentTarget.style.background = 'transparent';
          if (variant === 'danger') e.currentTarget.style.background = '#FEF2F2';
        }
      }}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}