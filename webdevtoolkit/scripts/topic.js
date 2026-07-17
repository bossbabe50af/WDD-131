/* ========================================
   WEB DEV TOOLKIT
   TOPICS PAGE JAVASCRIPT
   ======================================== */


/* ========================================
   CONSTANTS AND VARIABLES
   ======================================== */

const searchInput = document.querySelector("#topic-search");
const categoryFilter = document.querySelector("#category-filter");
const sortSelect = document.querySelector("#sort-topics");
const topicGrid = document.querySelector("#topic-grid");
const topicCards = Array.from(document.querySelectorAll(".topic-card"));
const resultsStatus = document.querySelector("#results-status");
const noResultsMessage = document.querySelector("#no-results-message");
const detailsButtons = document.querySelectorAll(".details-btn");

const difficultyOrder = {
    beginner: 1,
    intermediate: 2,
    advanced: 3
};

let searchTimer;


/* ========================================
   FUNCTIONS
   ======================================== */

function initializeTopicsPage() {
    if (!topicGrid) {
        return;
    }

    applySavedTopic();
    updateTopics(false);
}


function getSearchText() {
    if (!searchInput) {
        return "";
    }

    return searchInput.value.trim().toLowerCase();
}


function getSelectedCategory() {
    if (!categoryFilter) {
        return "all";
    }

    return categoryFilter.value;
}


function getSelectedSort() {
    if (!sortSelect) {
        return "az";
    }

    return sortSelect.value;
}


function updateTopics(shouldScroll) {
    const searchText = getSearchText();
    const selectedCategory = getSelectedCategory();
    const selectedSort = getSelectedSort();

    const matchingCards = filterTopicCards(
        searchText,
        selectedCategory
    );

    const sortedCards = sortTopicCards(
        matchingCards,
        selectedSort
    );

    displayTopicCards(sortedCards);
    updateResultsMessage(sortedCards.length);

    if (shouldScroll) {
        scrollToFirstMatch(sortedCards, searchText);
    }
}


function filterTopicCards(searchText, selectedCategory) {
    return topicCards.filter(function (card) {
        const title = card.dataset.title.toLowerCase();
        const category = card.dataset.category.toLowerCase();

        /*
         Search checks the card title only.

         Examples:
         "html" displays HTML Basics only.
         "css" displays CSS Basics only.
         "arrays" displays Arrays only.
         "javascript" displays JavaScript Basics only.
        */
        const matchesSearch =
            searchText === "" ||
            title.includes(searchText);

        /*
         Category dropdown checks data-category.

         Selecting JavaScript may display multiple
         JavaScript-category cards.
        */
        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        return matchesSearch && matchesCategory;
    });
}


function sortTopicCards(cards, selectedSort) {
    const sortedCards = [...cards];

    if (selectedSort === "az") {
        sortedCards.sort(function (firstCard, secondCard) {
            return firstCard.dataset.title.localeCompare(
                secondCard.dataset.title
            );
        });
    } else if (selectedSort === "za") {
        sortedCards.sort(function (firstCard, secondCard) {
            return secondCard.dataset.title.localeCompare(
                firstCard.dataset.title
            );
        });
    } else if (selectedSort === "beginner-advanced") {
        sortedCards.sort(function (firstCard, secondCard) {
            return getDifficultyValue(firstCard) -
                getDifficultyValue(secondCard);
        });
    } else if (selectedSort === "advanced-beginner") {
        sortedCards.sort(function (firstCard, secondCard) {
            return getDifficultyValue(secondCard) -
                getDifficultyValue(firstCard);
        });
    }

    return sortedCards;
}


function getDifficultyValue(card) {
    const difficulty = card.dataset.difficulty;

    return difficultyOrder[difficulty] || 0;
}


function displayTopicCards(cards) {
    topicCards.forEach(function (card) {
        card.hidden = true;
        card.classList.remove("search-highlight");
    });

    cards.forEach(function (card) {
        card.hidden = false;
        topicGrid.appendChild(card);
    });

    if (noResultsMessage) {
        noResultsMessage.hidden = cards.length > 0;
    }
}


function updateResultsMessage(resultCount) {
    if (!resultsStatus) {
        return;
    }

    if (resultCount === 0) {
        resultsStatus.textContent =
            "No learning topics found.";
    } else if (resultCount === 1) {
        resultsStatus.textContent =
            "Showing 1 learning topic.";
    } else {
        resultsStatus.textContent =
            `Showing ${resultCount} learning topics.`;
    }
}


function scrollToFirstMatch(cards, searchText) {
    if (searchText.length < 2 || cards.length === 0) {
        return;
    }

    const exactTitleMatch = cards.find(function (card) {
        return card.dataset.title.toLowerCase() === searchText;
    });

    const firstMatchingCard = exactTitleMatch || cards[0];

    setTimeout(function () {
        firstMatchingCard.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        firstMatchingCard.classList.add("search-highlight");

        setTimeout(function () {
            firstMatchingCard.classList.remove("search-highlight");
        }, 1500);
    }, 100);
}


function applySavedTopic() {
    if (!searchInput) {
        return;
    }

    const savedTopic = sessionStorage.getItem("selectedTopic");

    if (!savedTopic) {
        return;
    }

    searchInput.value = savedTopic;
    sessionStorage.removeItem("selectedTopic");

    setTimeout(function () {
        updateTopics(true);
    }, 100);
}

function toggleTopicDetails(button) {

    const details =
        button.nextElementSibling;

    const isExpanded =
        button.getAttribute("aria-expanded") === "true";

    button.setAttribute(
        "aria-expanded",
        String(!isExpanded)
    );

    details.hidden = isExpanded;

    button.textContent =
        isExpanded
            ? "View Details"
            : "Hide Details";
}


/* ========================================
   EVENT LISTENERS
   ======================================== */

document.addEventListener(
    "DOMContentLoaded",
    initializeTopicsPage
);


if (searchInput) {
    searchInput.addEventListener("input", function () {
        clearTimeout(searchTimer);

        searchTimer = setTimeout(function () {
            updateTopics(true);
        }, 300);
    });
}


if (categoryFilter) {
    categoryFilter.addEventListener("change", function () {
        updateTopics(false);
    });
}


if (sortSelect) {
    sortSelect.addEventListener("change", function () {
        updateTopics(false);
    });
}

detailsButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        toggleTopicDetails(button);

    });

});

