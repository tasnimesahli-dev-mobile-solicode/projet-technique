<?php
header('Content-Type:application/json');
require_once __DIR__ .'/classes/categorie.php';
class GestionCategorie{
    private $PATH_FILE;
    public function __construct(){
        $this->PATH_FILE=__DIR__ .'/data/data.json';
    }

    public function getCategorie(){
        $categories=file_get_contents($this->PATH_FILE);
        echo $categories;
    }

    public function addCategorie(){
        $categories=json_decode(file_get_contents($this->PATH_FILE),true);
        $input=json_decode(file_get_contents('php://input'),true);
        $newCat=new Categorie();
        $newCat->setId(count($categories)+1);
        $newCat->setNom($input['nom']);
        $newCat->setDescription($input['description']);

        $categories[]=[
            "id"=>$newCat->getId(),
            "nom"=>$newCat->getNom(),
             "description"=>$newCat->getDescription()
        ];
        $update=json_encode($categories);
        file_put_contents($this->PATH_FILE , $update);
        echo $update;
    }
    public function traitementRequette(){
        $methode=$_SERVER['REQUEST_METHOD'];
        if($methode==='GET'){
           $this-> getCategorie();
        }if($methode==='POST'){
            $this->addCategorie();
        }
    }
}
$gestion=new GestionCategorie();
$gestion->traitementRequette();