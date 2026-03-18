import { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function LinksForm({ profile, onSave, saving }) {
  const [form, setForm] = useState({
    portfolio_url: '',
    linkedin:      '',
    github:        '',
    twitter:       '',
    custom_links:  [],
  });

  useEffect(() => {
    if (profile) {
      setForm({
        portfolio_url: profile.portfolio_url || '',
        linkedin:      profile.linkedin || '',
        github:        profile.github || '',
        twitter:       profile.twitter || '',
        custom_links:  profile.custom_links || [],
      });
    }
  }, [profile]);

  const upd = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const addCustomLink = () => {
    setForm(p => ({
      ...p,
      custom_links: [...p.custom_links, { label: '', url: '' }],
    }));
  };

  const updateCustomLink = (i, field, value) => {
    setForm(p => ({
      ...p,
      custom_links: p.custom_links.map((l, idx) =>
        idx === i ? { ...l, [field]: value } : l
      ),
    }));
  };

  const removeCustomLink = (i) => {
    setForm(p => ({
      ...p,
      custom_links: p.custom_links.filter((_, idx) => idx !== i),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{
        background: '#fff', borderRadius: '12px',
        border: '1px solid #E5E7EB', padding: '24px',
        display: 'flex', flexDirection: 'column', gap: '20px',
      }}>
        <div>
          <h3 style={{ fontSize: '13.5px', fontWeight: '600', color: '#0F0F0F', marginBottom: '4px' }}>
            Social & Portfolio Links
          </h3>
          <p style={{ fontSize: '12px', color: '#9CA3AF' }}>
            All optional — only filled links will appear in your emails
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Input
            label="Portfolio URL"
            value={form.portfolio_url}
            onChange={v => upd('portfolio_url', v)}
            placeholder="https://yourportfolio.com"
            hint="{{portfolio}} in templates"
          />
          <Input
            label="LinkedIn"
            value={form.linkedin}
            onChange={v => upd('linkedin', v)}
            placeholder="linkedin.com/in/yourname"
            hint="{{linkedin}} in templates"
          />
          <Input
            label="GitHub"
            value={form.github}
            onChange={v => upd('github', v)}
            placeholder="github.com/yourname"
            hint="{{github}} in templates"
          />
          <Input
            label="Twitter / X"
            value={form.twitter}
            onChange={v => upd('twitter', v)}
            placeholder="twitter.com/yourname"
            hint="{{twitter}} in templates"
          />
        </div>

        {/* Custom links */}
        <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '13.5px', fontWeight: '600', color: '#0F0F0F' }}>
                Custom Links
              </h3>
              <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>
                Add any other relevant links
              </p>
            </div>
            <Button size="sm" variant="ghost" onClick={addCustomLink} type="button">
              + Add Link
            </Button>
          </div>

          {form.custom_links.length === 0 && (
            <p style={{ fontSize: '13px', color: '#9CA3AF', textAlign: 'center', padding: '20px 0' }}>
              No custom links added
            </p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {form.custom_links.map((link, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: '10px', alignItems: 'end' }}>
                <Input
                  label={i === 0 ? 'Label' : ''}
                  value={link.label}
                  onChange={v => updateCustomLink(i, 'label', v)}
                  placeholder="Behance"
                />
                <Input
                  label={i === 0 ? 'URL' : ''}
                  value={link.url}
                  onChange={v => updateCustomLink(i, 'url', v)}
                  placeholder="https://behance.net/yourname"
                />
                <button
                  type="button"
                  onClick={() => removeCustomLink(i)}
                  style={{
                    padding: '9px 12px', background: '#FEF2F2',
                    border: '1px solid #FECACA', borderRadius: '8px',
                    color: '#EF4444', cursor: 'pointer', fontSize: '13px',
                    fontFamily: 'inherit', marginBottom: '0',
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '8px' }}>
          <Button type="submit" loading={saving}>Save Links</Button>
        </div>
      </div>
    </form>
  );
}