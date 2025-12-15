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
