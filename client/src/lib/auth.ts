const API_URL = 'http://localhost:5001'

export function isAuthenticated(): boolean {
  const token = localStorage.getItem('token')
  return !!token
}

export async function getAuthUser() {
  const token = localStorage.getItem('token')
  if (!token) {
    return null
  }

  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      // Token is invalid
      logout()
      return null
    }

    return await response.json()
  } catch (error) {
    console.error('Failed to fetch user:', error)
    logout()
    return null
  }
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('activeTenantId')
}
