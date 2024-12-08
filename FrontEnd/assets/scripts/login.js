let token;
let login = document.getElementById("login");
let error = document.getElementById("error");

async function getLoginData(email, password) {
  const url = "http://localhost:5678/api/users/login";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        accept: " application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email, password: password })
    });
    if (!response.ok) {
      if (response.status == 404) {
        error.innerHTML = "User not found";
      } else if (response.status == 401) {
        error.innerHTML = "Not Authorized";
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } else {
      token = await response.json();
      window.localStorage.setItem("token", token.token);
      window.location.replace("index.html");
    }
  } catch (error) {
    console.error(error.message);
  }
}

function getLogin(email, password) {
  getLoginData(email, password);
}
