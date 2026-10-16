<?php
class Categorie{
    private int $id;
    private string $nom;
    private string $description;
    public function getId() :int{
        return $this->id;
    }
    public function getNom() :string{
        return $this->nom;
    }
    public function getDescription() :string{
        return $this->description;
    }
    public function setId(int $id){
        $this->id=$id;
    }
    public function setNom(string $nom){
        $this->nom=$nom;
    }
    public function setDescription(string $description){
        $this->description=$description;
    }
}