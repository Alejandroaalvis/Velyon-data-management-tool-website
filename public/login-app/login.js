// login.js
document.addEventListener('DOMContentLoaded', function () {
  console.log("login.js is running ✓");

  const form = document.querySelector('form');
  
  if (!form) {
    console.error("No <form> element found on this page");
    return;
  }

  console.log("Form found ✓ – attaching submit listener");

  form.addEventListener('submit', async function (event) {
    event.preventDefault(); // ← VERY IMPORTANT – stops page reload

    // Try to find fields – multiple possible selectors
    const emailInput = document.querySelector('input[type="email"], input[name="email"], #email');
    const passwordInput = document.querySelector('input[type="password"], input[name="password"], #password');

    if (!emailInput || !passwordInput) {
      alert("Email or password field not found");
      console.error("Could not find email/password inputs");
      return;
    }

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    console.log("Attempting login with:", { email, password: "••••••" });

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      console.log("Server answered with status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Error ${response.status}`);
      }

      const data = await response.json();
      console.log("Success response:", data);

      alert("Login successful!");
      // Change this line to where you actually want to go
      window.location.href = "/dashboard.html";   // or "/" or "/home.html" or "/app"

    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed: " + err.message);
    }
  });
});