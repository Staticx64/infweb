document.body.style.fontFamily = "Arial, sans-serif";
document.body.style.margin = "0";
document.body.style.display = "flex";
document.body.style.flexDirection = "column";
document.body.style.alignItems = "center";
document.body.style.justifyContent = "center";
document.body.style.height = "100vh";
document.body.style.backgroundColor = "#f0f0f0";

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
  formWrapper.innerHTML = ""; // Clear previous form
  const form = document.createElement("form");
  form.innerHTML = `
    <h2>${type}</h2>
    <input type="text" placeholder="Username" required style="display:block;width:100%;margin-bottom:10px;padding:8px;" />
    <input type="password" placeholder="Password" required style="display:block;width:100%;margin-bottom:10px;padding:8px;" />
    ${type === "Register" ? `<input type="email" placeholder="Email" required style="display:block;width:100%;margin-bottom:10px;padding:8px;" />` : ""}
    <button type="submit" style="padding:10px;width:100%;">${type}</button>
  `;
  form.onsubmit = (e) => {
    e.preventDefault();
    alert(`${type} successful!`);
  };
  formWrapper.appendChild(form);
}

// Default view
renderForm("Login");

// Event listeners
document.getElementById("showLogin").onclick = () => renderForm("Login");
document.getElementById("showRegister").onclick = () => renderForm("Register");
