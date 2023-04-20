import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector(".gallery");
const galleryMarkup = imageGalleryMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

galleryContainer.addEventListener("click", onGaleryImageClick);

function imageGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`;
    })
    .join("");
}

function onGaleryImageClick(event) {
  event.preventDefault();
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }
  const currentImageUrl = event.target.dataset.source;

  const instance = basicLightbox.create(
    `
    <div class="modal">
        <img src ="${currentImageUrl}" width = "1280" height = "auto"/>
    </div>
`,
    {
      onShow: (instance) => {
        document.addEventListener("keydown", escKeyPress);
      },
      onclose: (instance) => {
        document.removeEventListener("keydowm", escKeyPress);
      },
    }
  );
  instance.show();

  function escKeyPress(event) {
    if (event.key === "Escape") {
      instance.close();
    }
  }
}
