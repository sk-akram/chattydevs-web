const API_BASE = "https://api.skakram1110.workers.dev";

function getHeaders() {
  const apiKey = typeof window !== "undefined" ? localStorage.getItem("chattydevs_api_key") : null;
  return {
    Authorization: apiKey ? `Bearer ${apiKey}` : "",
    "Content-Type": "application/json",
  } as Record<string, string>;
}

export const api = {
  async signup(email: string): Promise<{ api_key: string }> {
    const res = await fetch(`${API_BASE}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Failed to create account");
    return data;
  },

  async listProjects(): Promise<{ projects: Array<{ id: string; domain: string; created_at: string }> }> {
    const res = await fetch(`${API_BASE}/projects`, { headers: getHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Failed to fetch projects");
    return data;
  },

  async createProject(domain: string): Promise<{ project_id?: string; id?: string }> {
    const res = await fetch(`${API_BASE}/projects`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ domain }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Failed to create project");
    return data;
  },

  async getProject(id: string): Promise<{ project: { id: string; domain: string; created_at: string } }> {
    const res = await fetch(`${API_BASE}/projects/${id}`, { headers: getHeaders(), cache: "no-store" });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Failed to fetch project");
    return data;
  },

  async uploadFile(projectId: string, file: File): Promise<{ filename?: string; chunks_indexed?: number }> {
    const formData = new FormData();
    formData.append("project_id", projectId);
    formData.append("file", file);

    const headers = getHeaders();
    delete headers["Content-Type"];

    const res = await fetch(`${API_BASE}/projects/upload`, {
      method: "POST",
      headers,
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "File upload failed");
    return data;
  },

  async ingestWebsite(projectId: string, start_url: string, max_pages = 10): Promise<unknown> {
    const res = await fetch(`${API_BASE}/projects/ingest`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ project_id: projectId, start_url, max_pages }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Ingestion failed");
    return data;
  },

  async sendMessage(projectId: string, message: string): Promise<{ reply: string }> {
    const res = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ project_id: projectId, message }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Chat failed");
    return data;
  },
};
