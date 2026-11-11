<?php
require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../classes/Categorie.php';
require_once __DIR__ . '/../dao/categorieDAO.php';

class ServiceCategorie extends BaseService{
    private CategorieDAO $categorieDao;

    public function __construct(){
        $this->categorieDao = new CategorieDAO();
    }

    public function getCategories(): array {
        $data=$this->categorieDao->getAll();
        $categories=[];
        foreach($data as $cat){
        $categories[]=[
            'id'=>$cat['id'],
            'nom'=>$cat['nom'],
            'description'=>$cat['description']
        ];}
        return $categories; 
    }
    public function ajouterCategorie(Categorie $categorie): void {
      $data=$this->categorieDao->getAll();
      $id=count($data)+1;
      $data[]=[
        'id'=>$id,
        'nom'=>$categorie->getNom(),
        'description'=>$categorie->getDescription()
      ];
      $this->categorieDao->saveAll($data);
}
}