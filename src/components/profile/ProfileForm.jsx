import { useState, useEffect, useRef } from 'react';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

const calcCompletion = (form, works) => {
  const fields = [
    form.full_name,
    form.role,
    form.bio,
    form.skills,
    form.gmail,
    form.gmail_app_password,
    form.cv_url,
  ];
  const extras = [works?.length > 0];
  const all    = [...fields, ...extras];
  return Math.round((all.filter(Boolean).length / all.length) * 100);
};

export default function ProfileForm({ profile, onSave, saving, works = [] }) {
  const { user } = useAuth();
  const fileRef  = useRef(null);

  const [form, setForm] = useState({
    full_name:          '',
    role:               '',
    bio:                '',
    skills:             '',
    gmail:              '',
    gmail_app_password: '',
    cv_url:             '',
  });

  const [uploading,   setUploading]   = useState(false);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    if (profile) {
      setForm({
        full_name:          profile.full_name || '',
        role:               profile.role || '',
        bio:                profile.bio || '',
        skills:             (profile.skills || []).join(', '),
        gmail:              profile.gmail || '',
        gmail_app_password: profile.gmail_app_password || '',
        cv_url:             profile.cv_url || '',
      });
    }
  }, [profile]);

  const upd = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const completion = calcCompletion(form, works);

  const missingFields = [
    !form.full_name          && 'Full name',
    !form.role               && 'Role',
    !form.bio                && 'Bio',
    !form.skills             && 'Skills',
    !form.gmail              && 'Gmail',
    !form.gmail_app_password && 'App password',
    !form.cv_url             && 'CV',
    !(works?.length > 0)     && 'Works / Projects',
  ].filter(Boolean);

  const handleCVUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setUploadError('Only PDF files are allowed');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File must be under 5MB');
      return;
    }

    setUploadError('');
    setUploading(true);

    try {
      const fileName = `${user.id}/cv-${Date.now()}.pdf`;

      const { error: uploadErr } = await supabase.storage
        .from('cvs')
        .upload(fileName, file, { upsert: true });

      if (uploadErr) throw uploadErr;

      const { data } = supabase.storage
        .from('cvs')
        .getPublicUrl(fileName);

      upd('cv_url', data.publicUrl);
    } catch (err) {
      setUploadError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const handleRemoveCV = () => {
    if (!window.confirm('Remove CV?')) return;
    upd('cv_url', '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{
        background: '#fff', borderRadius: '12px',
        border: '1px solid #E5E7EB', padding: '24px',
        display: 'flex', flexDirection: 'column', gap: '20px',
      }}>

        {/* ── Completion bar ── */}
        <div style={{
          background: '#F9FAFB', borderRadius: '10px',
          border: '1px solid #E5E7EB', padding: '16px 18px',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', marginBottom: '10px',
          }}>
            <p style={{ fontSize: '13px', fontWeight: '500', color: '#374151', margin: 0 }}>
              Profile Completion
            </p>
            <p style={{
              fontSize: '13px', fontWeight: '600', margin: 0,
              color: completion === 100 ? '#16A34A' : 'var(--accent)',
            }}>
              {completion}%
            </p>
          </div>

          <div style={{ height: '6px', background: '#E5E7EB', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${completion}%`,
              background: completion === 100 ? '#16A34A' : 'var(--accent)',
              borderRadius: '10px',
              transition: 'width 0.4s ease',
            }} />
          </div>

          {completion < 100 ? (
            <p style={{ fontSize: '11.5px', color: '#9CA3AF', margin: '8px 0 0' }}>
              {missingFields.join(' · ')} still missing
            </p>
          ) : (
            <p style={{ fontSize: '11.5px', color: '#16A34A', margin: '8px 0 0' }}>
              ✓ Profile complete — your emails will be fully personalised
            </p>
          )}
        </div>

        {/* ── Personal Info ── */}
        <SectionTitle title="Personal Info" />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Input
            label="Full Name"
            value={form.full_name}
            onChange={v => upd('full_name', v)}
            placeholder="Daniel Elemide"
            required
          />
          <Input
            label="Role / Title"
            value={form.role}
            onChange={v => upd('role', v)}
            placeholder="Frontend Developer"
            required
          />
        </div>

        <Textarea
          label="Bio"
          value={form.bio}
          onChange={v => upd('bio', v)}
          placeholder="Write a short bio about yourself — this will be used in your email templates..."
          rows={4}
          hint="Available as {{your_bio}} in templates"
        />

        <Input
          label="Skills"
          value={form.skills}
          onChange={v => upd('skills', v)}
          placeholder="React, Node.js, Tailwind CSS, MongoDB"
          hint="Comma separated — available as {{your_skills}} in templates"
        />

        {/* ── Gmail Config ── */}
        <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '20px' }}>
          <SectionTitle title="Gmail Sending Config" />
          <p style={{ fontSize: '12px', color: '#9CA3AF', margin: '4px 0 16px' }}>
            Used to send emails on your behalf via Gmail SMTP
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Input
              label="Gmail Address"
              type="email"
              value={form.gmail}
              onChange={v => upd('gmail', v)}
              placeholder="you@gmail.com"
            />
            <Input
              label="Gmail App Password"
              type="password"
              value={form.gmail_app_password}
              onChange={v => upd('gmail_app_password', v)}
              placeholder="xxxx xxxx xxxx xxxx"
              hint="myaccount.google.com → Security → App Passwords"
            />
          </div>
        </div>

        {/* ── Default CV ── */}
        <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '20px' }}>
          <SectionTitle title="Default CV" />
          <p style={{ fontSize: '12px', color: '#9CA3AF', margin: '4px 0 16px' }}>
            Attached to emails when no template-specific CV is set
          </p>

          {form.cv_url ? (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 16px',
              background: '#F0FDF4', border: '1px solid #BBF7D0',
              borderRadius: '8px', gap: '12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: '22px' }}>📄</span>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: '13px', fontWeight: '500', color: '#166534', margin: '0 0 2px' }}>
                    CV uploaded
                  </p>
                  <a
                    href={form.cv_url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontSize: '11.5px', color: '#16A34A',
                      textDecoration: 'none',
                      overflow: 'hidden', textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap', display: 'block',
                    }}
                  >
                    View CV →
                  </a>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <Button
                  size="sm" variant="ghost" type="button"
                  onClick={() => fileRef.current?.click()}
                  loading={uploading}
                >
                  Replace
                </Button>
                <Button
                  size="sm" variant="danger" type="button"
                  onClick={handleRemoveCV}
                >
                  Remove
                </Button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileRef.current?.click()}
              style={{
                border: '2px dashed #E5E7EB', borderRadius: '8px',
                padding: '32px 24px', textAlign: 'center',
                cursor: uploading ? 'not-allowed' : 'pointer',
                transition: 'border-color 0.15s, background 0.15s',
                background: '#FAFAFA',
              }}
              onMouseEnter={e => {
                if (!uploading) {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.background  = '#F9FAFB';
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.background  = '#FAFAFA';
              }}
            >
              <span style={{ fontSize: '28px', display: 'block', marginBottom: '8px' }}>
                {uploading ? '⏳' : '📄'}
              </span>
              <p style={{ fontSize: '13.5px', fontWeight: '500', color: '#374151', margin: '0 0 4px' }}>
                {uploading ? 'Uploading...' : 'Click to upload your CV'}
              </p>
              <p style={{ fontSize: '12px', color: '#9CA3AF', margin: 0 }}>
                PDF only — max 5MB
              </p>
            </div>
          )}

          <input
            ref={fileRef}
            type="file"
            accept=".pdf"
            onChange={handleCVUpload}
            style={{ display: 'none' }}
          />

          {uploadError && (
            <p style={{ fontSize: '12px', color: '#EF4444', marginTop: '8px' }}>
              {uploadError}
            </p>
          )}

          {!form.cv_url && (
            <div style={{ marginTop: '14px' }}>
              <p style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '6px' }}>
                Or paste a public link instead:
              </p>
              <Input
                value={form.cv_url}
                onChange={v => upd('cv_url', v)}
                placeholder="https://drive.google.com/your-cv.pdf"
              />
            </div>
          )}
        </div>

        {/* ── Save ── */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '8px' }}>
          <Button type="submit" loading={saving}>
            Save Changes
          </Button>
        </div>
      </div>
    </form>
  );
}

function SectionTitle({ title }) {
  return (
    <h3 style={{ fontSize: '13.5px', fontWeight: '600', color: '#0F0F0F', marginBottom: '4px' }}>
      {title}
    </h3>
  );
}