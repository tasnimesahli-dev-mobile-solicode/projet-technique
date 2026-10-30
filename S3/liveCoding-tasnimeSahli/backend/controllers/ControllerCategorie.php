<?php
header('Content-Type:application/json');
require_once __DIR__ . '/../classes/GestionCategorie.php';
   class CategorieController{
    private $gestion;
    public function __construct(){
        $this->gestion=new GestionCategorie();
    }
    public function getCategorie() :void{
        $categories=$this->gestion->getCategorie();
        echo json_encode($categories);
    }
    public function addCategorie() :void{
        $input=json_decode(file_get_contents('php://input'),true);
        $newCategorie=new Categorie();
        $newCategorie->setNom($input['nom']);
        $newCategorie->setDescription($input['description']);
        $this->gestion->addCategorie($newCategorie);
        echo json_encode(['message'=>'Catégorie a ajoutée avec success']);
    }
   }
   $controller=new CategorieController();
   $method=$_SERVER['REQUEST_METHOD'];
   if($method=='POST'){
    $controller->addCategorie();
   }elseif($method=='GET'){
    $controller->getCategorie();
   }
?>