<?php
require_once __DIR__ .'/BaseService.php';
require_once __DIR__ .'/../classes/Categorie.php';
require_once __DIR__ .'/../DAO/CategorieDAO.php';

class  CategorieService extends BaseService{
   private categorieDAO $categorieDAO;

   public function __construct(){
    $this->categorieDAO=new CategorieDAO();
   }

   public function getCategories() :array{
    return $this->categorieDAO->getAll();
   }
   public function addCategorie(categorie $categorie) :void{
    $data=$this->categorieDAO->getAll();
    $id=count($data)+1;
    $data[]=[
        "id"=>$id,
        "nom"=>$categorie->getNom(),
        "description"=>$categorie->getDescription()
    ];
    $this->categorieDAO->saveAll($data);
   }
}