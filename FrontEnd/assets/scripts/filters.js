let filtersList = new Set();
let filters = document.getElementById("filters");
let currentFilter = null;

async function getCategoriesData() {
  const url = "http://localhost:5678/api/categories";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
}

function updateCategories() {
  getCategoriesData().then((filters) => {
    filters.forEach((filter) => {
      filtersList.add(filter);
    });

    createFilters();
  });
}

function createFilters() {
  let allButton = createButton(0, "Tous");
  allButton.classList.add("filter_selected");
  filters.appendChild(allButton);

  filtersList.forEach((filter) => {
    filters.appendChild(createButton(filter.id, filter.name));
  });
}

function createButton(id, name) {
  let newButton = document.createElement("div");
  newButton.classList.add("button");
  newButton.classList.add("link");
  newButton.id = id;
  newButton.addEventListener("click", function () {
    filterClick(id);
  });
  newButton.innerHTML = name;
  return newButton;
}

function filterClick(id) {
  currentFilter = id;

  for (let i = 0; i < filters.children.length; i++) {
    if (filters.children[i].id == currentFilter) {
      filters.children[i].classList.add("filter_selected");
    } else {
      filters.children[i].classList.remove("filter_selected");
    }
  }

  updateGallery(id);
}

function showFilters() {
  filters.style.display = "flex";
}

function hideFilters() {
  filters.style.display = "none";
}

updateCategories();
