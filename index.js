// === Session & User Storage ===
function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

function saveUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}

function setSession(username) {
  localStorage.setItem("session", username);
}

function getSession() {
  return localStorage.getItem("session");
}

function clearSession() {
  localStorage.removeItem("session");
}

let currentForm = "Login";

// === Entry Point ===
if (getSession()) {
  renderDashboard(getSession());
} else {
  setupAuthUI();
}

// === Login/Register UI ===
function setupAuthUI() {
  document.body.innerHTML = "";
  document.body.style = `
    margin: 0;
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f0f0;
  `;

  const container = document.createElement("div");
  container.style = `
    background: #fff;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    border-radius: 8px;
    min-width: 300px;
  `;
  document.body.appendChild(container);

  const nav = document.createElement("div");
  nav.innerHTML = `
    <button id="showLogin">Login</button>
    <button id="showRegister">Register</button>
  `;
  nav.style.marginBottom = "20px";
  container.appendChild(nav);

  const formWrapper = document.createElement("div");
  container.appendChild(formWrapper);

  function renderForm(type) {
    currentForm = type;
    formWrapper.innerHTML = "";
    const form = document.createElement("form");

    form.innerHTML = `
      <h2>${type}</h2>
      <input placeholder="Username" required style="display:block;width:100%;margin-bottom:10px;padding:8px;">
      <input type="password" placeholder="Password" required style="display:block;width:100%;margin-bottom:10px;padding:8px;">
      ${type === "Register" ? `<input type="email" placeholder="Email" required style="display:block;width:100%;margin-bottom:10px;padding:8px;">` : ""}
      <button type="submit" style="padding:10px;width:100%;">${type}</button>
    `;

    form.onsubmit = (e) => {
      e.preventDefault();
      const [usernameInput, passwordInput, emailInput] = form.querySelectorAll("input");
      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();
      const email = emailInput?.value.trim();
      const users = getUsers();

      if (currentForm === "Register") {
        if (users.some(u => u.username === username)) {
          alert("Username already exists.");
        } else {
          saveUser({ username, password, email });
          alert("Registration successful!");
          renderForm("Login");
        }
      }

      if (currentForm === "Login") {
        const matched = users.find(u => u.username === username && u.password === password);
        if (matched) {
          setSession(username);
          renderDashboard(username);
        } else {
          alert("Invalid username or password.");
        }
      }
    };

    formWrapper.appendChild(form);
  }

  renderForm(currentForm);

  document.getElementById("showLogin").onclick = () => renderForm("Login");
  document.getElementById("showRegister").onclick = () => renderForm("Register");
}

// === Dashboard ===
function renderDashboard(username) {
  document.body.innerHTML = "";
  document.body.style = `
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
  `;

  const nav = document.createElement("div");
  nav.style = `
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  `;
  document.body.appendChild(nav);

  const logo = document.createElement("img");
  logo.src = "Logo.png"; // Replace with your actual logo
  logo.alt = "Logo";
  logo.style.height = "40px";
  nav.appendChild(logo);

  const menuContainer = document.createElement("div");
  menuContainer.style.position = "relative";

  const menuBtn = document.createElement("img");
  menuBtn.src = "menu-icon.png"; // Replace with your actual icon
  menuBtn.alt = "Menu";
  menuBtn.style.height = "36px";
  menuBtn.style.cursor = "pointer";
  menuContainer.appendChild(menuBtn);

  const dropdown = document.createElement("div");
  dropdown.style = `
    position: absolute;
    top: 100%;
    right: 0;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    display: none;
    min-width: 120px;
    z-index: 10;
  `;
  dropdown.innerHTML = `
    <div style="padding: 10px; cursor: pointer;">View Profile</div>
    <div style="padding: 10px; cursor: pointer;">Logout</div>
  `;
  menuContainer.appendChild(dropdown);
  nav.appendChild(menuContainer);

  menuBtn.onclick = () => {
    dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
  };

  dropdown.onclick = (e) => {
    const action = e.target.innerText;
    if (action === "Logout") {
      clearSession();
      location.reload();
    } else if (action === "View Profile") {
      alert(`Profile for ${username} coming soon!`);
    }
  };

  const main = document.createElement("div");
  main.innerHTML = `<h1 style="padding: 20px;">Welcome, ${username}!</h1>`;
  document.body.appendChild(main);
}
