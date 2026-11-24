<?php
header('Content-Type: application/json');

require_once __DIR__. '/../service/CategorieService.php';

class CategorieController{
    private $gestion;

    public function __construct(){
        $this->gestion = new CategorieService();
    }

    public function getCategories(): void{
        $categories = $this->gestion->getCategories();

        echo json_encode($categories);
    }

    public function ajouterCategories(): void{
        $input = json_decode(file_get_contents('php://input'), true);

        if (!is_array($input) ||strlen($input['nom'])<4||strlen($input['description'])<4) {
            throw new Exception('Le mot doit etre contient au moin 4 littre.');
        }
        
        $newCategorie = new Categorie();
        $newCategorie->setNom($input['nom']);
        $newCategorie->setDescription($input['description']);

        $this->gestion->addCategorie($newCategorie);

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