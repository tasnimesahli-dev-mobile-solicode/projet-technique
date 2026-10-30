const formSection = document.querySelector("#formSection");
const form = document.querySelector("#formCategorie");
const tbody = document.querySelector("#tbody");
const emptyMessage = document.querySelector("#emptyMessage");
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

    // Bloquer le bouton
    btnSubmit.disabled = true;

    // Afficher le Spinner
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
         showToast("Catégorie a ajouter avec success" , "success");

        afficherCategories();
        form.reset();
        formSection.hidden = true;
        buttonAjouter.hidden = false;
    })
    .catch(error => {
        console.log(error);
        showToast("Erreur lors de ajoute","error")
    })
    .finally(()=>{
        btnSubmit.disabled=false;
        btnText.textContent="Ajouter";
        spinner.classList.add("hidden")
    })
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


   function showToast(message ,type="success"){
      const toast2=document.createElement('div');
      toast2.className="text-white px-4 py-3 rounded shadow";
      if(type==="success"){
        toast2.classList.add("bg-green-500");
      }else{
        toast2.classList.add("bg-red-500");
      }
      toast2.textContent=message;
      toast.appendChild(toast2);
      setTimeout(()=>{toast2.remove();},3000)
   }

// Charger les catégories
afficherCategories();
