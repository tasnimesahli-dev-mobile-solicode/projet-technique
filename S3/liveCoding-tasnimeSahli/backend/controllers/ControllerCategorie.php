<?php
header('Content-Type:application/json');
require_once __DIR__ . '/../classes/GestionCategorie.php';
class CategorieController{
private $gestion;
public function __construct(){
    $this->gestion=new GestionCategorie();
}
public function getCategorie() :void{
    $categories=$this->gestion->getCategories();
    echo json_encode($categories);
}
public function addCategorie() :void{
    $input=json_decode(file_get_contents('php://input'),true);
    $categorieNew= new Categorie();
    $categorieNew->setNom($input['nom']);
    $categorieNew->setDescription($input['description']);
    $this->gestion->addCategorie($categorieNew);
    echo json_encode(['message'=>'categorie ajoutee par succes']);
}
}
$categoriecontroller=new CategorieController();
$method=$_SERVER['REQUEST_METHOD'];
if($method==='POST'){
    $categoriecontroller->addCategorie();
}
elseif($method==='GET'){
    $categoriecontroller->getCategorie();
}
?>