const characterName = document.querySelector("#characterName");
const characterClass = document.querySelector("#characterClass");
const characterLevel = document.querySelector("#characterLevel");
const characterHealth = document.querySelector("#characterHealth");
const characterImage = document.querySelector("#characterImage");
const message = document.querySelector("#message");
const attackButton = document.querySelector("#attackButton");
const levelButton = document.querySelector("#levelButton");

const character = {
    name: "Snortleblat",
    class: "Swamp Beast Diplomat",
    level: 5,
    health: 100,
    image: "images/swamp-character.webp",

    attacked: function () {
        this.health -= 20;

        if (this.health <= 0) {
            this.health = 0;
            message.textContent = `${this.name} has died.`;
            attackButton.disabled = true;
        } else {
            message.textContent = "";
        }

        renderCharacter();
    },

    levelUp: function () {
        this.level += 1;

        renderCharacter();
    }
};

function renderCharacter() {
    characterName.textContent = character.name;
    characterClass.textContent = character.class;
    characterLevel.textContent = character.level;
    characterHealth.textContent = character.health;
    characterImage.src = character.image;
    characterImage.alt = `${character.name}, a ${character.class}`;
}

attackButton.addEventListener("click", function () {
    character.attacked();
});

levelButton.addEventListener("click", function () {
    character.levelUp();
});

renderCharacter();