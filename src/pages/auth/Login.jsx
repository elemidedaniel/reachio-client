import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function Login() {
  const { signIn }        = useAuth();
  const navigate          = useNavigate();
  const [form, setForm]   = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const upd = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signIn(form.email, form.password);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    navigate('/dashboard');
  };

  return (
    <div style={{
      background: '#fff',
      borderRadius: '12px',
      border: '1px solid #E5E7EB',
      padding: '32px',
    }}>
      <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#0F0F0F', marginBottom: '6px' }}>
        Welcome back
      </h2>
      <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '28px' }}>
        Sign in to your Reachio account
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={v => upd('email', v)}
          placeholder="you@example.com"
          required
        />
        <Input
          label="Password"
          type="password"
          value={form.password}
          onChange={v => upd('password', v)}
          placeholder="Your password"
          required
        />

        {error && (
          <div style={{
            padding: '10px 14px', borderRadius: '8px',
            background: '#FEF2F2', border: '1px solid #FECACA',
            fontSize: '13px', color: '#DC2626',
          }}>
            {error}
          </div>
        )}

        <Button type="submit" fullWidth loading={loading}>
          Sign In
        </Button>
      </form>

      <p style={{ textAlign: 'center', fontSize: '13px', color: '#6B7280', marginTop: '20px' }}>
        Don't have an account?{' '}
        <Link to="/signup" style={{ color: 'var(--accent)', fontWeight: '500', textDecoration: 'none' }}>
          Sign up
        </Link>
      </p>
    </div>
  );
}