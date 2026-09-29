<?php
require_once'connexion.php';
if($_SERVER['REQUEST_METHOD']=='POST') {
$titre=isset($_POST['titre']) ?$_POST['titre'] :'';
$contenu=isset($_POST['contenu']) ?$_POST['contenu'] :'';
$image=isset($_FILES['image']) ?$_FILES['image'] :'';
$categorie=isset($_POST['categorie']) ?$_POST['categorie'] :'';

if($titre=='' || $contenu=='' || $image=='' || $image['error']!==0 || $categorie=='') {
    echo "Slvp remplir tout les champ";
        exit;
}
$chemin_image="images/".$image['name'];
move_uploaded_file($image['tmp_name'] , $chemin_image);
$sql=$pdo->prepare("SELECT id_categorie FROM categorie WHERE nom_categorie=?");
$sql->execute([$categorie]);
$id_categorie=$sql->fetch(PDO::FETCH_ASSOC);

$sql=$pdo->query("SELECT id_redacteur FROM redacteur LIMIT 1");
$id_redacteur=$sql->fetch(PDO::FETCH_ASSOC);

$sql=$pdo->prepare("INSERT INTO articles(titre , contenu , image , id_redacteur , id_categorie) VALUES (? , ? , ? , ? , ?)");
$sql->execute([
    $titre , $contenu , $chemin_image , $id_redacteur['id_redacteur'] , $id_categorie['id_categorie']
]);
header('location:accueil.php');
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ajouter un article</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
    <div class='Ajouter'>
        <form action='ajouter.php' method='post' enctype='multipart/form-data'>
            <label for="titre">Titre :</label>
            <input type="text" name="titre" id="titre" placeholder="EX: Art" required>
            <label for="contenu">Contenu :</label>
            <textarea name="contenu" id="contenu"  placeholder="Description" required></textarea>
            <label for="image">Choisir un image :</label>
            <input type="file" name="image" id="image" required>
            <label for="categorie">Catégorie :</label>
            <select name="categorie">
                <option value="">Choisir un catégorie</option>
                <option value="Technologie">Technologie</option>
                <option value="Sport">Sport</option>
                <option value="Voyage">Voyage</option>
                <option value="Culture">Culture</option>
            </select>
            <div class="button">
            <button type="submit">Ajouter</button>
            <a href="accueil.php">Annuler</a>
</div>
        </form>
    </div>
</body>
</html>