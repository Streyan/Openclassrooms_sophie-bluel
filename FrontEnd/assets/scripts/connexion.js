let token = window.localStorage.token;

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
