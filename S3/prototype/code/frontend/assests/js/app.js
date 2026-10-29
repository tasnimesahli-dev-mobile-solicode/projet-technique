const div=document.querySelector("#categories");
const form=document.querySelector("#formCategorie");
const tbody=document.querySelector("#tbody");
const nom=document.querySelector("#nom");
const description=document.querySelector("#description");
const buttonAjouter=document.querySelector("#ajouterBtton");
const AnnulerButton=document.querySelector("#AnnulerButton");
const btnSubmit = document.querySelector("#btnSubmit");
const btnText = document.querySelector("#btnText");
const spinner = document.querySelector("#spinner");
const toast=document.getElementById('toast');
const api = '../../backend/controllers/CategorieController.php';
//Ajouter Button//
buttonAjouter.addEventListener("click" , ()=>{
    form.hidden=false;
    buttonAjouter.hidden=true;
})
function showToast(message , type='success'){
const toast2=document.createElement("div");
toast2.className="text-white px-4 py-3 rounded shadow"
if(type=='success'){
toast2.className += " bg-green-500";
} else{
toast2.className += " bg-red-500";
}
toast2.textContent=message;
toast.appendChild(toast2);
setTimeout(()=>{
    toast2.remove();
},3000)

}
// Ajouter Categorie//
form.addEventListener("submit" , (e)=>{
    e.preventDefault();
btnSubmit.disabled = true;
btnText.textContent = "Enregistrement...";
spinner.classList.remove("hidden");
spinner.classList.add("inline-block");
    fetch(api ,{
        method:"POST" ,
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            nom:nom.value ,
            description:description.value
        }),
    })
    .then(response=>response.json())
    .then(resultat=>{
    showToast("added succesfully","success")

        afficherCategories();
        form.reset();
        buttonAjouter.hidden=false;

    })
.catch(error => {console.log(error);
        showToast(error.message,"error")
})

.finally(() => {
    btnSubmit.disabled = false;
    btnText.textContent = "Ajouter";
spinner.classList.add("hidden");
spinner.classList.remove("inline-block");
});})
// Annuler//
AnnulerButton.addEventListener("click" , (e) =>{
    form.reset();
    buttonAjouter.hidden=false;
    form.hidden=true;
})
// Affichage//
function afficherCategories(){
fetch(api)
.then(response=>response.json())
.then(categories=>{
    tbody.innerHTML="";
categories.forEach(categorie => {
    const tr=document.createElement('tr');
    tr.innerHTML=`
    <td>${categorie.id}</td>
    <td>${categorie.nom}</td>
    <td>${categorie.description}</td>
    `
    tbody.appendChild(tr);
});
})
.catch(error => console.log(error))
}
afficherCategories();