// Validate form

function validate(evt, el = null) {
    evt.preventDefault();

    let isOk = true;
    formData.forEach(data => {
        if (el && data !== el) return;

        const input = data.querySelectorAll("input");
        const firstI = input[0];

        if (input.length > 0) {
            if (firstI.id.includes('location')) {
                let checked = false;
                input.forEach(i => i.checked ? checked = true : null);

                if (!checked) {
                    addError(data, 'Veuillez choisir une ville');
                    isOk = false;
                }
                else removeError(data);
            } else {
                if (firstI.type === 'checkbox') {
                    if (!firstI.checked) {
                        addError(data, 'Veuillez accepter les conditions');
                        isOk = false;
                    }
                    else removeError(data);
                } else {
                    if (firstI.type === 'text') {
                        if (!firstI.value) {
                            addError(data, 'Veuillez entrer une valeur');
                            isOk = false;
                        } else if (/[^a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ\-' ]/.test(firstI.value)) {
                            addError(data, 'Veuillez entrer uniquement des lettres');
                            isOk = false;
                        } else if (firstI.value.length < 2) {
                            addError(data, 'Veuillez entrer 2 caractères ou plus');
                            isOk = false;
                        } else if (firstI.value.length > 50) {
                            addError(data, 'Veuillez entrer 50 caractères ou moins');
                            isOk = false;
                        } else removeError(data);
                    }
                    else if (firstI.type === 'email') {
                        const re = /^[a-zA-Z0-9\.]{2,}@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
                        if (!firstI.value) {
                            addError(data, 'Veuillez entrer une valeur');
                            isOk = false;
                        } else if (!re.test(firstI.value)) {
                            addError(data, 'Veuillez entrer une adresse email valide');
                            isOk = false;
                        } else removeError(data);
                    }
                    else if (firstI.type === 'number') {
                        if (!firstI.value || firstI.valueAsNumber < 0) {
                            addError(data, 'Veuillez entrer un nombre');
                            isOk = false;
                        } else if (firstI.valueAsNumber > 200) {
                            addError(data, 'Cette valeur est trop grande');
                            isOk = false;
                        } else removeError(data);
                    }
                    else if (firstI.type === 'date') {
                        if (!firstI.value) {
                            addError(data, 'Veuillez entrer votre date de naissance');
                            isOk = false;
                        } else removeError(data);
                    }
                }
            }
        }
    })

    if (isOk && !el) {
        if (saveTimer) clearInterval(saveTimer);
        cleanInputs();
        contentOk.classList.add('visible');
    }
}

function addError(el, message) {
    el.setAttribute('data-error', message);
    el.setAttribute('data-error-visible', 'true');
}

function removeError(el) {
    el.setAttribute('data-error-visible', 'false');
    el.removeAttribute('data-error');
}

function removeAllErrors() {
    formData.forEach(data => removeError(data));
}

function cleanInputs() {
    formData.forEach(data => {
        const input = data.querySelectorAll("input");
        input.forEach(i => {
            i.value = '';
            i.checked = false;
        })
    })
}
