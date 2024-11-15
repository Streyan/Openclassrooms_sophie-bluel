let projects;
let gallery = document.getElementById("gallery");

async function getGalleryData() {
  const url = "http://localhost:5678/api/works";
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

function updateGallery(categoryId) {
  getGalleryData().then((projects) => {
    gallery.innerHTML = "";

    projects.forEach((project) => {
      if (categoryId == 0 || project.categoryId == categoryId) {
        let newProject = document.createElement("figure");
        newProject.appendChild(createImage(project));
        newProject.appendChild(createCaption(project.title));
        gallery.appendChild(newProject);
      }
    });
  });
}

function createImage(project) {
  let newImage = document.createElement("img");
  newImage.src = project.imageUrl;
  newImage.alt = project.title;
  return newImage;
}

function createCaption(title) {
  let newCaption = document.createElement("figcaption");
  newCaption.innerHTML = title;
  return newCaption;
}

updateGallery(0);
