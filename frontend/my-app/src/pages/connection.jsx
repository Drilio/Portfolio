import "../style/connection.css"
import { useState } from 'react'

export default function Connection() {
    const [login, setLogin] = useState()

    function userSignUp(event) {
        event.preventDefault()
        //on récupere les infos dans le but de les envoyer
        let user = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value,
            name: event.target.querySelector("[name=username]").value
        };
        console.log(user)
        // Appel de la fonction fetch avec toutes les informations nécessaires
        fetch("http://localhost:3000/api/auth/signup", {
            method: "post",
            headers: { "Content-Type": "application/json", "accept": "application/json" },
            body: JSON.stringify(user)
        })
            //verifier qu'il y a une réponse et la renvoie en json
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
            })
            //redirection vers la home page
            // .then(document.location.href = "./")
            // si l'authentification n'a pas fonctionné
            .catch(function (error) {
                console.log(error);
                window.alert("Une erreur est survenue, veuillez réessayer")
            });

    }


    function userLogin(event) {
        event.preventDefault()
        let user = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value,
        };
        // Création de la charge utile au format JSON
        let chargeUtile = JSON.stringify(user);
        console.log(chargeUtile)
        // Appel de la fonction fetch avec toutes les informations nécessaires
        fetch("http://localhost:3000/api/auth/login", {
            method: "post",
            headers: { "Content-Type": "application/json", "accept": "application/json" },
            body: chargeUtile
        })
            //verifier qu'il y a une réponse et la renvoie en json
            .then(function (response) {
                if (response.ok) {
                    setLogin(true);
                    console.log(login)
                    return response.json();
                }
            })
            //traitement de la réponse
            .then(function (contenu) {
                //on nettoie le local storage
                localStorage.clear();
                // on met dans le local storage le Token et l'Id du user
                localStorage.setItem("responseToken", contenu.token);
                localStorage.setItem("responseId", contenu.userId);
                //on récupère l'heure et la date et on les sauvegardes dans le localStorage
                localStorage.setItem("DerniereConnexion", new Date());
                // On envoie vers la page d'acueil
                document.location.href = "./";
            })
            // si l'authentification n'a pas fonctionné
            .catch(function (error) {
                console.log(error);
                window.alert("Veuillez entrez des id corrects")
            });
    }

    return (

        <div>
            <div className="connection-form">
                <h2>CONNEXION</h2>
                <form id="my-connection-form" onSubmit={userLogin}>
                    <label htmlFor="my-connection-form-username">Email</label>
                    <input type="email" id="my-connection-form-username" placeholder="Entrer le nom d'utilisateur" name="email" required></input>
                    <label htmlFor="my-connection-form-password">Mot de Passe</label>
                    <input id="my-connection-form-password" type="password" placeholder="Entrer le mot de passe" name="password" required></input>
                    <input type="submit" id='my-connection-form-submit' value='Connexion'></input>
                    <p id="error-connection"></p>
                </form>
            </div>
            <div className="signup-form">
                <h2>CREATION DE COMPTE</h2>
                <form id="my-signup-form" onSubmit={userSignUp}>
                    <label htmlFor="my-signup-form-email">Email</label>
                    <input type="email" id="my-signup-form-email" placeholder="Entrer votre adresse mail" name="email" required></input>
                    <label htmlFor="my-signup-form-username">Nom d'utilisateur</label>
                    <input type="text" id="my-signup-form-username" placeholder="Entrer le nom d'utilisateur" name="username" required></input>
                    <label htmlFor="my-signup-form-password">Mot de Passe</label>
                    <input id="my-signup-form-password" type="password" placeholder="Entrer le mot de passe" name="password" required></input>
                    <input type="submit" id='my-signup-form-submit' value='Créer un compte'></input>
                    <p id="error-signup"></p>
                </form>
            </div>
        </div>
    )
}