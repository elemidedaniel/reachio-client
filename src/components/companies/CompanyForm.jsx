import { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';

const INDUSTRY_OPTIONS = [
  { value: 'Tech',          label: 'Tech'          },
  { value: 'Fintech',       label: 'Fintech'       },
  { value: 'Agency',        label: 'Agency'        },
  { value: 'Startup',       label: 'Startup'       },
  { value: 'Design',        label: 'Design'        },
  { value: 'Finance',       label: 'Finance'       },
  { value: 'Healthcare',    label: 'Healthcare'    },
  { value: 'E-commerce',    label: 'E-commerce'    },
  { value: 'Education',     label: 'Education'     },
  { value: 'Media',         label: 'Media'         },
  { value: 'Consulting',    label: 'Consulting'    },
  { value: 'Real Estate',   label: 'Real Estate'   },
  { value: 'Other',         label: 'Other'         },
];

const defaultForm = {
  name:          '',
  industry:      '',
  website:       '',
  employee_name: '',
  employee_email:'',
  employee_role: '',
  notes:         '',
};

export default function CompanyForm({ onSave, onClose, initial }) {
  const [form, setForm]   = useState(defaultForm);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initial) setForm({ ...defaultForm, ...initial });
  }, [initial]);

  const upd = (k, v) => {
    setForm(p => ({ ...p, [k]: v }));
    setErrors(p => ({ ...p, [k]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name)           e.name           = 'Company name is required';
    if (!form.employee_name)  e.employee_name  = 'Employee name is required';
    if (!form.employee_email) e.employee_email = 'Employee email is required';
    if (form.employee_email && !/\S+@\S+\.\S+/.test(form.employee_email)) {
      e.employee_email = 'Invalid email address';
    }
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
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Input
          label="Company Name"
          value={form.name}
          onChange={v => upd('name', v)}
          placeholder="Acme Inc"
          required
          error={errors.name}
        />
        <Select
          label="Industry"
          value={form.industry}
          onChange={v => upd('industry', v)}
          options={INDUSTRY_OPTIONS}
          placeholder="Select industry"
        />
      </div>

      <Input
        label="Company Website (optional)"
        value={form.website}
        onChange={v => upd('website', v)}
        placeholder="https://acme.com"
      />

      <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '16px' }}>
        <p style={{ fontSize: '12.5px', fontWeight: '500', color: '#374151', marginBottom: '14px' }}>
          Contact Person
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Input
            label="Full Name"
            value={form.employee_name}
            onChange={v => upd('employee_name', v)}
            placeholder="John Smith"
            required
            error={errors.employee_name}
          />
          <Input
            label="Email"
            type="email"
            value={form.employee_email}
            onChange={v => upd('employee_email', v)}
            placeholder="john@acme.com"
            required
            error={errors.employee_email}
          />
          <Input
            label="Role / Title (optional)"
            value={form.employee_role}
            onChange={v => upd('employee_role', v)}
            placeholder="CTO"
          />
        </div>
      </div>

      <Textarea
        label="Notes (optional)"
        value={form.notes}
        onChange={v => upd('notes', v)}
        placeholder="Any context about this company or contact..."
        rows={3}
      />

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingTop: '8px' }}>
        <Button variant="ghost" onClick={onClose} type="button">Cancel</Button>
        <Button type="submit" loading={saving}>
          {initial ? 'Save Changes' : 'Add Company'}
        </Button>
      </div>
    </form>
  );
}