import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';

export default function AppLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F9FAFB' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: '240px' }}>
        <Topbar />
        <main style={{ flex: 1, padding: '32px', maxWidth: '1200px', width: '100%' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}