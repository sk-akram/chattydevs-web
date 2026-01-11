
import { Project, User } from './types';

const API_BASE = 'https://api.skakram1110.workers.dev';

const getHeaders = () => {
  const apiKey = localStorage.getItem('chattydevs_api_key');
  return {
    'Authorization': apiKey ? `Bearer ${apiKey}` : '',
    'Content-Type': 'application/json',
  };
};

export const api = {
  async signup(email: string): Promise<User> {
    const res = await fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) throw new Error('Failed to create account');
    const data = await res.json();
    return { ...data, email };
  },

  async listProjects(): Promise<{ projects: Project[] }> {
    const res = await fetch(`${API_BASE}/projects`, {
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
  },

  async createProject(domain: string): Promise<Project> {
    const res = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ domain }),
    });
    if (!res.ok) throw new Error('Failed to create project');
    return res.json();
  },

  async getProject(id: string): Promise<{ project: Project }> {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch project');
    return res.json();
  },

  async uploadFile(projectId: string, file: File): Promise<void> {
    const formData = new FormData();
    formData.append('project_id', projectId);
    formData.append('file', file);

    const headers = getHeaders();
    delete (headers as any)['Content-Type']; // Let browser set boundary

    const res = await fetch(`${API_BASE}/projects/upload`, {
      method: 'POST',
      headers: headers,
      body: formData,
    });
    if (!res.ok) throw new Error('File upload failed');
  },

  async ingestWebsite(projectId: string, start_url: string, max_pages: number): Promise<void> {
    const res = await fetch(`${API_BASE}/projects/ingest`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ project_id: projectId, start_url, max_pages }),
    });
    if (!res.ok) throw new Error('Ingestion failed');
  },

  async sendMessage(projectId: string, message: string): Promise<{ reply: string }> {
    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ project_id: projectId, message }),
    });
    if (!res.ok) throw new Error('Chat failed');
    return res.json();
  }
};
