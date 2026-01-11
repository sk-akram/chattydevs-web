import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/Layout';
import { Card, Button, Badge, LoadingState, Section } from '../components/UI';
import { api } from '../api';
import { Project } from '../types';

export const DashboardOverview: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
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
    fetchProjects();
  }, []);

  const stats = [
    { label: 'Active Projects', value: projects.length, change: '+12%', trend: 'up' },
    { label: 'Conversations', value: '4,892', change: '+24%', trend: 'up' },
    { label: 'Ingestion Usage', value: '62%', change: '-2%', trend: 'down' },
  ];

  if (loading) return <DashboardLayout><LoadingState message="Fetching your workspace..." /></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Workspace Overview</h1>
          <p className="text-slate-500 text-lg">Manage your custom AI models and monitor their performance.</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-3xl -z-10 group-hover:bg-indigo-500/10 transition-colors"></div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">{stat.label}</p>
              <div className="flex items-end gap-3">
                <p className="text-4xl font-extrabold text-white tracking-tighter leading-none">{stat.value}</p>
                <div className={`flex items-center text-xs font-bold px-1.5 py-0.5 rounded ${stat.trend === 'up' ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-400 bg-slate-500/10'}`}>
                  {stat.change}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Projects Section */}
        <Section 
          title="Recent Projects" 
          description="Your most recently active chatbots and training models."
          action={<Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/projects')}>View all projects &rarr;</Button>}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 5).map((project) => (
              <Card 
                key={project.id} 
                className="hover:shadow-2xl hover:shadow-indigo-500/5 cursor-pointer"
                onClick={() => navigate(`/dashboard/projects/${project.id}`)}
              >
                <div className="flex flex-col gap-6">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xl">
                      {project.domain.replace(/https?:\/\//, '').charAt(0).toUpperCase()}
                    </div>
                    <Badge color="green">Healthy</Badge>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white truncate mb-1">{project.domain}</h3>
                    <p className="text-xs text-slate-500">Created {new Date(project.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                    <span className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                      12 Docs
                    </span>
                    <span className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                      v1.2.4
                    </span>
                  </div>
                </div>
              </Card>
            ))}
            <Card 
              className="border-dashed border-2 border-slate-800 flex flex-col items-center justify-center text-slate-500 hover:text-indigo-400 hover:border-indigo-500/40 bg-transparent"
              onClick={() => navigate('/dashboard/projects/new')}
            >
              <div className="w-12 h-12 rounded-full border border-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-indigo-500/50 transition-all">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <p className="font-bold">Create New Bot</p>
              <p className="text-xs mt-1">Start training on new data</p>
            </Card>
          </div>
        </Section>

        {/* Integration Callout */}
        <Card className="mt-8 bg-indigo-600 border-none p-10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 skew-x-[-20deg] translate-x-1/2 group-hover:translate-x-[40%] transition-transform duration-700"></div>
          <div className="relative z-10 max-w-lg">
            <h3 className="text-2xl font-bold text-white mb-3">Add ChattyDevs to your site in minutes</h3>
            <p className="text-indigo-100 mb-8 leading-relaxed opacity-90">Our drop-in widget works with React, Vue, WordPress, and simple HTML. Give your users the power of AI-driven support instantly.</p>
            <div className="flex gap-4">
              <Button variant="white" onClick={() => navigate('/docs')}>View Integration Guide</Button>
              <Button variant="secondary" className="bg-indigo-700 border-indigo-500 hover:bg-indigo-800">Copy Widget Code</Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};
