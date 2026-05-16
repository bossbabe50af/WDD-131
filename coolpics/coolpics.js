const btn = document.querySelector(".menu-btn");
const menu = document.querySelector("nav");

btn.addEventListener("click", toggleMenu);

function toggleMenu() {
    menu.classList.toggle("hide");
    btn.classList.toggle("change");
}

const gallery = document.querySelector(".gallery");
const modal = document.querySelector("dialog");
const modalImage = modal.querySelector("img");
const closeButton = modal.querySelector(".close-viewer");

gallery.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);

function openModal(event) {
    const img = event.target;

    if (img.tagName !== "IMG") {
        return;
    }

    modalImage.src = img.src;
    modalImage.alt = img.alt;

    modal.showModal();
}

function closeModal() {
    modal.close();
}

modal.addEventListener("click", function (event) {
    if (event.target === modal) {
        modal.close();
    }
});