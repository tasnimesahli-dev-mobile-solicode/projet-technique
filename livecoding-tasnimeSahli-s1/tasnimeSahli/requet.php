<?php
require_once'connexion.php';
$sql=$pdo->query("SELECT titre , contenu , image , date_publication , nom_redacteur , email_redacteur , nom_categorie 
FROM articles AS a
JOIN redacteur AS r ON a.id_redacteur = r.id_redacteur
JOIN categorie AS c ON a.id_categorie = c.id_categorie");

$articles=$sql->fetchAll(PDO::FETCH_ASSOC);