<?php
$dbname='blog';
$host='localhost';
$username='root';
$password='12345678';

try {
    $pdo= new PDO("mysql:host=$host;dbname=$dbname" , $username , $password);
} catch (PDOException $e) {
    echo "ERREUR DE CONNEXION :" .$e->getMessage();
}
?>