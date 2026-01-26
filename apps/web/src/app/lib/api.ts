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

  async me(): Promise<{
    user: { id: string };
    product: { id: string; slug: string; name: string };
    subscription: {
      id: string;
      user_id: string;
      product_id: string;
      plan_id: string;
      status: string;
      started_at: string;
      current_period_start: string;
      current_period_end: string;
    } | null;
    plan: {
      id: string;
      product_id: string;
      slug: string;
      name: string;
      price_inr: number;
      message_limit_monthly: number | null;
      training_limit_lifetime: number | null;
      project_limit: number | null;
      crawl_max_pages: number | null;
      upload_mb_total: number | null;
      branding_powered_by_chattydevs: number;
    } | null;
    usage: {
      id: string;
      user_id: string;
      product_id: string;
      period_start: string;
      period_end: string;
      message_count: number;
    } | null;
    stats: {
      id: string;
      user_id: string;
      product_id: string;
      trainings_used: number;
      upload_bytes_used: number;
      documents_uploaded: number;
      pages_crawled: number;
      last_training_at: string | null;
    } | null;
  }> {
    const res = await fetch(`${API_BASE}/me`, { headers: getHeaders(), cache: "no-store" });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Failed to fetch account");
    return data;
  },

  async listProducts(): Promise<{ products: Array<{ id: string; slug: string; name: string; created_at: string }> }> {
    const res = await fetch(`${API_BASE}/catalog/products`, { headers: getHeaders(), cache: "no-store" });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Failed to fetch products");
    return data;
  },

  async listPlans(productSlug: string): Promise<{
    product: { id: string; slug: string; name: string };
    plans: Array<{
      id: string;
      product_id: string;
      slug: string;
      name: string;
      price_inr: number;
      message_limit_monthly: number | null;
      training_limit_lifetime: number | null;
      project_limit: number | null;
      crawl_max_pages: number | null;
      upload_mb_total: number | null;
      branding_powered_by_chattydevs: number;
    }>;
  }> {
    const res = await fetch(`${API_BASE}/catalog/products/${productSlug}/plans`, { headers: getHeaders(), cache: "no-store" });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Failed to fetch plans");
    return data;
  },

  async selectPlan(productSlug: string, planSlug: string): Promise<{ ok: true }> {
    const res = await fetch(`${API_BASE}/subscriptions/select`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ product_slug: productSlug, plan_slug: planSlug }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Failed to select plan");
    return data;
  },

  async listProjects(): Promise<{ projects: Array<{ id: string; domain: string; created_at: string }> }> {
    const res = await fetch(`${API_BASE}/projects`, { headers: getHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Failed to fetch projects");
    return data;
  },

  async createProject(name: string): Promise<{ project_id?: string; id?: string }> {
    const res = await fetch(`${API_BASE}/projects`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Failed to create project");
    return data;
  },

  async getProject(id: string): Promise<{
    project: {
      id: string;
      domain: string;
      created_at: string;
      allowed_sources?: string | null;
      admin_email?: string | null;
    };
  }> {
    const res = await fetch(`${API_BASE}/projects/${id}`, { headers: getHeaders(), cache: "no-store" });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Failed to fetch project");
    return data;
  },

  async updateProjectSettings(
    projectId: string,
    payload: { allowed_sources: string; admin_email: string }
  ): Promise<{ ok: true }> {
    const res = await fetch(`${API_BASE}/projects/${projectId}/settings`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Failed to update project settings");
    return data;
  },

  async deleteProject(projectId: string): Promise<{ ok: true; project_id: string }> {
    const res = await fetch(`${API_BASE}/projects/${projectId}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Failed to delete project");
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

  async getChatHistory(projectId: string, sessionId: string): Promise<{
    session_id: string;
    messages: Array<{ role: "user" | "bot"; content: string; created_at: string }>;
  }> {
    const res = await fetch(
      `${API_BASE}/chat/history?project_id=${encodeURIComponent(projectId)}&session_id=${encodeURIComponent(sessionId)}`,
      { headers: getHeaders() }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Failed to fetch chat history");
    return data;
  },

  async sendMessage(
    projectId: string,
    message: string,
    sessionId?: string
  ): Promise<{ reply: string; session_id?: string }> {
    const res = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ project_id: projectId, message, session_id: sessionId }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Chat failed");
    return data;
  },
};
