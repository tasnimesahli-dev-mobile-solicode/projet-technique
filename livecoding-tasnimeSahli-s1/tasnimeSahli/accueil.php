<?php
require_once'requet.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accueil</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Welcome <?php echo $articles[0]['nom_redacteur']?></h1>
        <a href='ajouter.php'>Ajouter un article </a>
            <div class="articles">
        <?php foreach($articles as $article): ?>
            <div class="card">
            <h2><?php echo $article['titre'] ?></h1>
            <img src="<?php echo $article['image']?>">
            <p><?php echo $article['contenu']?></p>
            <h4>Date de publication : <?php echo $article['date_publication'] ?></h4>
            <h4>Rédacteur : <?php echo $article['nom_redacteur']?></h4>
            <h4>Email : <?php echo $article['email_redacteur']?></h4>
            <h4> Catégorie : <?php echo $article['nom_categorie']?></h4>
            </div>
            <?php endforeach ; ?>
</div>
</body>
</html>