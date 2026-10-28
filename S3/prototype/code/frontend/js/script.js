const div=document.querySelector("#categories");
const form=document.querySelector("#formCategorie");
const tbody=document.querySelector("#tbody");
const nom=document.querySelector("#nom");
const description=document.querySelector("#description");
const buttonAjouter=document.querySelector("#ajouterBtton");
const AnnulerButton=document.querySelector("#AnnulerButton");
const api='../backend/api.php';

//Ajouter Button//
buttonAjouter.addEventListener("click" , ()=>{
    form.hidden=false;
    buttonAjouter.hidden=true;
})
// Ajouter Categorie//
form.addEventListener("submit" , (e)=>{
    e.preventDefault();
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
        afficherCategories();
        form.reset();
        form.hidden=true;
        buttonAjouter.hidden=false;

    })
    .catch(error => console.log(error));
})
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