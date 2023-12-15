// --------------------------
// Vars
// --------------------------

let saveTimer = null;


// --------------------------
// Get DOM Elements
// --------------------------

const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".toggle-modal");
const formData = document.querySelectorAll(".formData");


// --------------------------
// Register events
// --------------------------

// Register events
modalBtn.forEach(btn => btn.addEventListener("click", e => toggleModal(e, btn)));


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
        }
        else {
            modalbg.style.display = "block";
            getForm();

            saveTimer = setInterval(saveForm, 5000);
        }
}
