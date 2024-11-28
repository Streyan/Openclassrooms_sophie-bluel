function getAddModale() {
  return `
    <div class="modal-wrapper">
      <div id="add" class="galleryModal">
        <div class="modal_header">
          <a onclick="showGalleryModal()">
            <-
          </a>
          <a onclick="hideModal()">
            X
          </a>
        </div>
        <h1 class="title">Ajout photo</h1>
        <form
          id="myForm"
          action="javascript:;"
          onSubmit="addProject()"
          method="post"
        >
          <div class="inside_modal">
            <div id="add_picture" class="add_picture">
              <div id="image_preview">
                <i class="fa-solid fa-image"></i>
              </div>
              <input id="image_input" type="file" name="image" id="image" accept="image/png, image/jpeg" value="+ Ajouter Photo" />
              <div>jpg, png : 4mo max</div>
            </div>
            <div class="input">
              <label for="title">Titre</label>
              <input type="text" name="title" id="title" />
            </div>
            <div class="input">
              <label for="category">Catégorie</label>
              <select list="categories" name="category" id="category" />
                <datalist id="categories">
                </datalist>
            </div>
            <div class="separator"></div>
            <input type="submit" value="Valider" />
          </div>
        </form>
      </div>
    </div>;
  `;
}

function setCategoriesValues() {
  const categoriesElement = document.getElementById("categories");
  getCategoriesData().then((categories) => {
    console.log(categories);
    categories.forEach((category) => {
      let newCategory = document.createElement("option");
      newCategory.value = category.id;
      newCategory.innerHTML = category.name;
      categoriesElement.appendChild(newCategory);
    });
  });
}

function previewImage() {
  const input = document.getElementById("image_input");
  const addPicture = document.getElementById("add_picture");

  input.addEventListener("change", function () {
    console.log(addPicture.children);

    for (let i = 0; i < addPicture.children.length; i++) {
      addPicture.children[i].style.display = "none";
    }

    let newImage = document.createElement("img");
    newImage.src = URL.createObjectURL(input.files[0]);

    addPicture.appendChild(newImage);
  });
}

async function addProject() {
  const url = "http://localhost:5678/api/works";
  try {
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + window.localStorage.token
      },
      body: formData
    });
    if (!response.ok) {
      if (response.status == 404) {
        //error.innerHTML = "User not found";
      } else if (response.status == 401) {
        //error.innerHTML = "Not Authorized";
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } else {
      hideModal();
      updateGallery(0);
    }
  } catch (error) {
    console.error(error.message);
  }
}
