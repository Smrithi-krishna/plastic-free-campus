const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || 'An unexpected API error occurred.');
  }
  return response.json();
}

export async function apiGet(endpoint) {
  const token = localStorage.getItem('pfc_token');
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });
  return handleResponse(response);
}

export async function apiPost(endpoint, data) {
  const token = localStorage.getItem('pfc_token');
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(data)
  });
  return handleResponse(response);
}