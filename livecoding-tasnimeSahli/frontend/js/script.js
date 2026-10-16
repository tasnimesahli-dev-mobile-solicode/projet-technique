const api='../../backend/api.php';
const add=document.getElementById('nouveaucat');
const annuler=document.getElementById('annuler');
const form=document.getElementById('form');
const tbody=document.getElementById('tbody');
add.addEventListener('click' , ()=>{
    form.hidden=false;
    add.hidden=true;
})
annuler.addEventListener('click' , ()=>{
    form.reset();
    form.hidden=true;
    add.hidden=false;
})
function getCategorie(){
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
    .catch(error=>console.error(error))
}
getCategorie();
form.addEventListener('submit' , (e)=>{
    e.preventDefault();
    const nom=document.getElementById('nom').value;
    const description=document.getElementById('description').value;
    fetch(api , {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            nom:nom,
            description:description
        })
    })
    .then(response=>response.json())
    .then(()=>{
        getCategorie();
        form.reset();
        form.hidden=true;
        add.hidden=false;
    })
    .catch(error=>console.error(error))
})