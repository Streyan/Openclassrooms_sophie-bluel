function getGalleyModale() {
  return `
    <div class="modal-wrapper">
      <div class="galleryModal">
        <div class="closeModal">
          <a onclick="hideModal()">
            X
          </a>
        </div>
        <h1 class="title">Galerie photo</h1>
        <div id="gallery-modal" class="gallery-modal"></div>
        <div class="separator"></div>
        <input type="submit" value="Ajouter une photo" />
      </div>
    </div>;
  `;
}

function updateGalleryModal() {
  let galleryModal = document.getElementById("gallery-modal");

  getGalleryData().then((projects) => {
    projects.forEach((project) => {
      let newProject = document.createElement("figure");
      newProject.classList.add("figure-modal");
      newProject.appendChild(createImage(project));
      let deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fa-solid");
      deleteIcon.classList.add("fa-pen-to-square");
      deleteIcon.classList.add("deleteIcon");
      newProject.appendChild(deleteIcon);
      galleryModal.appendChild(newProject);
    });
  });
}
