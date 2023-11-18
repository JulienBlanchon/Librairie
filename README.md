Librairie en Ligne

Présentation
Librairie en Ligne est une application de gestion de bibliothèque personnelle permettant aux utilisateurs de créer, modifier et supprimer des livres. L'application utilise une base de données MySQL pour stocker les informations sur les livres et les utilisateurs.

Configuration de la Base de Données avec XAMPP
Étapes pour la création de la base de données :
Installation de XAMPP :

Téléchargez et installez XAMPP sur votre machine.
Démarrage d'Apache et MySQL :

Lancez XAMPP et démarrez les services Apache et MySQL.
Accéder à phpMyAdmin :

Ouvrez votre navigateur web et accédez à http://localhost/phpmyadmin.
Création de la Base de Données :

Cliquez sur "Nouvelle" dans le panneau de gauche.
Nommez la base de données "librairie" et choisissez l'encodage (par exemple, utf8mb4_unicode_ci).
Cliquez sur "Créer".
Importation du Schéma :

Allez dans l'onglet "Importer".
Sélectionnez le fichier SQL fourni avec l'application (schema.sql).
Cliquez sur "Exécuter".
Utilisation de l'Application

Lancer l'application cote backend via le terminal en tapant 
cd backend 
npm start 

Lancer l'application cote frontend via le terminal en tapant 
cd frontend
npm start

1. Connexion au Compte Préexistant
Accédez à l'application à l'adresse http://localhost:3000/login.
Utilisez les informations suivantes :
Nom d'utilisateur : User
Mot de passe : 1234
Cliquez sur "Se connecter".

2. Vous pouvez aussi crrer votre compte
Accédez à l'adresse http://localhost:3000/Signup.
Renseigner un identifiant et un mot de passe
Cliquez sur "S'inscrire"

3. Ajout d'un Livre
Une fois connecté, accédez à la page d'accueil http://localhost:3000/homepage.
Cliquez sur le bouton "+" pour ajouter un nouveau livre.
Remplissez les informations demandées et cliquez sur "Ajouter".

4. Modification d'un Livre
Sur la page d'accueil, chaque livre a un bouton "Modifier".
Cliquez sur le bouton "Modifier" pour mettre à jour les informations du livre.

5. Suppression d'un Livre
Sur la page d'accueil, chaque livre a un bouton "Supprimer".
Cliquez sur le bouton "Supprimer" pour retirer le livre de la bibliothèque.