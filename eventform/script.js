const form = document.querySelector("#ticketForm");
const type = document.querySelector("#type");
const eventDate = document.querySelector("#eventDate");
const extraInfo = document.querySelector("#extraInfo");
const extraLabel = document.querySelector("#extraLabel");
const extraInput = document.querySelector("#extraInput");
const extraHelp = document.querySelector("#extraHelp");
const errors = document.querySelector("#errors");
const ticketInfo = document.querySelector("#ticketInfo");


function updateExtraField() {
    const value = type.value;

    extraInput.value = "";

    if (value === "student") {
        extraInfo.classList.remove("hide");
        extraLabel.textContent = "Student I#";
        extraHelp.textContent = "Enter your 9 digit student I number.";
    }
    else if (value === "guest") {
        extraInfo.classList.remove("hide");
        extraLabel.textContent = "Access Code";
        extraHelp.textContent = "Enter the access code EVENT131.";
    }
    else {
        extraInfo.classList.add("hide");
        extraLabel.textContent = "";
        extraHelp.textContent = "";
    }
}


function isPastDate(value) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(value);

    return selectedDate <= today;
}


function isValidStudentId(value) {
    return /^\d{9}$/.test(value);
}


function isValidAccessCode(value) {
    return value === "EVENT131";
}


type.addEventListener("change", updateExtraField);
updateExtraField();


form.addEventListener("submit", function (event) {
    event.preventDefault();

    errors.textContent = "";
    ticketInfo.textContent = "";

    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const email = form.email.value.trim();
    const ticketType = form.type.value;
    const date = form.eventDate.value;
    const extraValue = form.extraInput.value.trim();


    // validation of required feilds

    if (!firstName) {
        errors.textContent = "First name is required.";
        return;
    }
    if (!lastName) {
        errors.textContent = "Last name is required.";
        return;
    }
    if (!email) {
        errors.textContent = "Email is required.";
        return;
    }
    if (!ticketType) {
        errors.textContent = "Please choose student or guest.";
        return;
    }
    if (!date) {
        errors.textContent = "Event date is required.";
        return;
    }

    // validation of the date 

    if (isPastDate(date)) {
        errors.textContent = "Event date must be later than today.";
        return;
    }


    // validation of student ticket

    if (ticketType === "student" && !isValidStudentId(extraValue)) {
        errors.textContent = "Student I# must be 9 digits.";
        return;
    }


    // validation of guest ticket

    if (ticketType === "guest" && !isValidAccessCode(extraValue)) {
        errors.textContent = "Access code must be EVENT131.";
        return;
    }


    ticketInfo.innerHTML = `
        <h2>Ticket Created</h2>
        <p>${firstName} ${lastName}</p>
        <p>Email: ${email}</p>
        <p>Type: ${ticketType}</p>
        <p>Date: ${date}</p>
    `;

    form.reset();
    updateExtraField();
});