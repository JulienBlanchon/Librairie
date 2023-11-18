// Import des modules nécessaires
import axios from "axios";
import React, { useState, useEffect } from "react";
import '../homepage.css'; // Import du fichier de style CSS
import { Link, useNavigate } from "react-router-dom";

// Définition du composant Homepage
const Homepage = () => {
    const navigate = useNavigate(); // Utilisation du hook useNavigate pour la navigation

    // Fonction pour naviguer vers la page d'ajout de livre
    const addbook = () => {
        navigate('/Addbook');
    };

    // Utilisation du hook useState pour gérer l'état de la liste des livres
    const [books, setBooks] = useState([]);

    // Utilisation du hook useEffect pour effectuer une action après le rendu initial du composant
    useEffect(() => {
        // Fonction asynchrone pour récupérer la liste de tous les livres depuis le backend
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8800/homepage");
                console.log(res.data); // Affiche les données récupérées dans la console
                setBooks(res.data); // Met à jour l'état avec les livres récupérés
            } catch (err) {
                console.log(err); // Affiche les erreurs éventuelles dans la console
            }
        };

        fetchAllBooks(); // Appel de la fonction asynchrone pour récupérer les livres
    }, []); // Le tableau vide [] signifie que cette action n'a lieu qu'après le premier rendu du composant

    // Fonction pour gérer la suppression d'un livre en fonction de son ID
    const handleDelete = async (ID_book) => {
        try {
            await axios.delete("http://localhost:8800/homepage/" + ID_book);
            window.location.reload(); // Recharge la page pour refléter les changements après la suppression
        } catch (err) {
            console.log(err);
        }
    };

    // Rendu du composant
    return (
        <div className="books">
            {/* Mapping à travers la liste des livres et affichage de chaque livre */}
            {books.map((book) => (
                <div className="book" key={book.ID_book}>
                    <h1 id="titre">{book.Title}</h1>
                    <h1 id="auteur">{book.Author}</h1>
                    <h1 id="note">{book.Note}</h1>
                    {/* Affichage de la date au format local "fr-FR" */}
                    <h1 id="date">{new Date(book.Last_Modification).toLocaleString('fr-FR')}</h1>
                    <div>
                        {/* Bouton de modification avec un lien vers la page de modification */}
                        <button className="buttons" id="mods">
                            <Link to={`/Modifybook/${book.ID_book}`} id="mod">Modifier</Link>
                        </button>
                        {/* Bouton de suppression avec la gestion de l'événement onClick */}
                        <button className="buttons" id="supp" onClick={() => handleDelete(book.ID_book)}>
                            Supprimer
                        </button>
                    </div>
                </div>
            ))}
            {/* Bouton d'ajout de livre avec la gestion de l'événement onClick */}
            <div className="book"><button className="add" onClick={addbook}>+</button></div>
        </div>
    );
};

export default Homepage; // Export du composant Homepage
