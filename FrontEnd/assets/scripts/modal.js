let modal = document.getElementById("modale");

function showModal() {
  modal.style.display = "flex";
  modal.innerHTML = getGalleyModale();
  updateGalleryModal();
}

function hideModal() {
  modal.style.display = "none";
}

hideModal();
