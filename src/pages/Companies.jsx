import { useState, useEffect } from 'react';
import api from '../lib/api';
import PageHeader from '../components/layout/PageHeader';
import CompanyTable from '../components/companies/CompanyTable';
import CompanyFilters from '../components/companies/CompanyFilters';
import CompanyForm from '../components/companies/CompanyForm';
import CSVImport from '../components/companies/CSVImport';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';

const defaultFilters = { search: '', status: '', industry: '' };

export default function Companies() {
  const [companies, setCompanies]   = useState([]);
  const [loading, setLoading]       = useState(true);
  const [filters, setFilters]       = useState(defaultFilters);
  const [showAdd, setShowAdd]       = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [editItem, setEditItem]     = useState(null);
  const [blacklisting, setBlacklisting] = useState(null);
  const [error, setError]           = useState('');

  useEffect(() => { fetchCompanies(); }, []);

  const fetchCompanies = async () => {
    try {
      const res = await api.get('/api/companies');
      setCompanies(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (form) => {
    setError('');
    try {
      const res = await api.post('/api/companies', form);
      setCompanies(p => [res.data, ...p]);
      setShowAdd(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add company');
    }
  };

  const handleEdit = async (form) => {
    setError('');
    try {
      const res = await api.put(`/api/companies/${editItem.id}`, form);
      setCompanies(p => p.map(c => c.id === editItem.id ? res.data : c));
      setEditItem(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update company');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this company?')) return;
    try {
      await api.delete(`/api/companies/${id}`);
      setCompanies(p => p.filter(c => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleBlacklist = async (company) => {
    setBlacklisting(company.id);
    try {
      const res = await api.patch(`/api/companies/${company.id}/blacklist`, {
        blacklisted: !company.blacklisted,
      });
      setCompanies(p => p.map(c => c.id === company.id ? res.data : c));
    } catch (err) {
      console.error(err);
    } finally {
      setBlacklisting(null);
    }
  };

  const handleImport = async (rows) => {
    try {
      const res = await api.post('/api/companies/import', { companies: rows });
      await fetchCompanies();
      setShowImport(false);
      alert(`Imported: ${res.data.imported}, Skipped: ${res.data.skipped}`);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = companies.filter(c => {
    const search = filters.search.toLowerCase();
    const matchSearch = !search ||
      c.name.toLowerCase().includes(search) ||
      c.employee_email.toLowerCase().includes(search) ||
      c.employee_name.toLowerCase().includes(search);
    const matchStatus   = !filters.status   || c.status === filters.status;
    const matchIndustry = !filters.industry || c.industry === filters.industry;
    return matchSearch && matchStatus && matchIndustry;
  });

  return (
    <div>
      <PageHeader
        title="Companies"
        subtitle={`${companies.length} companies in your list`}
        action={
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="ghost" onClick={() => setShowImport(true)}>Import CSV</Button>
            <Button onClick={() => setShowAdd(true)}>+ Add Company</Button>
          </div>
        }
      />

      {/* Filters */}
      <div style={{ marginBottom: '20px' }}>
        <CompanyFilters
          filters={filters}
          onChange={setFilters}
          onReset={() => setFilters(defaultFilters)}
        />
      </div>

      {/* Table */}
      <CompanyTable
        companies={filtered}
        loading={loading}
        onEdit={setEditItem}
        onDelete={handleDelete}
        onToggleBlacklist={handleToggleBlacklist}
        blacklisting={blacklisting}
      />

      {/* Add Modal */}
      <Modal open={showAdd} onClose={() => { setShowAdd(false); setError(''); }} title="Add Company">
        {error && (
          <div style={{ padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', background: '#FEF2F2', border: '1px solid #FECACA', fontSize: '13px', color: '#DC2626' }}>
            {error}
          </div>
        )}
        <CompanyForm onSave={handleAdd} onClose={() => { setShowAdd(false); setError(''); }} />
      </Modal>

      {/* Edit Modal */}
      <Modal open={!!editItem} onClose={() => { setEditItem(null); setError(''); }} title="Edit Company">
        {error && (
          <div style={{ padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', background: '#FEF2F2', border: '1px solid #FECACA', fontSize: '13px', color: '#DC2626' }}>
            {error}
          </div>
        )}
        <CompanyForm onSave={handleEdit} onClose={() => { setEditItem(null); setError(''); }} initial={editItem} />
      </Modal>

      {/* Import Modal */}
      <Modal open={showImport} onClose={() => setShowImport(false)} title="Import Companies from CSV" width="640px">
        <CSVImport onImport={handleImport} />
      </Modal>
    </div>
  );
}