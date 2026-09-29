<?php
require_once'requet.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>accueil</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Welcome <?php echo $articles[0]['nom_redacteur'];?></h1>
          <h2>Gérez vos articles</h2>
    <div class="articles">
        <a href="ajouter.php">Ajouter un article</a><br><br><br>
        <?php foreach ($articles as $article): ?>
            <div class="card">
        <h1><?php echo $article['titre']; ?></h1>
        <img src="<?php echo $article['image'];?>">
        <p><?php echo $article['contenu']; ?></p>
        <p><bold>Date publication :</bold><?php echo $article['date_publication']; ?></p>
        <h3><bold>Rédacteur :</bold><?php echo $article['nom_redacteur']; ?></h3>
        <h3><bold>Catégorie :</bold><?php echo $article['nom_categorie']; ?></h3>
    </div>
       <?php endforeach ;?>
    </div>

</body>
</html>