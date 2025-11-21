// frontend/src/services/api.js

const API_BASE_URL = "http://127.0.0.1:8000"; // Django backend

// Generic helper to handle Django/DRF responses
async function handleResponse(res) {
  let data = null;
  try {
    data = await res.json();
  } catch (e) {
    // no JSON body
  }

  if (!res.ok) {
    const msg =
      data?.non_field_errors?.[0] || // DRF non-field error
      data?.detail ||                // DRF generic detail
      data?.error ||                 // custom error field
      "Request failed. Please try again.";
    throw new Error(msg);
  }

  return data;
}

// LOGIN
export async function apiLogin(email, password) {
  const res = await fetch(`${API_BASE_URL}/api/accounts/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(res); // { message, user: {...} }
}

// REGISTER
export async function apiRegister(payload) {
  const res = await fetch(`${API_BASE_URL}/api/accounts/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res); // { message, user: {...} }
}