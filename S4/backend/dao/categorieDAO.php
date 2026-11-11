<?php
class CategorieDAO{
    private static $PATH_FILE= __DIR__ . '/../data/categories.json';

    public function getAll(): array {
        if (!file_exists(self::$PATH_FILE)) {
            throw new Exception('Fichier des catégories introuvable.');
        }
        $data=json_decode(file_get_contents(self::$PATH_FILE),true);
        if (!is_array($data)) {
            throw new Exception('Fichier des catégories invalide.');
        }
        return $data;
    }
    public function saveAll(array $data): void {
        if (file_put_contents(self::$PATH_FILE , json_encode($data)) === false) {
            throw new Exception("Impossible d'enregistrer la catégorie.");
        }
    }
}