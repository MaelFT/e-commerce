const BASE = '/api/auth'

async function request(url, options = {}) {
  const token = localStorage.getItem('token')

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  })

  const data = await res.json()

  if (!res.ok) throw data

  return data
}

export const authApi = {
  register: (body) =>
    request(`${BASE}/register`, { method: 'POST', body: JSON.stringify(body) }),

  login: (body) =>
    request(`${BASE}/login`, { method: 'POST', body: JSON.stringify(body) }),

  logout: () =>
    request(`${BASE}/logout`, { method: 'POST' }),

  me: () =>
    request(`${BASE}/me`),
}
