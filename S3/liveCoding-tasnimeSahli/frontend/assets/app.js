
const div = document.querySelector("#categories");
const form = document.querySelector("#formCategorie");
const tbody = document.querySelector("#tbody");
const nom = document.querySelector("#nom");
const description = document.querySelector("#description");
const buttonAjouter = document.querySelector("#ajouterBtton");
const AnnulerButton = document.querySelector("#AnnulerButton");

// DOM du Spinner
const btnSubmit = document.querySelector("#btnSubmit");
const btnText = document.querySelector("#btnText");
const spinner = document.querySelector("#spinner");

// DOM du Toast
const toast = document.querySelector("#toast");

const api = '../backend/classes/api.php';

// Ajouter Button
buttonAjouter.addEventListener("click", () => {
    form.hidden = false;
    buttonAjouter.hidden = true;
});

// Ajouter Categorie
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Afficher le Spinner
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
        }),
    })
    .then(response => response.json())
    .then(resultat => {
        // Toast de succès
        showToast("Catégorie ajoutée avec succès", "success");

        afficherCategories();
        form.reset();
        form.hidden = true;
        buttonAjouter.hidden = false;
    })
    .catch(error => {
        console.log(error);

        // Toast d'erreur
        showToast("Erreur lors de l'ajout", "error");
    })
    .finally(() => {
        // Cacher le Spinner
        btnSubmit.disabled = false;
        btnText.textContent = "Ajouter";
        spinner.classList.add("hidden");
    });
});

// Annuler
AnnulerButton.addEventListener("click", () => {
    form.reset();
    buttonAjouter.hidden = false;
    form.hidden = true;
});

// Affichage
function afficherCategories() {
    fetch(api)
    .then(response => response.json())
    .then(categories => {
        tbody.innerHTML = "";

        categories.forEach(categorie => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${categorie.id}</td>
                <td>${categorie.nom}</td>
                <td>${categorie.description}</td>
            `;

            tbody.appendChild(tr);
        });
    })
    .catch(error => console.log(error));
}

// Fonction Toast
function showToast(message, type = "success") {
    const toast2 = document.createElement("div");

    toast2.className = "text-white px-4 py-3 rounded shadow";

    if (type === "success") {
        toast2.classList.add("bg-green-500");
    } else {
        toast2.classList.add("bg-red-500");
    }

    toast2.textContent = message;
    toast.appendChild(toast2);

    setTimeout(() => {
        toast2.remove();
    }, 3000);
}

// Charger les catégories
afficherCategories();
