let token = window.localStorage.token;

if (token != undefined) {
  console.log(token);
} else {
  console.log("not connected");
}

function loadPage() {
  if (token == undefined) {
    getFiltersData();
  } else {
    getEdition();
  }
}

loadPage();
