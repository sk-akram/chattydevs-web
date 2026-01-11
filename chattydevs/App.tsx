import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import { Auth } from './pages/Auth';
import { DashboardOverview } from './pages/Dashboard';
import { ProjectsList, CreateProject } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { Pricing } from './pages/Pricing';
import { Docs } from './pages/Docs';
import { DashboardLayout } from './components/Layout';
import { LoadingState } from './components/UI';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const apiKey = localStorage.getItem('chattydevs_api_key');
  if (!apiKey) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

// Placeholder components for secondary pages
const ComingSoon: React.FC<{ title: string }> = ({ title }) => (
  <DashboardLayout>
    <div className="flex flex-col items-center justify-center py-40">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-slate-500">This feature is currently under active development.</p>
    </div>
  </DashboardLayout>
);

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Auth type="signup" />} />
        <Route path="/login" element={<Auth type="login" />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/docs" element={<Docs />} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <DashboardOverview />
          </PrivateRoute>
        } />
        <Route path="/dashboard/projects" element={
          <PrivateRoute>
            <ProjectsList />
          </PrivateRoute>
        } />
        <Route path="/dashboard/projects/new" element={
          <PrivateRoute>
            <CreateProject />
          </PrivateRoute>
        } />
        <Route path="/dashboard/projects/:projectId" element={
          <PrivateRoute>
            <ProjectDetail />
          </PrivateRoute>
        } />
        <Route path="/dashboard/usage" element={
          <PrivateRoute>
            <ComingSoon title="Analytics & Usage" />
          </PrivateRoute>
        } />
        <Route path="/dashboard/settings" element={
          <PrivateRoute>
            <ComingSoon title="Workspace Settings" />
          </PrivateRoute>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
