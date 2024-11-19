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
        <form>
          <div class="inside_modal">
            <div class="add_picture">
              <i class="fa-solid fa-image"></i>
              <input type="submit" value="+ Ajouter Photo" />
              <div>jpg, png : 4mo max</div>
            </div>
            <div class="input">
              <label for="password">Titre</label>
              <input type="password" name="password" id="password" />
            </div>
            <div class="input">
              <label for="password">Catégorie</label>
              <input type="password" name="password" id="password" />
            </div>
            <div class="separator"></div>
            <input type="submit" value="Valider" />
          </div>
        </form>
      </div>
    </div>;
  `;
}
