// Import des modules nécessaires depuis React et react-router-dom
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../books.css'; // Import du fichier de style CSS
import axios from "axios"; // Import du module axios pour effectuer des requêtes HTTP

// Fonction qui retourne la date et l'heure actuelles au format YYYY/MM/DD HH:MM:SS
function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    const hour = today.getHours();
    const min = today.getMinutes();
    const sec = today.getSeconds()
    return `${year}/${month}/${date}  ${hour}:${min}:${sec}`;
}

// Composant principal Addbook
function Addbook() {
    // Utilisation du hook useState pour gérer l'état de currentDate et values
    const [currentDate] = useState(getDate());

    const [values, setValues] = useState({
        titre: '',
        auteur: '',
        note: '',
        date: currentDate
    });

    const navigate = useNavigate(); // Utilisation du hook useNavigate pour la navigation

    axios.defaults.withCredentials = true;

    // Fonction appelée lors de la soumission du formulaire
    function handleSubmit(event) {
        event.preventDefault();
        // Utilisation d'axios pour effectuer une requête POST vers le backend
        axios.post('http://localhost:8800/addbook', values)
            .then(res => {
                // Si la requête est réussie, naviguer vers la page d'accueil
                if (res.data.Status === "Success") {
                    navigate('/Homepage');
                } else {
                    // Afficher une alerte en cas d'erreur
                    alert(res.data.Error);
                }
            })
            .catch(err => console.log(err));
    }

    // Rendu du composant
    return (
        <body>
            {/* Formulaire d'ajout de livre */}
            <form onSubmit={handleSubmit} id="form">
                <div className="add_book">Ajouter un livre</div>
                {/* Champs pour saisir le titre du livre */}
                <div className="group1">
                    <input
                        name="Titre"
                        placeholder="Titre"
                        id="input"
                        onChange={e => setValues({ ...values, titre: e.target.value })}
                    />
                </div>
                {/* Champs pour saisir l'auteur du livre */}
                <div className="group1">
                    <input
                        name="Auteur"
                        placeholder="Auteur"
                        id="input"
                        onChange={e => setValues({ ...values, auteur: e.target.value })}
                    />
                </div>
                {/* Zone de texte pour saisir la note du livre */}
                <div className="group1">
                    <textarea
                        className="note"
                        name="Note"
                        placeholder="Note"
                        id="input"
                        onChange={e => setValues({ ...values, note: e.target.value })}
                    />
                </div>
                {/* Champ en lecture seule pour afficher la date actuelle */}
                <div className="group1">
                    <input
                        type="text"
                        name="Date"
                        id="input"
                        value={currentDate}
                        readOnly
                    />
                </div>
                {/* Bouton pour soumettre le formulaire */}
                <div className="group" id="add">
                    <button className="add_button">Ajouter</button>
                </div>
            </form>
        </body>
    );
}

export default Addbook; // Export du composant Addbook
