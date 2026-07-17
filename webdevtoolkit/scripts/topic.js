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

    return categoryFilter.value.trim().toLowerCase();
}

function getSelectedSort() {
    if (!sortSelect) {
        return "az";
    }

    return sortSelect.value.trim().toLowerCase();
}

function getCardTitle(card) {
    return (card.dataset.title || "").trim();
}

function getCardCategory(card) {
    return (card.dataset.category || "").trim().toLowerCase();
}

function getCardDifficulty(card) {
    return (card.dataset.difficulty || "").trim().toLowerCase();
}

function getCardSearchText(card) {
    const title = getCardTitle(card).toLowerCase();
    const category = getCardCategory(card);
    const difficulty = getCardDifficulty(card);
    const cardContent = card.textContent.toLowerCase();

    return `${title} ${category} ${difficulty} ${cardContent}`;
}

function updateTopics(shouldScroll = false) {
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
        const category = getCardCategory(card);
        const searchableText = getCardSearchText(card);

        const matchesSearch =
            searchText === "" ||
            searchableText.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory ||
            category.includes(selectedCategory) ||
            searchableText.includes(selectedCategory);

        return matchesSearch && matchesCategory;
    });
}

function sortTopicCards(cards, selectedSort) {
    const sortedCards = [...cards];

    if (selectedSort === "az") {
        sortedCards.sort(function (firstCard, secondCard) {
            return getCardTitle(firstCard).localeCompare(
                getCardTitle(secondCard)
            );
        });
    } else if (selectedSort === "za") {
        sortedCards.sort(function (firstCard, secondCard) {
            return getCardTitle(secondCard).localeCompare(
                getCardTitle(firstCard)
            );
        });
    } else if (
        selectedSort === "beginner-advanced" ||
        selectedSort === "difficulty-ascending" ||
        selectedSort === "difficulty-asc"
    ) {
        sortedCards.sort(function (firstCard, secondCard) {
            const difficultyDifference =
                getDifficultyValue(firstCard) -
                getDifficultyValue(secondCard);

            if (difficultyDifference !== 0) {
                return difficultyDifference;
            }

            return getCardTitle(firstCard).localeCompare(
                getCardTitle(secondCard)
            );
        });
    } else if (
        selectedSort === "advanced-beginner" ||
        selectedSort === "difficulty-descending" ||
        selectedSort === "difficulty-desc"
    ) {
        sortedCards.sort(function (firstCard, secondCard) {
            const difficultyDifference =
                getDifficultyValue(secondCard) -
                getDifficultyValue(firstCard);

            if (difficultyDifference !== 0) {
                return difficultyDifference;
            }

            return getCardTitle(firstCard).localeCompare(
                getCardTitle(secondCard)
            );
        });
    }

    return sortedCards;
}

function getDifficultyValue(card) {
    const difficulty = getCardDifficulty(card);

    return difficultyOrder[difficulty] || 0;
}

function displayTopicCards(cards) {
    if (!topicGrid) {
        return;
    }

    topicCards.forEach(function (card) {
        card.hidden = true;
        card.classList.remove("search-highlight");
    });

    cards.forEach(function (card) {
        card.hidden = false;
        topicGrid.appendChild(card);
    });

    if (noResultsMessage) {
        noResultsMessage.hidden = cards.length !== 0;
    }
}

function updateResultsMessage(resultCount) {
    if (!resultsStatus) {
        return;
    }

    if (resultCount === 0) {
        resultsStatus.textContent = "No learning topics found.";
    } else if (resultCount === 1) {
        resultsStatus.textContent = "Showing 1 learning topic.";
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
        return getCardTitle(card).toLowerCase() === searchText;
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
    const details = button.nextElementSibling;

    if (!details) {
        return;
    }

    const isExpanded =
        button.getAttribute("aria-expanded") === "true";

    button.setAttribute(
        "aria-expanded",
        String(!isExpanded)
    );

    details.hidden = isExpanded;
    button.textContent =
        isExpanded ? "View Details" : "Hide Details";
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