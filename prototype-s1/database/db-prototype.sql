CREATE DATABASE blog;
USE blog;
CREATE TABLE redacteur (
    id_redacteur INT AUTO_INCREMENT PRIMARY KEY,
    nom_redacteur VARCHAR(100) NOT NULL,
    email_redacteur VARCHAR(150) NOT NULL UNIQUE
);
CREATE TABLE categorie (
    id_categorie INT AUTO_INCREMENT PRIMARY KEY,
    nom_categorie VARCHAR(300) NOT NULL UNIQUE
);
CREATE TABLE articles (
    id_article INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(150) NOT NULL,
    contenu TEXT NOT NULL,
    image VARCHAR(300) NOT NULL,
    date_publication DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_redacteur INT NOT NULL,
    id_categorie INT NOT NULL,
    FOREIGN KEY (id_redacteur) REFERENCES redacteur(id_redacteur),
    FOREIGN KEY (id_categorie) REFERENCES categorie(id_categorie)
);
INSERT INTO redacteur (nom_redacteur, email_redacteur)
VALUES ('Sara Elmoutaouakil', 'sara@gmail.com');
INSERT INTO articles (titre, contenu, image, id_redacteur, id_categorie)
VALUES
('Les nouvelles technologies en 2026',
 'Les nouvelles technologies continuent de transformer notre quotidien et notre façon de travailler.',
 'images/technologie.jpg',
 1,
 1),

('Les bienfaits du sport',
 'La pratique régulière du sport aide à améliorer la condition physique et le bien-être.',
 'images/sport.jpg',
 1,
 2),

('Les destinations à découvrir',
 'Voyager permet de découvrir de nouvelles cultures, de nouveaux paysages et de nouvelles expériences.',
 'images/voyage.jpg',
 1,
 3),

('La richesse de la culture marocaine',
 'La culture marocaine se caractérise par sa diversité, ses traditions et son patrimoine.',
 'images/culture.jpg',
 1,
 4);
 INSERT INTO categorie (nom_categorie)
VALUES('Technologie'),('Sport'),('Voyage'),('Culture');