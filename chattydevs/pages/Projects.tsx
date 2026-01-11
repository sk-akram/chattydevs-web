
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/Layout';
import { Card, Button, Input, LoadingState, EmptyState, Badge } from '../components/UI';
import { api } from '../api';
import { Project } from '../types';

export const ProjectsList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await api.listProjects();
      setProjects(data.projects || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <DashboardLayout><LoadingState /></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Your Projects</h1>
            <p className="text-slate-400">Manage your chatbot instances and their data sources.</p>
          </div>
          <Button onClick={() => navigate('/dashboard/projects/new')}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Project
          </Button>
        </header>

        {projects.length === 0 ? (
          <EmptyState 
            title="No projects yet" 
            description="Create your first project to start training your custom chatbot." 
            action={<Button onClick={() => navigate('/dashboard/projects/new')}>Get Started</Button>}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Card 
                key={project.id} 
                className="group relative overflow-hidden"
                onClick={() => navigate(`/dashboard/projects/${project.id}`)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                      {project.domain.replace('https://', '').replace('http://', '').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold group-hover:text-indigo-400 transition-colors">{project.domain}</h3>
                      <p className="text-sm text-slate-500">ID: {project.id}</p>
                    </div>
                  </div>
                  <Badge color="indigo">v1.0</Badge>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-slate-500 text-sm">
                  <span>Created {new Date(project.created_at).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1 group-hover:text-white transition-colors">
                    Manage Project 
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export const CreateProject: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.createProject(domain);
      // Fixed: Change response.project_id to response.id to match Project type interface
      navigate(`/dashboard/projects/${response.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto py-12">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Create New Project</h1>
          <p className="text-slate-400">Start by defining the primary domain for your chatbot. You can add more data sources later.</p>
        </header>

        <Card className="p-8 shadow-xl bg-slate-900/60">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <Input 
              label="Domain or Application Name"
              placeholder="e.g., https://my-docs.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              required
              error={error || undefined}
              disabled={loading}
              autoFocus
            />
            <div className="p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-lg text-sm text-slate-400 flex gap-3">
              <svg className="w-6 h-6 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>This will be the default identifier for your bot. Use a domain to enable the website crawler effectively.</p>
            </div>
            <div className="flex items-center gap-3 pt-4">
              <Button variant="ghost" type="button" onClick={() => navigate('/dashboard/projects')} className="flex-1">Cancel</Button>
              <Button type="submit" isLoading={loading} className="flex-[2]">Create Project</Button>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};
