const menuButton = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

menuButton.addEventListener("click", function () {
    nav.classList.toggle("hide");
    menuButton.classList.toggle("change");
});