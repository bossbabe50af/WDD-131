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

function openModal(e) {
    console.log(e.target);

    const img = e.target;
    const src = img.getAttribute('src');
    const alt = img.getAttribute('alt');
    const full = src.replace('sm', 'full');

    modalImage.src = full;
    modalImage.alt = alt;

    modal.showModal();
}

closeButton.addEventListener('click', closeModal);

function closeModal() {
    modal.close();
}


modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    }
});