<?php
header('Content-Type:application/json');
require_once __DIR__ ."/classes/categorie.php";

class GestionCategories{
    private $PATH_FILE;
    public function __construct() {
        $this->PATH_FILE="data/data.json";
    }
    //getCategorie//
    public function getCategorie(){
        $data=file_get_contents($this->PATH_FILE);
        echo $data;
    }
    //AjouterCategorie//
    public function ajouterCategorie(){
        $contenu=file_get_contents($this->PATH_FILE);
        $categories=json_decode($contenu , true);
        $data=json_decode(file_get_contents("php://input"),true);
        $categorie=new categorie();
        $categorie->setId(count($categories)+1);
        $categorie->setNom($data["nom"]);
        $categorie->setDescription($data["description"]);

        $categoriee[]=[
            "id"=>$categorie->getId(),
            "nom"=>$categorie->getNom(),
            "description"=>$categorie->getDescription()
        ];
        file_put_contents($this->PATH_FILE ,json_encode($categoriee , JSON_PRETTY_PRINT));
            echo json_encode($categories);

    }
    public function traiterRequete(){
        $method=$_SERVER['REQUEST_METHOD'];
        if($method==='GET'){
            $this->getCategorie();
        }
        if($method==='POST'){
            $this->ajouterCategorie();
        }
    }
}
$api=new GestionCategories();
$api->traiterRequete();


