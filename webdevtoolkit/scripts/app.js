"use strict";

/*constants and variables*/

const featuredTopic = {
    title: "JavaScript Arrays",
    description:
        "Learn how to store, access, and manipulate data using JavaScript arrays.",
    topic: "Arrays"
};

const navigationLinks = document.querySelectorAll(".main-nav a");
const featuredTitle = document.querySelector("#featured-title");
const featuredDescription = document.querySelector("#featured-description");
const viewTopicsButtons = document.querySelectorAll(".view-topics-button");
const learnMoreButtons = document.querySelectorAll(".learn-more-button");
const aboutCards = document.querySelectorAll(".about-card");


/*functions*/

function initializeHomePage() {
    setActiveNavigation();
    displayFeaturedTopic();
}


function setActiveNavigation() {
    if (navigationLinks.length === 0) {
        return;
    }

    const currentPage =
        window.location.pathname.split("/").pop() ||
        "index.html";

    navigationLinks.forEach(function (link) {
        const linkPage = link.getAttribute("href");

        link.classList.remove("active");
        link.removeAttribute("aria-current");

        if (linkPage === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });
}


function displayFeaturedTopic() {
    if (!featuredTitle || !featuredDescription) {
        return;
    }

    featuredTitle.textContent = featuredTopic.title;
    featuredDescription.textContent =
        featuredTopic.description;

    learnMoreButtons.forEach(function (button) {
        button.dataset.topic = featuredTopic.topic;
    });
}


function openTopicsPage(button) {
    button.textContent = "Opening Topics...";

    setTimeout(function () {
        window.location.href = "topic.html";
    }, 300);
}


function saveSelectedTopic(button) {
    const selectedTopic = button.dataset.topic;

    if (selectedTopic) {
        sessionStorage.setItem(
            "selectedTopic",
            selectedTopic
        );
    }

    window.location.href = "topic.html";
}


function selectAboutCard(selectedCard) {
    const alreadySelected =
        selectedCard.classList.contains("selected");

    aboutCards.forEach(function (card) {
        card.classList.remove("selected");
    });

    if (!alreadySelected) {
        selectedCard.classList.add("selected");
    }
}


/*event listerners*/

document.addEventListener(
    "DOMContentLoaded",
    initializeHomePage
);


viewTopicsButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        openTopicsPage(button);
    });
});


learnMoreButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        saveSelectedTopic(button);
    });
});


aboutCards.forEach(function (card) {
    card.addEventListener("click", function () {
        selectAboutCard(card);
    });

    card.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            selectAboutCard(card);
        }
    });
});