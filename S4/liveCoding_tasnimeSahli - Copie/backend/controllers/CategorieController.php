<?php
header('Content-Type: application/json');

require_once __DIR__ . '/../classes/GestionCategorie.php';

class CategorieController{
    private $gestion;

    public function __construct(){
        $this->gestion = new GestionCategorie();
    }

    public function getCategories(): void{
        $categories = $this->gestion->getCategories();

        echo json_encode($categories);
    }

    public function ajouterCategories(): void{
        $input = json_decode(file_get_contents('php://input'), true);

        if (!is_array($input) ||empty($input['nom']) ||empty($input['description'])) {
            throw new Exception('Le nom et la description sont obligatoires.');
        }

        $newCategorie = new Categorie();
        $newCategorie->setNom($input['nom']);
        $newCategorie->setDescription($input['description']);

        $this->gestion->ajouterCategorie($newCategorie);

        echo json_encode(['message' => 'Catégorie ajoutée avec succès.']);
    }
}

try {
    $controller = new CategorieController();
    $method = $_SERVER['REQUEST_METHOD'];

    if ($method === 'GET') {
        $controller->getCategories();

    } elseif ($method === 'POST') {
        $controller->ajouterCategories();

    } else {
        http_response_code(405);
        echo json_encode(['error' => 'Méthode non autorisée.']);
    }

} catch (Throwable $e) {
    http_response_code(500);

    echo json_encode(['error' => $e->getMessage()]);
}