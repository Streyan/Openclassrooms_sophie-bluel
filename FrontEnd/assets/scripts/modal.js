let modal = document.getElementById("modale");

function showModal() {
  modal.style.display = "flex";
  showGalleryModal();
}

function hideModal() {
  modal.style.display = "none";
}

function showGalleryModal() {
  modal.innerHTML = getGalleyModale();
  updateGalleryModal();
}

function showAddModal() {
  modal.innerHTML = getAddModale();
  previewImage();
  setCategoriesValues();
}

hideModal();
