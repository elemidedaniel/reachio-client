import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AppLayout from './layouts/AppLayout';
import AuthLayout from './layouts/AuthLayout';
import LandingPage from './pages/LandingPages';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Dashboard from './pages/Dashboard';
import Companies from './pages/Companies';
import Templates from './pages/Templates';
import EmailLog from './pages/EmailLog';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import Profile from './pages/Profile';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div className="spinner" />
    </div>
  );
  return user ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return !user ? children : <Navigate to="/dashboard" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={
            <PublicRoute><Login /></PublicRoute>
          } />
          <Route path="/signup" element={
            <PublicRoute><Signup /></PublicRoute>
          } />
        </Route>

        {/* Protected app routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute><AppLayout /></ProtectedRoute>
        }>
          <Route index                    element={<Dashboard />}     />
          <Route path="companies"         element={<Companies />}     />
          <Route path="templates"         element={<Templates />}     />
          <Route path="email-log"         element={<EmailLog />}      />
          <Route path="notifications"     element={<Notifications />} />
          <Route path="settings"          element={<Settings />}      />
          <Route path="profile"           element={<Profile />}       />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}