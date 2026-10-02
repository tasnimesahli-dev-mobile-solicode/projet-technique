const api="../../backend/api.php";
const ajouterButton=document.querySelector("#nouveaucat");
const form=document.querySelector("#form");
const nom=document.querySelector("#nom");
const description=document.querySelector("#description");
const annuler=document.querySelector("#annuler");
const tbody=document.querySelector("#tbody");
const submit=document.querySelector("#submit");
ajouterButton.addEventListener("click" , ()=>{
    form.hidden=false;
    ajouterButton.hidden=true;
})
annuler.addEventListener("click" , ()=>{
    form.reset();
    form.hidden=true;
    ajouterButton.hidden=false;
})
function afficherCategorie(){
    fetch(api)
    .then(response=>response.json())
    .then(categories=>{
        tbody.innerHTML="";
        categories.forEach(categorie => {
            const tr=document.createElement('tr');
            tr.innerHTML+=`
            <td>${categorie.id}</td>
            <td>${categorie.nom}</td>
            <td>${categorie.description}</td>
            
       `
             tbody.appendChild(tr);

        });

    })
    .catch(error=>console.log)
}
afficherCategorie();
    submit.addEventListener("submit" , (e)=>{
        e.preventDefault();
         fetch(api , {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            nom:nom.value,
            description:description.value
        })})
        .then(response=>response.json)
        .then(resultat=>{
            afficherCategorie();
            form.reset();
            form.hidden=true;
            ajouterButton.hidden=false;
        })
        .catch(error=>console.log(error))

    })