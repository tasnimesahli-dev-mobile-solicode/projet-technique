<?php
class categorie {
    private int $id;
    private string $nom;
    private string $description;
// GETTER//
    public function getId() :int {
        return $this->id;
    }
    public function getNom() :string {
        return $this->nom;
    }
    public function getDescription() :string {
    return $this->description;
    }
// SETTER//
    public function setId(int $id) :void{
        $this->id=$id;
    }
    public function setNom(string $nom) :void{
        $this->nom=$nom;
    }
    public function setDescription(string $description) :void {
    $this->description = $description;
    }
}
?>