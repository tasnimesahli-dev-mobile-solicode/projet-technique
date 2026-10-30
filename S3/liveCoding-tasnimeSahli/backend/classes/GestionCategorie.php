<?php 
require_once __DIR__ ."/Categorie.php";
class GestionCategorie{
    private static $PATH_FILE=__DIR__.'/../data/categories.json';
    public function getCategorie() :array{
    $data=json_decode(file_get_contents(self::$PATH_FILE),true);
    $categories=[];
    foreach($data as $cat){
        $categories[]=[
            'id'=>$cat['id'],
            'nom'=>$cat['nom'],
             'description'=>$cat['description']
        ];
    }
    return $categories;
    }
    public function addCategorie(Categorie $categorie) :void{
            $data=json_decode(file_get_contents(self::$PATH_FILE),true);
            $id=count($data)+1;
            $data[]=[
                'id'=>$id,
                'nom'=>$categorie->getNom(),
                'description'=>$categorie->getDescription()
            ];
            file_put_contents(self::$PATH_FILE , json_encode($data),JSON_PRETTY_PRINT);
    }
}
?>