
const formSection = document.querySelector("#formCategorie");
const form = formSection;
const tbody = document.querySelector("#tbody");
const emptyMessage = document.querySelector("#emptyMessage");

const nom = document.querySelector("#nom");
const description = document.querySelector("#description");

const buttonAjouter = document.querySelector("#ajouterBtton");
const AnnulerButton = document.querySelector("#AnnulerButton");

const api = "/../backend/controller/CategorieController.php";

const btnSubmit = document.querySelector("#btnSubmit");
const btnText = document.querySelector("#btnText");
const spinner = document.querySelector("#spinner");

const toast = document.querySelector("#toast");

// Afficher le formulaire
buttonAjouter.addEventListener("click", () => {
    formSection.hidden = false;
    buttonAjouter.hidden = true;
});

// Ajouter une catégorie
form.addEventListener("submit", (e) => {
    e.preventDefault();

    btnSubmit.disabled = true;
    btnText.textContent = "Enregistrement...";
    spinner.classList.remove("hidden");

    fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nom: nom.value,
            description: description.value
        })
    })
    .then(response => response.json())
    .then(resultat => {
        if (resultat.error) {
            throw new Error(resultat.error);
        }

        afficherCategories();
        form.reset();
        formSection.hidden = true;
        buttonAjouter.hidden = false;

        showToast("Catégorie ajoutée avec succès", "success");
    })
    .catch(error => {
        console.log(error);
        showToast(error.message, "error");
    })
    .finally(() => {
        btnSubmit.disabled = false;
        btnText.textContent = "Ajouter";
        spinner.classList.add("hidden");
    });
});

// Annuler
AnnulerButton.addEventListener("click", () => {
    form.reset();
    formSection.hidden = true;
    buttonAjouter.hidden = false;
});

// Afficher les catégories
function afficherCategories() {
    fetch(api)
    .then(response => response.json())
    .then(categories => {
        tbody.innerHTML = "";
        emptyMessage.hidden = categories.length !== 0;

        categories.forEach(categorie => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td class="border-b px-5 py-4">${categorie.id}</td>
                <td class="border-b px-5 py-4">${categorie.nom}</td>
                <td class="border-b px-5 py-4">${categorie.description}</td>
            `;

            tbody.appendChild(tr);
        });
    })
    .catch(error => console.log(error));
}

// Afficher un message
function showToast(message, type = "success") {
    const toastMessage = document.createElement("div");

    toastMessage.className = "text-white px-4 py-3 rounded shadow";

    if (type === "success") {
        toastMessage.classList.add("bg-green-500");
    } else {
        toastMessage.classList.add("bg-red-500");
    }

    toastMessage.textContent = message;
    toast.appendChild(toastMessage);

    setTimeout(() => {
        toastMessage.remove();
    }, 3000);
}

// Charger les catégories
afficherCategories();
