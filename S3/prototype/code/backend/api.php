<?php

header("Content-Type: application/json");

require_once "classes/categories.php";

class GestionCategorie
{
    private $path_file;

    public function __construct()
    {
        $this->path_file = "../data/categories.json";
    }

    public function getCategories(){
        $categories = file_get_contents($this->path_file);
        echo $categories;
    }

    public function ajouterCategorie(){
        $contenu = file_get_contents($this->path_file);
        $categories = json_decode($contenu, true);
        $data = json_decode(
            file_get_contents("php://input"),
            true
        );

        $categorie = new categorie();

           $categorie->setId(count($categories) + 1);
           $categorie->setNom($data["nom"]);
           $categorie->setDescription($data["description"]);

          $categories[] = [
               "id" => $categorie->getId(),
               "nom" => $categorie->getNom(),
               "description" => $categorie->getDescription()
                              ];

        file_put_contents(
            $this->path_file,
            json_encode($categories, JSON_PRETTY_PRINT)
        );

        echo json_encode($categories);
    }

    public function traiterRequete(){
        $method = $_SERVER["REQUEST_METHOD"];

        if ($method === "GET") {
            $this->getCategories();
        }

        if ($method === "POST") {
            $this->ajouterCategorie();
        }
    }
}

$api = new GestionCategorie();
$api->traiterRequete();