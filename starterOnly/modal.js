function editNav() {
  var x = document.querySelector(".navbar");
  if (x.className === "navbar") {
    x.className += " responsive";
  } else {
    x.className = "navbar";
  }
}

// function for check all validations
function validateEachInput(inputSelector) {
  const input = document.querySelector(inputSelector);
  const nameRegex = new RegExp("[a-zA-ZÀ-ÖØ-öø-ÿ-]{2,15}");
  const emailRegex = new RegExp("[A-Za-z0-9.]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,13}");
  
  input.addEventListener("change", (event) => {
    event.preventDefault();

  console.log({inputValue: input.value})
  // console.log({regexName: !nameRegex.test(input.value)})
  console.log({regexMail: !emailRegex.test(input.value)})
  // console.log({dateInput: Date.parse(input.value)})
  // console.log({dateLegal: Date.parse("2005-01-01")})
  // console.log({equality: Date.parse(input.value) < Date.parse("2005-01-01")})

  if (inputSelector === "#first") {
    if (!input.value || !nameRegex.test(input.value)) {
      input.setCustomValidity('Veuillez entrer 2 caractères ou plus pour le champ du prénom.');
    } else {
      input.setCustomValidity("");
    }
    input.reportValidity();
  } else if (inputSelector === "#last") {
    if (!input.value || !nameRegex.test(input.value)) {
      input.setCustomValidity('Veuillez entrer 2 caractères ou plus pour le champ du nom.');
    } else {
      input.setCustomValidity("");
    }
    input.reportValidity();
  } else if (inputSelector === "#email") {
    if (!input.value || !emailRegex.test(input.value)) {
      input.setCustomValidity("L'adresse électronique doit être valide.");
    } else {
      input.setCustomValidity("");
    }
    input.reportValidity();
  } else if (inputSelector === "#birthdate") {
    if (!input.value) {
      setCustomValidity('Vous devez entrer votre date de naissance.')
    } 
    // else if (Date.parse(input.value) > Date.parse("2005-01-01")) {
    //   setCustomValidity('Vous devez avoir au moins 18 ans pour participer.')
    // } 
    else {
      input.setCustomValidity("");
    }
    input.reportValidity();
  } else if (inputSelector === "#quantity") {
    if (!typeof input.value === Number) {
      setCustomValidity("Uniquement les nombres sont acceptés, arrête de jouer avec l'inspecteur petit malin !")
    } else if (!input.value >= 0 || !input.value <= 99) {
      setCustomValidity("Vous pouvez uniquement renseigner un nombre entre 0 et 99.")
    } else {
      input.setCustomValidity("");
    }
    input.reportValidity()
  } else if (inputSelector === "input[name='location']:checked") {
    if (!input.value) {
      setCustomValidity("Vous devez choisir une option.")
    } else {
      input.setCustomValidity("");
    }
    input.reportValidity()
  }
})
}

// function for suscribe form
function sendSubscription() {
  const subscribeForm = document.querySelector("#reserveForm")
  subscribeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // validation conditions d'utilisations par JS
    if(!event.target.querySelector("#conditions").checked)
    {
        alert("Vous devez vérifier que vous accepter les termes et conditions.");
        return
    }

    // attribut data mdn https://developer.mozilla.org/fr/docs/Learn/HTML/Howto/Use_data_attributes

    // https://developer.mozilla.org/en-US/docs/Web/API/FormData pour aller plus loin

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
    console.log({subscription})
    alert("Merci ! Votre réservation a été reçue.");
    return subscription
  })
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalClose = document.querySelectorAll(".close");
const formData = document.querySelectorAll(".formData");
const firstName = document.querySelector("#first");
const lastName = document.querySelector("#last");
const email = document.querySelector("#email");
const birthdate = document.querySelector("#birthdate");
const quantity = document.querySelector("#quantity");
const locationCity = document.querySelector("input[name='location']:checked");
const submitBtn = document.querySelector(".btn-submit")

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// validations
firstName.addEventListener("change", validateEachInput("#first"))
lastName.addEventListener("change", validateEachInput("#last"))
email.addEventListener("change", validateEachInput("#email"))
birthdate.addEventListener("change", validateEachInput("#birthdate"))
quantity.addEventListener("change", validateEachInput("#quantity"))
locationCity.addEventListener("change", validateEachInput("input[name='location']:checked"))

// launch subscription event
submitBtn.addEventListener("click", sendSubscription())

// close modal event
modalClose.forEach((btn) => btn.addEventListener("click", closeModal()));


// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// TODO: CSS Mobile + desktop