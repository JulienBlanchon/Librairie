// Importation des modules et packages nécessaires
import express from "express";
import mysql from "mysql";
import cors from "cors";
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import jwt from "jsonwebtoken";

// Déclaration de la variable globale id_user
var id_user;

// Configuration du sel pour le hachage des mots de passe
const salt = 10;

// Création de l'application Express
const app = express();

// Middleware pour traiter les données au format JSON
app.use(express.json());

// Middleware pour gérer les requêtes CORS
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true
}));

// Middleware pour traiter les cookies
app.use(cookieParser());

// Configuration de la connexion à la base de données MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "librairie"
});

// Endpoint pour récupérer les livres de l'utilisateur actuellement connecté
app.get("/homepage", (req, res) => {
    const sql = "SELECT * FROM books WHERE ID_user = ?";

    db.query(sql, [id_user], (err, data) => {
        if (err) return res.json({ Error: "Erreur d'appel à la base de données" });
        return res.json(data);
    });
});

// Endpoint pour l'inscription d'un nouvel utilisateur
app.post('/signup', (req, res) => {
    const sql = "INSERT INTO users (`username`,`pass`) VALUES (?)";

    // Hachage du mot de passe avant de l'insérer dans la base de données
    bcrypt.hash(req.body.pass.toString(), salt, (err, hash) => {
        if (err) return res.json({ Error: "Erreur lors du hachage du mot de passe" });

        const values = [
            req.body.username,
            hash
        ];

        db.query(sql, [values], (err, result) => {
            if (err) return res.json({ Error: "Erreur d'insertion dans la base de données" });
            return res.json({ Status: "Success" });
        });
    });
});

// Endpoint pour la connexion d'un utilisateur existant
app.post("/login", (req, res) => {
    const sql = "SELECT * FROM users WHERE username = ?";

    db.query(sql, [req.body.username], (err, data) => {
        if (err) return res.json("Erreur");

        if (data.length > 0) {
            // Comparaison du mot de passe haché avec celui fourni par l'utilisateur
            bcrypt.compare(req.body.pass.toString().trim(), data[0].pass, (err, response) => {
                if (err) return res.json({ Error: "Problème de comparaison de mot de passe" });

                if (response) {
                    id_user = data[0].ID_user;
                    const username = data[0].username;
                    const token = jwt.sign({ username }, "jwt-secret-key", { expiresIn: '1d' });
                    res.cookie('token', token);
                    return res.json({ Status: "Success" });
                } else {
                    return res.status(401).json({ Error: "Mauvais mot de passe" });
                }
            });
        } else {
            return res.json("Vous n'avez pas de compte");
        }
    });
});

// Endpoint pour l'ajout d'un nouveau livre à la bibliothèque de l'utilisateur
app.post('/addbook', (req, res) => {
    const sql = "INSERT INTO books (`Title`,`Author`,`Note`,`Last_Modification`,`ID_user`) VALUES (?)";

    const values = [
        req.body.titre,
        req.body.auteur,
        req.body.note,
        req.body.date,
        id_user
    ];

    db.query(sql, [values], (err, result) => {
        if (err) return res.json({ Error: "Erreur d'insertion dans la base de données" });
        return res.json({ Status: "Success" });
    });
});

// Endpoint pour la suppression d'un livre de la bibliothèque de l'utilisateur
app.delete("/homepage/:id", (req, res) => {
    const bookId = req.params.id;
    const sql = "DELETE FROM books WHERE ID_book = ?";

    db.query(sql, [bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Le livre a été supprimé");
    });
});

// Endpoint pour la modification d'un livre dans la bibliothèque de l'utilisateur
app.put("/modifybook/:id", (req, res) => {
    const bookId = req.params.id;
    const sql = "UPDATE `books` SET `Title`= ? ,`Author`= ? ,`Note`= ? ,`Last_Modification`= ? ,`ID_user`= ? WHERE ID_book = ?";

    const values = [
        req.body.titre,
        req.body.auteur,
        req.body.note,
        req.body.date,
        id_user
    ];

    db.query(sql, [...values, bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Le livre a été modifié");
    });
});

// Écoute du serveur sur le port 8800
app.listen(8800, () => {
    console.log("Connected to backend!365");
});
