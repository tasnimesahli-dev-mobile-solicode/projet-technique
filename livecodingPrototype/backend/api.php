<?php
header('Content-Type:application.json');
require_once 'classes/categorie.php';

class GestionCategorie{
    private string $PATH_FILE;
    public function __construct(){
        $this->PATH_FILE='data/data.json';
    }
    public function afficherCategorie(){
        $data=file_get_contents($this->PATH_FILE);
        echo $data;
    }
    public function ajouterCategorie(){
    $data=json_decode(file_get_contents($this->PATH_FILE),true);  
    $input=json_decode(file_get_contents('php://input'),true);
    $categorie=new Categorie();
    $categorie->setId(count($data)+1);
    $categorie->setNom($input['nom']);
    $categorie->setDescription($input['description']);
    $data[]=[
      "id"=>$categorie->getId(),
      "nom"=>$categorie->getNom(),
      "description"=>$categorie->getDescription()
    ];
    file_put_contents($this->PATH_FILE , json_encode($data));
        echo json_encode($data);
    }
    public function traitementRequette(){
        $method=$_SERVER['REQUEST_METHOD'];
        if($method=='POST'){
            $this->ajouterCategorie();
        }
        if($method=='GET'){
            $this->afficherCategorie();
        }
    }
}
$traitement=new GestionCategorie();
$traitement->traitementRequette();
?>