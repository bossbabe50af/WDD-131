const form = document.querySelector("#ticketForm");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const type = document.querySelector("#type");
const eventDate = document.querySelector("#eventDate");
const extraInfo = document.querySelector("#extraInfo");
const extraLabel = document.querySelector("#extraLabel");
const extraInput = document.querySelector("#extraInput");
const extraHelp = document.querySelector("#extraHelp");
const errors = document.querySelector("#errors");
const ticketInfo = document.querySelector("#ticketInfo");

type.addEventListener("change", function () {
    extraInput.value = "";

    if (type.value === "student") {
        extraInfo.classList.remove("hide");
        extraLabel.textContent = "Student I#";
        extraHelp.textContent = "Enter your 9 digit student I number.";
    } else if (type.value === "guest") {
        extraInfo.classList.remove("hide");
        extraLabel.textContent = "Access Code";
        extraHelp.textContent = "Enter the access code EVENT131.";
    } else {
        extraInfo.classList.add("hide");
        extraLabel.textContent = "";
        extraHelp.textContent = "";
    }
});

form.addEventListener("submit", function (event) {
    event.preventDefault();

    errors.innerHTML = "";
    ticketInfo.innerHTML = "";

    let messages = [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(eventDate.value);

    if (firstName.value.trim() === "") {
        messages.push("First name is required");
    }

    if (lastName.value.trim() === "") {
        messages.push("Last name is required");
    }

    if (email.value.trim() === "") {
        messages.push("Email is required");
    }

    if (type.value === "") {
        messages.push("Please choose student or guest");
    }

    if (eventDate.value === "") {
        messages.push("Event date is required");
    } else if (selectedDate <= today) {
        messages.push("Event date must be later than today");
    }

    if (type.value === "student" && !/^\d{9}$/.test(extraInput.value.trim())) {
        messages.push("Student I# must be 9 digits");
    }

    if (type.value === "guest" && extraInput.value.trim() !== "EVENT131") {
        messages.push("Access Code must be EVENT131");
    }

    if (messages.length > 0) {
        errors.innerHTML = messages.map(function (message) {
            return `<p>${message}</p>`;
        }).join("");
    } else {
        ticketInfo.innerHTML = `
            <h2>Ticket Created</h2>
            <p>${firstName.value.trim()} ${lastName.value.trim()}</p>
            <p>${type.value}</p>
            <p>${eventDate.value}</p>
        `;

        form.reset();
        extraInfo.classList.add("hide");
        extraLabel.textContent = "";
        extraHelp.textContent = "";
    }
});