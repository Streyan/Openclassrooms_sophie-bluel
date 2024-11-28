function getGalleyModale() {
  return `
    <div class="modal-wrapper">
      <div class="galleryModal">
        <div class="modal_header">
          <a onclick="hideModal()">
            X
          </a>
        </div>
        <h1 class="title">Galerie photo</h1>
        <div id="gallery-modal" class="gallery-modal"></div>
        <div class="separator"></div>
        <a onclick="showAddModal()">
            Ajouter une photo
          </a>
      </div>
    </div>;
  `;
}

function updateGalleryModal() {
  let galleryModal = document.getElementById("gallery-modal");
  galleryModal.innerHTML = "";

  getGalleryData().then((projects) => {
    projects.forEach((project) => {
      let newProject = document.createElement("figure");
      newProject.classList.add("figure-modal");
      newProject.appendChild(createImage(project));
      let deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fa-solid");
      deleteIcon.classList.add("fa-pen-to-square");
      deleteIcon.classList.add("deleteIcon");
      deleteIcon.onclick = function () {
        deleteProject(project.id).then(() => updateGalleries());
      };
      newProject.appendChild(deleteIcon);
      galleryModal.appendChild(newProject);
    });
  });
}

async function deleteProject(id) {
  const url = "http://localhost:5678/api/works/" + id;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        accept: "*/*",
        Authorization: "Bearer " + window.localStorage.token
      }
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (error) {
    console.error(error.message);
  }
}

function updateGalleries() {
  updateGalleryModal();
  updateGallery(0);
}
