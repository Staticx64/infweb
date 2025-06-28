let currentForm = "Login";
document.body.style.fontFamily = "Arial, sans-serif";
document.body.style.margin = "0";
document.body.style.display = "flex";
document.body.style.flexDirection = "column";
document.body.style.alignItems = "center";
document.body.style.justifyContent = "center";
document.body.style.height = "100vh";
document.body.style.backgroundColor = "#f0f0f0";

function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

function saveUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}

// Create container
const container = document.createElement("div");
container.style.background = "#fff";
container.style.padding = "20px";
container.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)";
container.style.borderRadius = "8px";
container.style.minWidth = "300px";
document.body.appendChild(container);

// Nav buttons
const nav = document.createElement("div");
nav.innerHTML = `
  <button id="showLogin">Login</button>
  <button id="showRegister">Register</button>
`;
nav.style.marginBottom = "20px";
container.appendChild(nav);

// Form wrapper
const formWrapper = document.createElement("div");
container.appendChild(formWrapper);

function renderForm(type) {
  formWrapper.innerHTML = "";
  const form = document.createElement("form");
  form.innerHTML = `
    <h2>${type}</h2>
    <input type="text" placeholder="Username" required style="display:block;width:100%;margin-bottom:10px;padding:8px;" />
    <input type="password" placeholder="Password" required style="display:block;width:100%;margin-bottom:10px;padding:8px;" />
    ${type === "Register"
      ? `<input type="email" placeholder="Email" required style="display:block;width:100%;margin-bottom:10px;padding:8px;" />`
      : ""}
    <button type="submit" style="padding:10px;width:100%;">${type}</button>
  `;
  form.onsubmit = (e) => {
  e.preventDefault();
form.onsubmit = (e) => {
  e.preventDefault();
  const username = form.querySelector('input[placeholder="Username"]').value;
  const password = form.querySelector('input[placeholder="Password"]').value;

  if (currentForm === "Login") {
    const users = getUsers();
    const matched = users.find(u => u.username === username && u.password === password);

    if (matched) {
      renderDashboard(matched.username); // pass username in
    } else {
      alert("Invalid credentials!");
    }

  } else if (currentForm === "Register") {
    const email = form.querySelector('input[placeholder="Email"]').value;
    const users = getUsers();
    const exists = users.some(u => u.username === username);

    if (exists) {
      alert("Username already taken.");
    } else {
      saveUser({ username, password, email });
      alert("Register successful!");
      currentForm = "Login";
      renderForm(currentForm);
    }
  }
};
  formWrapper.appendChild(form);
}

// Default view
renderForm("Login");

// Event listeners
document.getElementById("showLogin").onclick = () => {
  currentForm = "Login";
  renderForm(currentForm);
};

document.getElementById("showRegister").onclick = () => {
  currentForm = "Register";
  renderForm(currentForm);
};

// 🔥 DASHBOARD
function renderDashboard() {
  document.body.innerHTML = "";
  document.body.style.margin = "0";
  document.body.style.fontFamily = "Arial, sans-serif";
  document.body.style.backgroundColor = "#f5f5f5";

  const nav = document.createElement("div");
  nav.style.display = "flex";
  nav.style.justifyContent = "space-between";
  nav.style.alignItems = "center";
  nav.style.padding = "10px 20px";
  nav.style.backgroundColor = "#ffffff";
  nav.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
  document.body.appendChild(nav);

  const logo = document.createElement("img");
  logo.src = "Logo.png"; // Replace with actual logo
  logo.alt = "Logo";
  logo.style.height = "40px";
  nav.appendChild(logo);

  const menuContainer = document.createElement("div");
  menuContainer.style.position = "relative";

  const menuBtn = document.createElement("img");
  menuBtn.src = "menu-icon.png"; // Replace with your menu icon
  menuBtn.alt = "Menu";
  menuBtn.style.height = "36px";
  menuBtn.style.cursor = "pointer";
  menuContainer.appendChild(menuBtn);

  const dropdown = document.createElement("div");
  dropdown.style.position = "absolute";
  dropdown.style.top = "100%";
  dropdown.style.right = "0";
  dropdown.style.background = "#fff";
  dropdown.style.border = "1px solid #ccc";
  dropdown.style.borderRadius = "4px";
  dropdown.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
  dropdown.style.display = "none";
  dropdown.innerHTML = `
    <div style="padding: 10px; cursor: pointer;">View Profile</div>
    <div style="padding: 10px; cursor: pointer;">Logout</div>
  `;
  menuContainer.appendChild(dropdown);

  menuBtn.onclick = () => {
    dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
  };

  dropdown.onclick = (e) => {
    const action = e.target.innerText;
    if (action === "Logout") {
      location.reload();
    } else if (action === "View Profile") {
      alert("Profile page coming soon!");
    }
  };

  nav.appendChild(menuContainer);

  const main = document.createElement("div");
  main.innerHTML = `<h1 style="padding: 20px;">Welcome to your Dashboard</h1>`;
  document.body.appendChild(main);
}
