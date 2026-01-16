# Tech-Native Marketplace

## Description du Projet
Ce projet est une plateforme de marketplace développée avec Node.js, Express et MongoDB. Elle permet de gérer des catégories, produits, utilisateurs et avis. L'interface utilisateur est une application web simple utilisant HTML, CSS et JavaScript.

Le projet inclut trois sections principales :
- **Dashboard Admin** : Pour ajouter des catégories, utilisateurs et produits
- **Boutique Client** : Pour visualiser et filtrer les produits
- **Espace Interaction** : Pour laisser des avis sur les produits

## Technologies Utilisées
- **Backend** :
  - Node.js
  - Express.js (framework web)
  - MongoDB (base de données)
  - Mongoose (ODM pour MongoDB)
  - CORS (pour les requêtes cross-origin)

- **Frontend** :
  - HTML5
  - CSS3
  - JavaScript (ES6+ avec async/await)

## Installation et Configuration

### Prérequis
- Node.js installé
- MongoDB installé et en cours d'exécution sur localhost:27017

### Installation
1. Cloner le repository
2. Installer les dépendances :
   ```bash
   npm install
   ```
3. Lancer le serveur :
   ```bash
   node index.js
   ```
4. Ouvrir le navigateur à l'adresse : http://localhost:3000

## Structure des Fichiers

### Backend
- **`index.js`** : Point d'entrée principal de l'application. Configure Express, CORS, connexion MongoDB et monte les routes API.
- **`package.json`** : Définit les dépendances et scripts du projet.
- **`middleware/role.js`** : Middleware pour vérifier les rôles utilisateur (admin/client). Utilisé pour protéger certaines actions comme la suppression de produits.

### Modèles (models/)
- **`Category.js`** : Schéma Mongoose pour les catégories. Contient seulement un champ `nom` de type String.
- **`Product.js`** : Schéma pour les produits avec `nom`, `prix` (avec validation min 0), `stock` et référence à une catégorie.
- **`User.js`** : Schéma pour les utilisateurs avec `username`, `email` et `role` (défaut "client").
- **`Review.js`** : Schéma pour les avis avec `commentaire`, `note` (1-5), références au produit et auteur.

### Routes (routes/)
- **`categories.js`** : Routes pour les catégories (POST pour créer, GET pour lister).
- **`products.js`** : Routes pour les produits (GET, POST, DELETE avec middleware role).
- **`users.js`** : Routes pour les utilisateurs (POST pour créer, GET pour lister).
- **`reviews.js`** : Routes pour les avis (POST pour créer, GET pour lister tous ou par produit avec populate).

### Frontend (public/)
- **`index.html`** : Structure HTML de l'application avec trois sections principales.
- **`script.js`** : Logique JavaScript pour charger les données, gérer les formulaires et interactions utilisateur.
- **`styles.css`** : Styles CSS pour une interface propre et responsive.

## API Endpoints

### Catégories
- `GET /api/categories` : Récupère toutes les catégories
- `POST /api/categories` : Crée une nouvelle catégorie (body: {nom: string})

### Produits
- `GET /api/products` : Récupère tous les produits avec populate des catégories et calcul de note moyenne
- `POST /api/products` : Crée un nouveau produit (body: {nom, prix, stock, categorie})
- `DELETE /api/products/:id` : Supprime un produit (nécessite role: "admin" dans le body)

### Utilisateurs
- `GET /api/users` : Récupère tous les utilisateurs
- `POST /api/users` : Crée un nouvel utilisateur (body: {username, email, role})

### Avis
- `GET /api/reviews` : Récupère tous les avis avec populate
- `GET /api/reviews/:productId` : Récupère les avis d'un produit spécifique
- `POST /api/reviews` : Crée un nouvel avis (body: {commentaire, note, produit, auteur})

## Fonctionnalités

### Dashboard Admin
- Ajouter des catégories
- Ajouter des utilisateurs (avec choix du rôle)
- Ajouter des produits (avec sélection de catégorie)
- Lister et supprimer des produits

### Boutique Client
- Afficher tous les produits en cartes
- Filtrage par prix maximum
- Affichage des détails : nom, prix, stock, catégorie, note moyenne
- Bouton pour voir les avis détaillés

### Espace Interaction
- Formulaire pour laisser un avis
- Sélection de l'utilisateur et du produit
- Note de 1 à 5 et commentaire

## Choix Techniques

- **MongoDB** : Base de données NoSQL flexible pour les données structurées comme les produits et avis.
- **Mongoose** : Simplifie les interactions avec MongoDB et permet les références entre collections.
- **Populate** : Utilisé dans les routes pour récupérer les données liées (catégorie d'un produit, auteur d'un avis).
- **Middleware Role** : Implémentation simple de contrôle d'accès basé sur les rôles.
- **Frontend Vanilla JS** : Pas de framework pour garder la simplicité et éviter les dépendances lourdes.
- **Async/Await** : Pour gérer les requêtes asynchrones de manière claire.

## Améliorations Possibles
- Authentification JWT pour sécuriser les endpoints
- Validation plus poussée des données (express-validator)
- Pagination pour les listes longues
- Upload d'images pour les produits
- Interface plus moderne (React/Vue)
- Tests unitaires et d'intégration
