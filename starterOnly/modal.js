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
const submitBtn = document.querySelector(".btn-submit")

function editNav() {
  const navbar = document.querySelector(".navbar");
  if (navbar.className === "navbar") {
    navbar.className += " responsive";
  } else {
    navbar.className = "navbar";
  }
}

// validations on change
function validateOnChange(inputSelector) {
  const input = document.querySelector(inputSelector);
  const nameRegex = new RegExp("[a-zA-ZÀ-ÖØ-öø-ÿ-]{2,15}");
  const emailRegex = new RegExp("[A-Za-z0-9.]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,13}");

  input.addEventListener("change", (event) => {
    event.preventDefault();

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
        input.setCustomValidity('Vous devez entrer votre date de naissance.')
      }
      else if (Date.parse(input.value) > Date.parse("2005-01-01")) {
        input.setCustomValidity('Vous devez avoir au moins 18 ans pour participer.')
      }
      else {
        input.setCustomValidity("");
      }
      input.reportValidity();
    } else if (inputSelector === "#quantity") {
      if (!typeof input.value === Number) {
        input.setCustomValidity("Uniquement les nombres sont acceptés, arrête de jouer avec l'inspecteur petit malin !")
      }
      else if (!(input.value >= 0) && !(input.value <= 99)) {
        input.setCustomValidity("Vous pouvez uniquement renseigner un nombre entre 0 et 99.")
      }
      else {
        input.setCustomValidity("");
      }
      input.reportValidity()
    }
  })
}

// validation on submit
// function validateOnSubmit(submitButton, inputSelector) {
//   const input = document.querySelector(inputSelector);
//   const submit = document.querySelector(submitButton)
//   const nameRegex = new RegExp("[a-zA-ZÀ-ÖØ-öø-ÿ-]{2,15}");
//   const emailRegex = new RegExp("[A-Za-z0-9.]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,13}");

//   submit.addEventListener("submit", (event) => {
//     event.preventDefault();

//     if (inputSelector === "#first") {
//       if (!input.value || !nameRegex.test(input.value)) {
//         input.setCustomValidity('Veuillez entrer 2 caractères ou plus pour le champ du prénom.');
//       } else {
//         input.setCustomValidity("");
//       }
//       input.reportValidity();
//     } else if (inputSelector === "#last") {
//       if (!input.value || !nameRegex.test(input.value)) {
//         input.setCustomValidity('Veuillez entrer 2 caractères ou plus pour le champ du nom.');
//       } else {
//         input.setCustomValidity("");
//       }
//       input.reportValidity();
//     } else if (inputSelector === "#email") {
//       if (!input.value || !emailRegex.test(input.value)) {
//         input.setCustomValidity("L'adresse électronique doit être valide.");
//       } else {
//         input.setCustomValidity("");
//       }
//       input.reportValidity();
//     } else if (inputSelector === "#birthdate") {
//       if (!input.value) {
//         input.setCustomValidity('Vous devez entrer votre date de naissance.')
//       }
//       else if (Date.parse(input.value) > Date.parse("2005-01-01")) {
//         input.setCustomValidity('Vous devez avoir au moins 18 ans pour participer.')
//       }
//       else {
//         input.setCustomValidity("");
//       }
//       input.reportValidity();
//     } else if (inputSelector === "#quantity") {
//       if (!typeof input.value === Number) {
//         input.setCustomValidity("Uniquement les nombres sont acceptés, arrête de jouer avec l'inspecteur petit malin !")
//       }
//       else if (!(input.value >= 0) && !(input.value <= 99)) {
//         input.setCustomValidity("Vous pouvez uniquement renseigner un nombre entre 0 et 99.")
//       }
//       else {
//         input.setCustomValidity("");
//       }
//       input.reportValidity()
//     }
//   })
// }


// function for suscribe form
function sendSubscription() {
  const subscribeForm = document.querySelector("#reserveForm")
  subscribeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // validation au submit
    const radio = event.target.querySelector('input[type="radio"]:checked');
    if (!radio) {
      radio.setCustomValidity("Vous devez choisir une option.");
    } else {
      radio.setCustomValidity("");
    }
    radio.reportValidity();

    const conditions = event.target.querySelector("#conditions");
    if (!conditions.checked) {
      conditions.setCustomValidity("Vous devez vérifier que vous acceptez les termes et conditions.");
    } else {
      conditions.setCustomValidity("");
    }
    conditions.reportValidity();

    // if (!event.target.querySelector(".text-control").value) {
    //   validateOnSubmit(submitBtn, subscription)
    // }  


    if (radio.reportValidity() && conditions.reportValidity()) {
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
      console.log({ subscription })
      alert("Merci ! Votre réservation a été reçue.");
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

// launch validations on change event
firstName.addEventListener("change", validateOnChange("#first"))
lastName.addEventListener("change", validateOnChange("#last"))
email.addEventListener("change", validateOnChange("#email"))
birthdate.addEventListener("change", validateOnChange("#birthdate"))
quantity.addEventListener("change", validateOnChange("#quantity"))

// launch subscription event
submitBtn.addEventListener("click", sendSubscription())

// TODO: CSS Mobile + desktop