// --------------------------
// Vars
// --------------------------

let saveTimer = null;

// --------------------------
// Get DOM Elements
// --------------------------

const modalbg = document.querySelector(".bground");
const contentOk = document.querySelector(".content-ok");
const modalBtn = document.querySelectorAll(".toggle-modal");
const formData = document.querySelectorAll(".formData");
const registerForm = document.getElementById("register-form");

// --------------------------
// Register events
// --------------------------

// Register events
modalBtn.forEach(btn => btn.addEventListener("click", e => toggleModal(e, btn)));
registerForm.addEventListener("submit", e => validate(e));
formData.forEach(el => el.querySelectorAll("input").forEach((input) =>
    input.addEventListener("input", e => validate(e, el))
));

// --------------------------
// Onclick events functions
// --------------------------

// Show menu when device are a smartphone
function editNav() {
    const x = document.getElementById("myTopnav");

    if (x.className === "topnav") x.className += " responsive";
    else x.className = "topnav";
}

// Show or hide modal
function toggleModal(e, btn) {
    if (e.target === btn)
        if (modalbg.style.display === "block") {
            modalbg.style.display = "none";

            if (saveTimer) clearInterval(saveTimer);
            saveForm();
            removeAllErrors();
        } else {
            modalbg.style.display = "block";
            contentOk.classList.remove('visible');

            getForm();
            saveTimer = setInterval(saveForm, 5000);
        }
}
