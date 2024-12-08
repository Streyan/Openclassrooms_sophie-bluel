function getAddModale() {
  return `
    <div id="modal-wrapper" class="modal-wrapper">
      <div id="add" class="galleryModal">
        <div class="modal_header">
          <a onclick="showGalleryModal()">
            <i class="fa-solid fa-arrow-left"></i>
          </a>
          <a onclick="hideModal()">
            <i class="fa-solid fa-xmark"></i>
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
            <div id="add_picture" class="add_picture" onChange="validateForm()">
              <div id="image_preview">
                <i class="fa-solid fa-image"></i>
              </div>
              <label class="image_input_button link" for="image_input">+ Ajouter Photo</label>
              <input id="image_input" type="file" name="image" accept="image/png, image/jpeg"/>
              <div class="small-text">jpg, png : 4mo max</div>
              <div id="error_file"></div>
            </div>
            <div class="input">
              <label for="title">Titre</label>
              <input type="text" name="title" id="title" onChange="validateForm()"/>
            </div>
            <div class="input">
              <label for="category">Catégorie</label>
              <select name="category" id="category" onChange="validateForm()">
              </select>
            </div>
            <div class="separator"></div>
            <div id="error_modale"></div>
            <input type="submit" id="validate" value="Valider" disabled="true"/>
          </div>
        </form>
      </div>
    </div>;
  `;
}

function setCategoriesValues() {
  const categoriesElement = document.getElementById("category");

  getCategoriesData().then((categories) => {
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
  const error = document.getElementById("error_file");
  const addPicture = document.getElementById("add_picture");

  input.addEventListener("change", function () {
    if (
      input.files[0].type != "image/png" &&
      input.files[0].type != "image/jpeg"
    ) {
      error.innerHTML = "Erreur : Le fichier n'est pas au format demandé";
    } else if (input.files[0].size > 4000000) {
      error.innerHTML = "Erreur : Le fichier dépasse la taille autorisée";
    } else {
      for (let i = 0; i < addPicture.children.length; i++) {
        addPicture.children[i].style.display = "none";
      }

      let newImage = document.createElement("img");
      newImage.classList.add("image");
      newImage.id = "loaded_image";
      newImage.src = URL.createObjectURL(input.files[0]);

      addPicture.appendChild(newImage);
    }
  });
}

function validateForm() {
  var title = document.getElementById("title");
  var category = document.getElementById("category");
  var image = document.getElementById("loaded_image");
  var validate = document.getElementById("validate");

  if (title.value == "") {
    validate.setAttribute("disabled", true);
  } else if (category.value == null) {
    validate.setAttribute("disabled", true);
  } else if (image == null) {
    validate.setAttribute("disabled", true);
  } else {
    validate.removeAttribute("disabled");
  }
}

async function addProject() {
  const url = "http://localhost:5678/api/works";
  try {
    var myForm = document.getElementById("myForm");
    var errorDiv = document.getElementById("error_modale");
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
      if (response.status == 400) {
        errorDiv.innerHTML = "Bad Request";
      } else if (response.status == 401) {
        errorDiv.innerHTML = "Unauthorized";
      } else if (response.status == 500) {
        errorDiv.innerHTML = "Unexpected Error";
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
