
const formSection = document.querySelector("#formSection");
const form = document.querySelector("#formCategorie");
const tbody = document.querySelector("#tbody");
const emptyMessage = document.querySelector("#emptyMessage");
const nom = document.querySelector("#nom");
const description = document.querySelector("#description");
const buttonAjouter = document.querySelector("#ajouterBtton");
const AnnulerButton = document.querySelector("#AnnulerButton");

// API
const api = "../backend/controllers/ControllerCategorie.php";

// Ajouter Button
buttonAjouter.addEventListener("click", () => {
    formSection.hidden = false;
    buttonAjouter.hidden = true;
});

// Ajouter Categorie
form.addEventListener("submit", (e) => {
    e.preventDefault();

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
        afficherCategories();
        form.reset();
        formSection.hidden = true;
        buttonAjouter.hidden = false;
    })
    .catch(error => console.log(error));
});

// Annuler
AnnulerButton.addEventListener("click", () => {
    form.reset();
    buttonAjouter.hidden = false;
    formSection.hidden = true;
});

// Affichage des catégories
function afficherCategories() {
    fetch(api)
    .then(response => response.json())
    .then(categories => {
        tbody.innerHTML = "";

        if (categories.length === 0) {
            emptyMessage.hidden = false;
        } else {
            emptyMessage.hidden = true;

            categories.forEach(categorie => {
                const tr = document.createElement("tr");

                tr.innerHTML = `
                    <td class="border-b px-5 py-4">${categorie.id}</td>
                    <td class="border-b px-5 py-4">${categorie.nom}</td>
                    <td class="border-b px-5 py-4">${categorie.description}</td>
                `;

                tbody.appendChild(tr);
            });
        }
    })
    .catch(error => console.log(error));
}

// Charger les catégories
afficherCategories();
