export async function api(url: string, options: RequestInit = {}) {
  const tenantId = localStorage.getItem('activeTenantId')
  const headers = {
    'Content-Type': 'application/json',
    ...(tenantId ? { 'x-tenant-id': tenantId } : {}),
    ...options.headers,
  }

  const response = await fetch(url, { ...options, headers })
  if (!response.ok) {
    throw new Error('API Error')
  }
  return response.json()
}

const API_URL = 'http://localhost:5001'

function getAuthHeaders() {
  return { Authorization: `Bearer ${localStorage.getItem('token')}` }
}

export const authApi = {
  login: (data: { email: string; password: string }) =>
    api(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
  register: (data: { email: string; password: string }) =>
    api(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
  me: () =>
    api(`${API_URL}/auth/me`, {
      method: 'POST',
      headers: getAuthHeaders(),
    }),
}

export const taskApi = {
  getAll: () => api(`${API_URL}/tasks`, { headers: getAuthHeaders() }),
  create: (data: { title: string; description?: string }) =>
    api(`${API_URL}/tasks`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }),
  update: (
    id: string,
    data: { title?: string; description?: string; status?: string },
  ) =>
    api(`${API_URL}/tasks/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    api(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    }),
}

export const tenantApi = {
  getMembers: (tenantId: string) =>
    api(`${API_URL}/tenants/${tenantId}/members`, {
      headers: getAuthHeaders(),
    }),
  inviteMember: (tenantId: string, email: string) =>
    api(`${API_URL}/tenants/${tenantId}/invite`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ email }),
    }),
}
