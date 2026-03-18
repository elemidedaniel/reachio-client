import Select from '../ui/Select';
import Input from '../ui/Input';
import Button from '../ui/Button';

const STATUS_OPTIONS = [
  { value: '',            label: 'All Statuses'  },
  { value: 'Pending',     label: 'Pending'       },
  { value: 'Sent',        label: 'Sent'          },
  { value: 'Opened',      label: 'Opened'        },
  { value: 'Replied',     label: 'Replied'       },
  { value: 'Followed Up', label: 'Followed Up'   },
  { value: 'Blacklisted', label: 'Blacklisted'   },
];

const INDUSTRY_OPTIONS = [
  { value: '',           label: 'All Industries' },
  { value: 'Tech',       label: 'Tech'           },
  { value: 'Fintech',    label: 'Fintech'        },
  { value: 'Agency',     label: 'Agency'         },
  { value: 'Startup',    label: 'Startup'        },
  { value: 'Design',     label: 'Design'         },
  { value: 'Finance',    label: 'Finance'        },
  { value: 'Healthcare', label: 'Healthcare'     },
  { value: 'E-commerce', label: 'E-commerce'     },
  { value: 'Education',  label: 'Education'      },
  { value: 'Media',      label: 'Media'          },
  { value: 'Other',      label: 'Other'          },
];

export default function CompanyFilters({ filters, onChange, onReset }) {
  const upd = (k, v) => onChange({ ...filters, [k]: v });

  return (
    <div style={{
      display: 'flex', gap: '10px', flexWrap: 'wrap',
      alignItems: 'flex-end',
    }}>
      <div style={{ flex: '1', minWidth: '180px' }}>
        <Input
          placeholder="Search by name or email..."
          value={filters.search}
          onChange={v => upd('search', v)}
        />
      </div>
      <div style={{ minWidth: '150px' }}>
        <Select
          value={filters.status}
          onChange={v => upd('status', v)}
          options={STATUS_OPTIONS}
          placeholder="All Statuses"
        />
      </div>
      <div style={{ minWidth: '150px' }}>
        <Select
          value={filters.industry}
          onChange={v => upd('industry', v)}
          options={INDUSTRY_OPTIONS}
          placeholder="All Industries"
        />
      </div>
      {(filters.search || filters.status || filters.industry) && (
        <Button variant="ghost" size="sm" onClick={onReset}>
          Clear
        </Button>
      )}
    </div>
  );
}