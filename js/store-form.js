// Save uncompleted form in local storage
function saveForm() {
    const data = [];
    formData.forEach(element => {
        const input = element.querySelectorAll("input");

        if (input.length > 0) {
            if (input[0].id.includes('checkbox')) {
                input.forEach(i => {
                    data.push({
                        id: i.id,
                        value: i.checked
                    });
                })
            } else if (input[0].id.includes('location')) {
                input.forEach(i => {
                    if (i.checked)
                        data.push({
                            id: i.id,
                            value: i.checked
                        });
                })
            } else {
                data.push({
                    id: input[0].id,
                    value: input[0].value
                });
            }
        }
    })

    localStorage.setItem("formData", JSON.stringify(data));
}

// Get uncompleted form in local storage
function getForm() {
    const data = JSON.parse(localStorage.getItem("formData"));

    if (data) {
        data.forEach(e => {
            const input = document.getElementById(e.id);
            if (input) {
                if (e.id.includes('checkbox') || e.id.includes('location'))
                    input.checked = e.value;
                else
                    input.value = e.value;
            }
        })
    }
}
