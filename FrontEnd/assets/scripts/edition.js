let header = document.getElementById("header");
let edition = document.getElementById("edition");
let login = document.getElementById("login");

function showEdition() {
  login.innerHTML = "logout";
  login.href = "./index.html";
  login.addEventListener("click", function () {
    clearToken();
  });
  header.style.display = "flex";
  edition.style.display = "flex";
}

function hideEdition() {
  login.innerHTML = "login";
  login.href = "./login.html";
  header.style.display = "none";
  edition.style.display = "none";
}
