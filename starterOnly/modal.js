// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalClose = document.querySelectorAll(".close");
const form = document.querySelector("#reserveForm");
const formD = document.querySelectorAll(".formData");
const firstName = document.querySelector("#first");
const lastName = document.querySelector("#last");
const email = document.querySelector("#email");
const birthdate = document.querySelector("#birthdate");
const quantity = document.querySelector("#quantity");
const submitBtn = document.querySelector(".btn-submit")
const parentFirst = document.querySelector(".parentFirst")
const parentLast = document.querySelector(".parentLast")
const parentEmail = document.querySelector(".parentEmail")
const parentBirthdate = document.querySelector(".parentBirthdate")
const parentQuantity = document.querySelector(".parentQuantity")
const parentLocation = document.querySelector(".parentLocation")
const parentConditions = document.querySelector(".parentConditions")

// create regex for validations
const nameRegex = new RegExp("[a-zA-ZÀ-ÖØ-öø-ÿ-]{2,15}");
const emailRegex = new RegExp("[A-Za-z0-9.]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,13}");

// create validations elements
const validationFirstName = document.createElement("p")
validationFirstName.innerText = "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
parentFirst.appendChild(validationFirstName);

const validationLastName = document.createElement("p")
validationLastName.innerText = "Veuillez entrer 2 caractères ou plus pour le champ du nom."
parentLast.appendChild(validationLastName);

const validationEmail = document.createElement("p")
validationEmail.innerText = "L'adresse électronique doit être valide."
parentEmail.appendChild(validationEmail);

const validationBirthdate = document.createElement("p")
validationBirthdate.innerText = "Vous devez entrer votre date de naissance."
parentBirthdate.appendChild(validationBirthdate);

const validationQuantity = document.createElement("p")
validationQuantity.innerText = "Vous pouvez uniquement renseigner un nombre entre 0 et 99."
parentQuantity.appendChild(validationQuantity);

const validationLocation = document.createElement("p")
validationLocation.innerText = "Vous devez choisir une option."
parentLocation.appendChild(validationLocation);

const validationConditions = document.createElement("p")
validationConditions.innerText = "Vous devez vérifier que vous acceptez les termes et conditions."
parentConditions.appendChild(validationConditions);

function showValidationMessage(validationElement) {
  validationElement.style.display = "block"
}
function hideValidationMessage(validationElement) {
  validationElement.style.display = "none"
}

function editNav() {
  const navbar = document.querySelector(".navbar");
  if (navbar.className === "navbar") {
    navbar.className += " responsive";
  } else {
    navbar.className = "navbar";
  }
}

function isFirstNameValid(firstName) {
  if (!firstName || !nameRegex.test(firstName)) {
    showValidationMessage(validationFirstName);
  } else {
    hideValidationMessage(validationFirstName)
  }
}

function isLastNameValid(lastName) {
  if (!lastName || !nameRegex.test(lastName)) {
    showValidationMessage(validationLastName);
  } else {
    hideValidationMessage(validationLastName)
  }
}

function isEmailValid(email) {
  if (!email || !emailRegex.test(email)) {
    showValidationMessage(validationEmail);
  } else {
    hideValidationMessage(validationEmail);
  }
}

function isBirthdateValid(birthdate) {
  if (!birthdate) {
    showValidationMessage(validationBirthdate);
  }
  else {
    hideValidationMessage(validationBirthdate);
  }
}

function isQuantityValid(quantity) {
  if ((quantity !== 0) && (quantity > 99)) {
    showValidationMessage(validationQuantity);
  }
  else {
    hideValidationMessage(validationQuantity);
  }
}

function isLocationValid(location) {
  if (!location) {
    showValidationMessage(validationLocation)
  } else {
    hideValidationMessage(validationLocation)
  }
}

function AreConditionsAccepted(accepted) {
  if (!accepted) {
    showValidationMessage(validationConditions)
  } else {
    hideValidationMessage(validationConditions)
  }
}

function checkEachInputOnChange(input) {

  if (input.id === "first") {
    isFirstNameValid(input.value)
  } else if (input.id === "last") {
    isLastNameValid(input.value)
  } else if (input.id === "email") {
    isEmailValid(input.value)
  } else if (input.id === "birthdate") {
    isBirthdateValid(input.value)
  } else if (input.id === "quantity") {
    isQuantityValid(input.value)
  }

}

// validations on change
function validateOnChange(inputSelector) {
  const input = document.querySelector(inputSelector);

  input.addEventListener("change", (event) => {
    event.preventDefault();
    checkEachInputOnChange(input)
  })
}


// validation on submit
function validateOnSubmit(event) {

  const formObject = {};
  const formData = new FormData(form);
  for (let key of formData.keys()) {
    formObject[key] = formData.get(key);
  }
  console.log({ formObject })

  isFirstNameValid(formObject.first)
  isLastNameValid(formObject.last)
  isEmailValid(formObject.email)
  isBirthdateValid(formObject.birthdate)
  isQuantityValid(formObject.quantity)
  isLocationValid(formObject.location)
  AreConditionsAccepted(formObject.conditions)

  if (!(event.target.querySelector('input[type="radio"]').checked)) {
    showValidationMessage(validationLocation);
  } else {
    hideValidationMessage(validationLocation);
  }
  if (!(event.target.querySelector("#conditions").checked)) {
    showValidationMessage(validationConditions);
  } else {
    hideValidationMessage(validationConditions);
  }
}

// function for suscribe form
function sendSubscription() {
  const subscribeForm = document.querySelector("#reserveForm")
  subscribeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    validateOnSubmit(event)

    // Creation of subscription object
    const subscription = {
      firstName: event.target.querySelector("#first").value,
      lastName: event.target.querySelector("#last").value,
      email: event.target.querySelector("#email").value,
      birthdate: new Date(event.target.querySelector("#birthdate").value),
      quantity: parseInt(event.target.querySelector("#quantity").value),
      location: event.target.querySelector("input[name='location']:checked").value,
      conditions: event.target.querySelector("#conditions").checked,
      newsletter: event.target.querySelector("#newsletter").checked,
    }
    return console.log({ subscription })
    alert("Merci ! Votre réservation a été reçue.");
    return subscription

  })
}

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// close modal event
modalClose.forEach((btn) => btn.addEventListener("click", closeModal));

// launch validations on change event
firstName.addEventListener("change", validateOnChange("#first"))
lastName.addEventListener("change", validateOnChange("#last"))
email.addEventListener("change", validateOnChange("#email"))
birthdate.addEventListener("change", validateOnChange("#birthdate"))
quantity.addEventListener("change", validateOnChange("#quantity"))

// launch subscription event
submitBtn.addEventListener("click", sendSubscription())

// TODO: CSS Mobile + desktop