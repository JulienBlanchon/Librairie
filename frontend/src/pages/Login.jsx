import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../connexion.css'; // Import du fichier de style CSS
import axios from "axios"; // Import du module axios pour effectuer des requêtes HTTP

const Login = () => {
    // Utilisation du hook useState pour gérer l'état des valeurs de l'utilisateur (username et password)
    const [values, setValues] = useState({
        username: '',
        pass: ''
    });

    const navigate = useNavigate(); // Utilisation du hook useNavigate pour la navigation

    axios.defaults.withCredentials = true;

    // Fonction appelée lors de la soumission du formulaire
    function handleSubmit(event) {
        event.preventDefault();
        console.log('Login Component - Request Data:', values); // Affiche les données de connexion dans la console
        // Envoie une requête POST au serveur pour vérifier les informations de connexion
        axios.post('http://localhost:8800/login', values)
            .then(res => {
                // Si les informations de connexion sont correctes, redirige vers la page d'accueil
                if (res.data.Status === "Success") {
                    navigate('/Homepage');
                } else {
                    // Affiche une alerte en cas d'échec de la connexion
                    alert(res.data.Error);
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
                <div className="signup_connexion">Connexion</div>
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
                    <button className="login_button">Se connecter</button>
                </div>
                {/* Lien pour rediriger vers la page d'inscription */}
                <div className="text_redirect">
                    Vous n'avez pas de compte ? <Link to="../Signup" id="link">Inscrivez-vous</Link>
                </div>
            </form>
        </body>
    )
}

export default Login; // Export du composant Login
