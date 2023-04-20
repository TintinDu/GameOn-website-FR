// DOM Elements
const modalBody = document.querySelector(".modal-body");
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
const inputFirstName = document.querySelector(".parentFirst > input")
const parentLast = document.querySelector(".parentLast")
const inputLastName = document.querySelector(".parentLast > input")
const parentEmail = document.querySelector(".parentEmail")
const inputEmail = document.querySelector(".parentEmail > input")
const parentBirthdate = document.querySelector(".parentBirthdate")
const inputBirthdate = document.querySelector(".parentBirthdate > input")
const parentQuantity = document.querySelector(".parentQuantity")
const inputQuantity = document.querySelector(".parentQuantity > input")
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

// create thanks validation modal
const thanksMessage = document.createElement("p")
thanksMessage.innerText = "Merci pour votre inscription"
thanksMessage.className = "thanksMessage"
thanksMessage.style.display = "none"
modalBody.appendChild(thanksMessage);

const closeButton = document.createElement("button")
closeButton.innerText = "Fermer"
closeButton.className = "btn-submit"
closeButton.style.display = "none"
modalBody.appendChild(closeButton);

function showConfirmationMessage() {
  modalBody.className += " modal-body--thanks"
  form.style.display = "none"
  closeButton.style.display = "block"
  thanksMessage.style.display = "block"
}

function hideConfirmationMessage() {
  modalBody.className = "modal-body"
  form.style.display = "block"
  closeButton.style.display = "none"
  thanksMessage.style.display = "none"
}

// open dropdown
function openDropdown() {
  const navbar = document.querySelector(".navbar");
  if (navbar.className === "navbar") {
    navbar.className += " responsive";
  } else {
    navbar.className = "navbar";
  }
}

function showValidationMessage(validationElement) {
  validationElement.className = "formData__validation"
  validationElement.style.display = "block"
}

function hideValidationMessage(validationElement) {
  validationElement.className = ""
  validationElement.style.display = "none"
}

function redInputWhenErrors(parentElement) {
  parentElement.className += " text-control--error"
}

function neutralInputWhenNoErrors(parentElement) {
  parentElement.className = "text-control"
}


function isFirstNameValid(firstName, input) {
  if (!firstName || !nameRegex.test(firstName)) {
    showValidationMessage(validationFirstName);
    redInputWhenErrors(input)
    return false
  } else {
    hideValidationMessage(validationFirstName)
    neutralInputWhenNoErrors(input)
    return true
  }
}

function isLastNameValid(lastName, input) {
  if (!lastName || !nameRegex.test(lastName)) {
    showValidationMessage(validationLastName);
    redInputWhenErrors(input)
    return false
  } else {
    hideValidationMessage(validationLastName)
    neutralInputWhenNoErrors(input)
    return true
  }
}

function isEmailValid(email, input) {
  if (!email || !emailRegex.test(email)) {
    showValidationMessage(validationEmail);
    redInputWhenErrors(input)
    return false
  } else {
    hideValidationMessage(validationEmail);
    neutralInputWhenNoErrors(input)
    return true
  }
}

function isBirthdateValid(birthdate, input) {
  if (!birthdate) {
    showValidationMessage(validationBirthdate);
    redInputWhenErrors(input)
    return false
  }
  else {
    hideValidationMessage(validationBirthdate);
    neutralInputWhenNoErrors(input)
    return true
  }
}

function isQuantityValid(quantity, input) {
  const numberQuantity = parseInt(quantity)
  if (!numberQuantity || numberQuantity < 0 || numberQuantity > 99) {
    showValidationMessage(validationQuantity);
    redInputWhenErrors(input)
    return false
  }
  else {
    hideValidationMessage(validationQuantity);
    neutralInputWhenNoErrors(input)
    return true
  }
}

function isLocationValid(location) {
  if (!location) {
    showValidationMessage(validationLocation)
    return false
  } else {
    hideValidationMessage(validationLocation)
    return true
  }
}

function AreConditionsAccepted(accepted) {
  if (!accepted) {
    showValidationMessage(validationConditions)
    return false
  } else {
    hideValidationMessage(validationConditions)
    return true
  }
}

function checkEachInputOnChange(input) {

  if (input.id === "first") {
    isFirstNameValid(input.value, input)
  } else if (input.id === "last") {
    isLastNameValid(input.value, input)
  } else if (input.id === "email") {
    isEmailValid(input.value, input)
  } else if (input.id === "birthdate") {
    isBirthdateValid(input.value, input)
  } else if (input.id === "quantity") {
    isQuantityValid(input.value, input)
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

function getDataFromForm() { 
  const formObject = {};
  const formData = new FormData(form);
  for (let key of formData.keys()) {
    formObject[key] = formData.get(key);
  }
  return formObject
}

// validation on submit
function isValidOnSubmit() {
  const dataFromForm = getDataFromForm()

  return isFirstNameValid(dataFromForm.first, inputFirstName) &&
  isLastNameValid(dataFromForm.last, inputLastName) &&
  isEmailValid(dataFromForm.email, inputEmail) &&
  isBirthdateValid(dataFromForm.birthdate, inputBirthdate) &&
  isQuantityValid(dataFromForm.quantity, inputQuantity) &&
  isLocationValid(dataFromForm.location) &&
  AreConditionsAccepted(dataFromForm.conditions)
}

// function for suscribe form
function sendSubscription() {
  const subscribeForm = document.querySelector("#reserveForm")
  subscribeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (isValidOnSubmit()) {
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
      showConfirmationMessage()
      console.log({subscription})
      return subscription
    }
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
closeButton.addEventListener("click", closeModal);

// launch validations on change event
firstName.addEventListener("change", validateOnChange("#first"))
lastName.addEventListener("change", validateOnChange("#last"))
email.addEventListener("change", validateOnChange("#email"))
birthdate.addEventListener("change", validateOnChange("#birthdate"))
quantity.addEventListener("change", validateOnChange("#quantity"))

// launch subscription event
submitBtn.addEventListener("click", sendSubscription())

// TODO: CSS Mobile + desktop