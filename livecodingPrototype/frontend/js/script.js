const api='../../backend/api.php';
const form=document.getElementById('formCategorie');
const annuler=document.getElementById('AnnulerButton');
const ajouter=document.getElementById('ajouterBtton');
const tbody=document.getElementById('tbody');
const nom=document.getElementById('nom');
const description=document.getElementById('description');

ajouter.addEventListener('click' , ()=>{
    form.hidden=false;
    ajouter.hidden=true;
})
annuler.addEventListener('click' , ()=>{
    form.reset();
    form.hidden=true;
    ajouter.hidden=false;
})
function afficherCategorie(){
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
           `;
           tbody.appendChild(tr);
        });
    })
    .catch(error=>console.log(error))
}
afficherCategorie();
form.addEventListener('submit' , (e)=>{
    e.preventDefault();
    fetch(api , {
        method:'POST',
        headers:{'Content-Type':'application.json'},
        body:JSON.stringify({
            nom:nom.value,
            description:description.value
        }),
    })
    .then(response=>response.json())
    .then(()=>{
        afficherCategorie();
        form.reset();
        form.hidden=true;
        ajouter.hidden=false;

    })
    .catch(error=>console.log(error))
})