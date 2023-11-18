import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../connexion.css'; // Import du fichier de style CSS
import axios from "axios"; // Import du module axios pour effectuer des requêtes HTTP

// Composant principal Signup
const Signup = () => {
    // Utilisation du hook useState pour gérer l'état des valeurs de l'utilisateur (username et password)
    const [values, setValues] = useState({
        username: '',
        pass: ''
    });

    const navigate = useNavigate(); // Utilisation du hook useNavigate pour la navigation

    // Fonction appelée lors de la soumission du formulaire d'inscription
    function handleSubmit(event) {
        event.preventDefault();
        // Envoie une requête POST au serveur pour créer un nouveau compte utilisateur
        axios.post('http://localhost:8800/signup', values)
            .then(res => {
                // Si l'inscription est réussie, redirige vers la page de connexion
                if (res.data.Status === "Success") {
                    navigate('/login');
                } else {
                    // Affiche une alerte en cas d'échec de l'inscription
                    alert("Error");
                }
            })
            .catch(err => console.log(err));
    }

    // Rendu du composant
    return (
        <body>
            {/* Formulaire de connexion */}
            <form onSubmit={handleSubmit}>
                {/* Champ pour saisir le nom d'utilisateur */}
                <div className="signup_connexion">Inscription</div>
                <div className="group">
                    <input
                        type="text"
                        id="username"
                        placeholder="Nom d'utilisateur"
                        onChange={e => setValues({ ...values, username: e.target.value })}
                    />
                </div>
                {/* Champ pour saisir le mot de passe */}
                <div className="group">
                    <input
                        type="password"
                        name="Password"
                        placeholder="Mot de passe"
                        onChange={(e) => setValues({ ...values, pass: e.target.value })}
                    />
                </div>
                {/* Bouton de connexion */}
                <div className="group">
                    <button className="login_button">S'inscrire</button>
                </div>
                {/* Lien pour rediriger vers la page d'inscription */}
                <div className="text_redirect">
                    Vous n'avez pas de compte ? <Link to="../Login" id="link">Connectez-vous</Link>
                </div>
            </form>
        </body>
    );
}

export default Signup; // Export du composant Signup
