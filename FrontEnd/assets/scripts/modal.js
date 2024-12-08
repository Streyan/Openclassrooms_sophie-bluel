let modal = document.getElementById("modale");

function showModal(e) {
  e.preventDefault();
  modal.style.display = "flex";
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", true);
  showGalleryModal();
  modal.addEventListener("click", function () {
    hideModal();
  });
}

function hideModal() {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", true);
  modal.removeAttribute("aria-modal");
}

function showGalleryModal() {
  modal.innerHTML = getGalleyModale();
  updateGalleryModal();
  document
    .getElementById("modal-wrapper")
    .addEventListener("click", function (e) {
      e.stopPropagation();
    });
}

function showAddModal() {
  modal.innerHTML = getAddModale();
  previewImage();
  setCategoriesValues();
  document
    .getElementById("modal-wrapper")
    .addEventListener("click", function (e) {
      e.stopPropagation();
    });
}

document.getElementById("open-modal").addEventListener("click", function (e) {
  showModal(e);
});
