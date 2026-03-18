import { useState, useRef, useEffect } from 'react';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Select from '../ui/Select';
import Button from '../ui/Button';
import VariableInserter from './VariableInserter';
import CVAttachment from './CVAttachment';

const INDUSTRY_OPTIONS = [
  { value: '',           label: 'All Industries (default)' },
  { value: 'Tech',       label: 'Tech'       },
  { value: 'Fintech',    label: 'Fintech'    },
  { value: 'Agency',     label: 'Agency'     },
  { value: 'Startup',    label: 'Startup'    },
  { value: 'Design',     label: 'Design'     },
  { value: 'Finance',    label: 'Finance'    },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'E-commerce', label: 'E-commerce' },
  { value: 'Education',  label: 'Education'  },
  { value: 'Media',      label: 'Media'      },
  { value: 'Other',      label: 'Other'      },
];

const defaultForm = {
  name:           '',
  subject:        '',
  body:           '',
  industry:       '',
  is_followup:    false,
  custom_cv_url:  '',
};

export default function TemplateEditor({ onSave, onClose, initial, profileCvUrl }) {
  const [form, setForm]     = useState(defaultForm);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeField, setActiveField] = useState('body');
  const subjectRef          = useRef(null);
  const bodyRef             = useRef(null);

  useEffect(() => {
    if (initial) setForm({ ...defaultForm, ...initial });
  }, [initial]);

  const upd = (k, v) => {
    setForm(p => ({ ...p, [k]: v }));
    setErrors(p => ({ ...p, [k]: '' }));
  };

  const insertVariable = (variable) => {
    const ref = activeField === 'subject' ? subjectRef : bodyRef;
    if (!ref.current) return;

    const el    = ref.current;
    const start = el.selectionStart;
    const end   = el.selectionEnd;
    const field = activeField;
    const current = form[field];
    const newVal = current.substring(0, start) + variable + current.substring(end);

    upd(field, newVal);

    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + variable.length, start + variable.length);
    }, 0);
  };

  const validate = () => {
    const e = {};
    if (!form.name)    e.name    = 'Template name is required';
    if (!form.subject) e.subject = 'Subject line is required';
    if (!form.body)    e.body    = 'Email body is required';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e_ = validate();
    if (Object.keys(e_).length > 0) { setErrors(e_); return; }
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Template meta */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Input
          label="Template Name"
          value={form.name}
          onChange={v => upd('name', v)}
          placeholder="Tech Companies Template"
          required
          error={errors.name}
        />
        <Select
          label="Target Industry (optional)"
          value={form.industry}
          onChange={v => upd('industry', v)}
          options={INDUSTRY_OPTIONS}
        />
      </div>

      {/* Follow-up toggle */}
      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
        <input
          type="checkbox"
          checked={form.is_followup}
          onChange={e => upd('is_followup', e.target.checked)}
          style={{ width: '16px', height: '16px', accentColor: 'var(--accent)' }}
        />
        <span style={{ fontSize: '13.5px', color: '#374151' }}>
          This is a follow-up template
        </span>
      </label>

      {/* Variable inserter */}
      <div style={{ background: '#F9FAFB', borderRadius: '10px', border: '1px solid #E5E7EB', padding: '16px' }}>
        <VariableInserter onInsert={insertVariable} />
        <p style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '10px' }}>
          Click on a field below first, then click a variable to insert it at your cursor position.
          Empty variables are automatically removed before sending.
        </p>
      </div>

      {/* Subject */}
      <div>
        <label style={{ fontSize: '12.5px', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '5px' }}>
          Subject Line <span style={{ color: '#EF4444' }}>*</span>
        </label>
        <input
          ref={subjectRef}
          value={form.subject}
          onChange={e => upd('subject', e.target.value)}
          onFocus={() => setActiveField('subject')}
          placeholder="Collaboration Opportunity — {{your_role}} for {{company_name}}"
          style={{
            width: '100%', padding: '9px 12px', fontSize: '13.5px',
            border: `1px solid ${errors.subject ? '#FCA5A5' : '#E5E7EB'}`,
            borderRadius: '8px', outline: 'none', fontFamily: 'inherit',
            transition: 'border-color 0.15s',
          }}
          onBlur={e => e.target.style.borderColor = errors.subject ? '#FCA5A5' : '#E5E7EB'}
        />
        {errors.subject && <p style={{ fontSize: '12px', color: '#EF4444', marginTop: '4px' }}>{errors.subject}</p>}
      </div>

      {/* Body */}
      <div>
        <label style={{ fontSize: '12.5px', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '5px' }}>
          Email Body <span style={{ color: '#EF4444' }}>*</span>
        </label>
        <textarea
          ref={bodyRef}
          value={form.body}
          onChange={e => upd('body', e.target.value)}
          onFocus={() => setActiveField('body')}
          rows={12}
          placeholder={`Hi {{employee_name}},\n\nI came across {{company_name}} and was genuinely impressed by what you're building.\n\nI'm {{your_name}}, a {{your_role}} with experience in {{your_skills}}.\n\n{{your_bio}}\n\nPortfolio: {{portfolio}}\n\nWould you be open to a quick chat?\n\nBest,\n{{your_name}}`}
          style={{
            width: '100%', padding: '9px 12px', fontSize: '13.5px',
            border: `1px solid ${errors.body ? '#FCA5A5' : '#E5E7EB'}`,
            borderRadius: '8px', outline: 'none', fontFamily: 'inherit',
            lineHeight: '1.65', resize: 'vertical',
            transition: 'border-color 0.15s',
          }}
          onBlur={e => e.target.style.borderColor = errors.body ? '#FCA5A5' : '#E5E7EB'}
        />
        {errors.body && <p style={{ fontSize: '12px', color: '#EF4444', marginTop: '4px' }}>{errors.body}</p>}
      </div>

      {/* CV Attachment */}
      <CVAttachment
        value={form.custom_cv_url}
        onChange={v => upd('custom_cv_url', v)}
        profileCvUrl={profileCvUrl}
      />

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <Button variant="ghost" onClick={onClose} type="button">Cancel</Button>
        <Button type="submit" loading={saving}>
          {initial ? 'Save Changes' : 'Create Template'}
        </Button>
      </div>
    </form>
  );
}