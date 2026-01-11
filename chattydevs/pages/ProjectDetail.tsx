import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/Layout';
import { Card, Button, Input, LoadingState, Badge, EmptyState, Section } from '../components/UI';
import { api } from '../api';
import { Project, ChatMessage } from '../types';

export const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'sources' | 'chat' | 'embed'>('sources');

  useEffect(() => {
    const fetchDetail = async () => {
      if (!projectId) return;
      try {
        const data = await api.getProject(projectId);
        setProject(data.project);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [projectId]);

  if (loading) return <DashboardLayout><LoadingState message="Connecting to project..." /></DashboardLayout>;
  if (!project) return (
    <DashboardLayout>
      <EmptyState 
        title="Project not found" 
        description="This project may have been moved or deleted. Please check your dashboard."
        action={<Button onClick={() => navigate('/dashboard/projects')}>Return to Dashboard</Button>}
      />
    </DashboardLayout>
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        {/* Header Block */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl font-extrabold shadow-2xl shadow-indigo-600/30">
              {project.domain.replace(/https?:\/\//, '').charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-bold tracking-tight text-white">{project.domain}</h1>
                <Badge color="green">Deployment Active</Badge>
              </div>
              <div className="flex items-center gap-4 text-slate-500 text-sm">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Created {new Date(project.created_at).toLocaleDateString()}
                </span>
                <span className="font-mono text-[10px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  ID: {project.id}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/projects')}>
              Back
            </Button>
            <Button variant="danger" size="sm">
              Settings
            </Button>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 bg-slate-900/40 p-1 rounded-xl w-fit self-center md:self-start">
          {[
            { id: 'sources', label: 'Knowledge Base', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
            { id: 'chat', label: 'Model Playground', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
            { id: 'embed', label: 'Integrations', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2.5 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
              </svg>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Panels */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          {activeTab === 'sources' && <SourceManagement projectId={project.id} initialUrl={project.domain} />}
          {activeTab === 'chat' && <ChatTester projectId={project.id} />}
          {activeTab === 'embed' && <EmbeddingSnippet projectId={project.id} />}
        </div>
      </div>
    </DashboardLayout>
  );
};

const SourceManagement: React.FC<{ projectId: string, initialUrl: string }> = ({ projectId, initialUrl }) => {
  const [crawlUrl, setCrawlUrl] = useState(initialUrl);
  const [maxPages, setMaxPages] = useState(10);
  const [crawling, setCrawling] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notif, setNotif] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCrawl = async () => {
    setCrawling(true);
    setNotif(null);
    try {
      await api.ingestWebsite(projectId, crawlUrl, maxPages);
      setNotif({ text: 'Crawling task scheduled. Monitoring domain...', type: 'success' });
    } catch (err) {
      setNotif({ text: 'Failed to start ingestion engine.', type: 'error' });
    } finally {
      setCrawling(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setNotif(null);
    try {
      await api.uploadFile(projectId, file);
      setNotif({ text: `"${file.name}" uploaded successfully!`, type: 'success' });
    } catch (err) {
      setNotif({ text: 'File upload failed. Check format and size.', type: 'error' });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* File Ingestion */}
      <div className="flex flex-col gap-6">
        <header>
          <h3 className="text-xl font-bold text-white mb-2">Document Ingestion</h3>
          <p className="text-slate-500 text-sm">Upload static files to train your model on specific documentation or data sets.</p>
        </header>
        
        <Card className="flex flex-col gap-6 items-center justify-center border-dashed border-2 py-12 bg-slate-900/20 hover:bg-slate-900/40 transition-colors cursor-pointer group" onClick={() => fileInputRef.current?.click()}>
          <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500 group-hover:text-indigo-400 group-hover:scale-110 transition-all">
            {uploading ? (
              <svg className="animate-spin h-8 w-8 text-indigo-500" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            )}
          </div>
          <div className="text-center">
            <p className="font-bold text-white mb-1">{uploading ? 'Processing File...' : 'Click to Upload'}</p>
            <p className="text-slate-500 text-xs">PDF, CSV, or TXT up to 10MB</p>
          </div>
          <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.csv,.txt" />
        </Card>
      </div>

      {/* Website Crawler */}
      <div className="flex flex-col gap-6">
        <header>
          <h3 className="text-xl font-bold text-white mb-2">Automated Web Crawler</h3>
          <p className="text-slate-500 text-sm">Synchronize your chatbot with your live website content and technical documentation.</p>
        </header>

        <Card className="p-8 space-y-6">
          <Input 
            label="Root Ingestion URL" 
            placeholder="https://docs.yoursite.com" 
            value={crawlUrl}
            onChange={e => setCrawlUrl(e.target.value)}
            hint="The crawler will follow subpages from this URL."
          />
          <div className="grid grid-cols-2 gap-4">
             <Input 
              label="Page Limit" 
              type="number" 
              value={maxPages}
              onChange={e => setMaxPages(parseInt(e.target.value))}
              min={1} max={1000}
            />
             <div className="flex items-end">
               <Button onClick={handleCrawl} isLoading={crawling} className="w-full h-[46px]">Run Crawler</Button>
             </div>
          </div>
        </Card>
      </div>

      {notif && (
        <div className={`col-span-full p-4 rounded-xl flex items-center gap-3 animate-in fade-in zoom-in duration-300 ${notif.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
          <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 border border-current opacity-50 text-[10px] font-bold">!</div>
          <p className="text-sm font-medium">{notif.text}</p>
        </div>
      )}
    </div>
  );
};

const ChatTester: React.FC<{ projectId: string }> = ({ projectId }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const response = await api.sendMessage(projectId, userMsg);
      setMessages(prev => [...prev, { role: 'bot', content: response.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', content: 'Network disruption. Please try testing again shortly.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto h-[650px] flex flex-col p-0 border-slate-800 shadow-3xl bg-slate-950 overflow-hidden">
      <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">AI</div>
          <div>
            <h4 className="text-sm font-bold text-white">Model Playground</h4>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider">Live & Active</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setMessages([])}>Reset Session</Button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-950/20">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center px-12 opacity-60">
            <svg className="w-16 h-16 text-slate-800 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h4 className="text-lg font-bold text-white mb-2">Test Knowledge Base</h4>
            <p className="text-sm text-slate-500 max-w-xs">Ask questions to verify if the model has successfully ingested your latest documents and crawl data.</p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-1`}>
            <div className={`max-w-[85%] px-5 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none'}`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start animate-in fade-in duration-300">
            <div className="bg-slate-800 border border-slate-700 px-5 py-3 rounded-2xl rounded-tl-none">
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="p-5 bg-slate-900/50 border-t border-slate-800">
        <div className="relative group">
          <input 
            type="text"
            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-5 py-4 text-slate-200 outline-none pr-14 transition-all placeholder:text-slate-700 focus:ring-4 focus:ring-indigo-500/10"
            placeholder="Type your query..."
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={loading}
          />
          <button 
            type="submit" 
            disabled={!input.trim() || loading}
            className="absolute right-3 top-3 w-10 h-10 flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white rounded-lg transition-all shadow-lg active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-600 mt-4 uppercase tracking-[0.2em] font-bold">
          Verified Enterprise Grade Deployment
        </p>
      </form>
    </Card>
  );
};

const EmbeddingSnippet: React.FC<{ projectId: string }> = ({ projectId }) => {
  const [copied, setCopied] = useState(false);
  const snippet = `<script 
  src="https://cdn.chattydevs.com/v1/widget.js" 
  data-project-id="${projectId}"
  defer
></script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-10">
      <Section title="Standard Embedding" description="Paste this snippet inside your <head> or at the bottom of your <body> tag to activate the chatbot on your site.">
        <div className="relative group max-w-4xl">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative flex flex-col bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
            <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
               <div className="flex items-center gap-2">
                 <div className="flex gap-1">
                   <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                   <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20"></div>
                   <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20"></div>
                 </div>
                 <span className="text-xs font-mono text-slate-500">widget-embed.html</span>
               </div>
               <Button variant="ghost" size="sm" onClick={copyToClipboard} className="text-[10px] h-7">
                  {copied ? 'Copied' : 'Copy Code'}
               </Button>
            </div>
            <pre className="p-6 text-indigo-300 font-mono text-sm leading-relaxed overflow-x-auto">
              {snippet}
            </pre>
          </div>
        </div>
      </Section>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'React Component', icon: 'M13 10V3L4 14h7v7l9-11h-7z', desc: 'Use our npm package for deeper React integration.' },
          { name: 'WP Plugin', icon: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8', desc: 'Official WordPress plugin for no-code setup.' },
          { name: 'Webhooks', icon: 'M8 9l3 3-3 3m5 0h3', desc: 'Notify your CRM of new leads from chat.' },
        ].map(platform => (
          <Card key={platform.name} className="flex flex-col gap-4">
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-indigo-400">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={platform.icon} />
               </svg>
            </div>
            <h4 className="font-bold text-white">{platform.name}</h4>
            <p className="text-xs text-slate-500 leading-relaxed">{platform.desc}</p>
            <Button variant="outline" size="sm" className="w-fit mt-2">Get Started &rarr;</Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
