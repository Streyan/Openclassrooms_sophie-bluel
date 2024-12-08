function getGalleyModale() {
  return `
    <div id="modal-wrapper" class="modal-wrapper">
      <div class="galleryModal">
        <div class="modal_gallery_header">
          <a onclick="hideModal()">
            <i class="fa-solid fa-xmark"></i>
          </a>
        </div>
        <h1 class="title">Galerie photo</h1>
        <div id="gallery-modal" class="gallery-modal"></div>
        <div class="separator"></div>
        <input type="submit" id="validate" value="Ajouter une photo" onclick="showAddModal()"/>
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
      deleteIcon.classList.add("link");
      deleteIcon.classList.add("fa-trash-can");
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
