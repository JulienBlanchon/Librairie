import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
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
    const sec = today.getSeconds();
    return `${year}/${month}/${date}  ${hour}:${min}:${sec}`;
}

// Composant principal Modifybook
function Modifybook() {
    const [currentDate] = useState(getDate()); // Utilisation du hook useState pour gérer la date actuelle
    const location = useLocation(); // Utilisation du hook useLocation pour obtenir l'URL actuelle
    
    // Extraction de l'ID du livre à partir de l'URL
    const bookId = location.pathname.split("/")[2];

    // Utilisation du hook useState pour gérer l'état des valeurs du livre (titre, auteur, note, date)
    const [values, setValues] = useState({
        titre: '',
        auteur: '',
        note: '',
        date: currentDate
    });

    const navigate = useNavigate(); // Utilisation du hook useNavigate pour la navigation
    axios.defaults.withCredentials = true;

    // Fonction appelée lors de la soumission du formulaire de modification
    function handleSubmit(event) {
        event.preventDefault();
        try {
            // Envoie une requête PUT pour modifier le livre avec l'ID spécifié
            axios.put(`http://localhost:8800/modifybook/${bookId}`, values)
                .then(() => navigate('/Homepage')) // Redirige vers la page d'accueil après la modification
                .catch(err => console.log(err));
        } catch (err) {
            console.log(err);
        }
    }

    // Rendu du composant
    return (
        <body>
            {/* Formulaire de modification de livre */}
            <form onSubmit={handleSubmit} id="form">
                <div className="add_book">Ajouter un livre</div>
                {/* Champ pour saisir le titre du livre */}
                <div className="group1">
                    <input
                        name="Titre"
                        placeholder="Titre"
                        id="input"
                        onChange={e => setValues({ ...values, titre: e.target.value })}
                    />
                </div>
                {/* Champ pour saisir l'auteur du livre */}
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
                {/* Bouton pour soumettre le formulaire de modification */}
                <div className="group" id="add">
                    <button className="add_button">Modifier</button>
                </div>
            </form>
        </body>
    );
}

export default Modifybook; // Export du composant Modifybook