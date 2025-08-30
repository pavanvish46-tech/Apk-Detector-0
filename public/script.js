const API = "/api";

async function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  document.getElementById("message").innerText = data.message || data.error;
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();

  if (data.success) {
    document.getElementById("message").innerText = "✅ Login successful!";
    localStorage.setItem("token", data.token);
  } else {
    document.getElementById("message").innerText = data.message || data.error;
  }
}
