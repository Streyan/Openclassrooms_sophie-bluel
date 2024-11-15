let token = window.localStorage.token;

if (token != undefined) {
  console.log("connected");
  console.log(token);
} else {
  console.log("not connected");
  console.log(token);
}

function loadPage() {
  if (token == undefined) {
    showFilters();
    hideEdition();
  } else {
    hideFilters();
    showEdition();
  }
}

function clearToken() {
  localStorage.removeItem("token");
}

loadPage();
