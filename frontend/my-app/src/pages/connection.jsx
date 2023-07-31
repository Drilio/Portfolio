import "../style/connection.css"
import { useState } from 'react'
import Banner from "../components/Banner"

export default function Connection() {
    const [login, setLogin] = useState()

    function userSignUp(event) {
        event.preventDefault()
        let email = event.target.querySelector("[name=email]").value
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        //Les caractères spéciaux, les pseudos uniquement avec des chiffres, et les pseudo de moins de 3 caractère et de plus de 20 sont interdis
        let name = event.target.querySelector("[name=username]").value
        let nameRegex = /^[a-zA-Z]{1,20}\d{0,3}$/;
        //Le mot de passe doit avoir une longueur minimale de caractères, par exemple, au moins 8 caractères & Il doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre.
        let password = event.target.querySelector("[name=password]").value
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,}$/
        if (emailRegex.test(email) && nameRegex.test(name) && passwordRegex.test(password)) {
            let user = {
                email: email,
                password: password,
                name: name
            };
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
                .then(function () {
                    // On envoie vers la page d'acueil
                    document.location.href = "./";
                })
                .catch(function (error) {
                    console.log(error);
                    window.alert("Une erreur est survenue, veuillez réessayer");
                });
        } else if (emailRegex.test(email) === false) {
            window.alert("Veuillez entrer une adresse mail valide");
        } else if (nameRegex.test(name) === false) {
            window.alert("Veuillez entrer un nom valide");
        } else if (passwordRegex.test(password) === false) {
            window.alert("Veuillez entrer un mot de passe contenant une lettre majuscule, une minuscule et un chiffre");
        }
    }


    function userLogin(event) {
        event.preventDefault()
        let email = event.target.querySelector("[name=email]").value
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let password = event.target.querySelector("[name=password]").value
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,}$/

        if (emailRegex.test(email) && passwordRegex.test(password)) {
            let user = {
                email: event.target.querySelector("[name=email]").value,
                password: password,
            }
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
        } else if (emailRegex.test(email) === false) {
            window.alert("Veuillez entrer une adresse mail valide");
        } else if (passwordRegex.test(password) === false) {
            window.alert("Veuillez entrer un mot de passe contenant une lettre majuscule, une minuscule et un chiffre");
        }

    }

    return (

        <div>
            <Banner />
            <div className="connection-form">
                <h2>CONNEXION</h2>
                <form id="my-connection-form" onSubmit={userLogin}>
                    <label htmlFor="my-connection-form-username">Email</label>
                    <input type="email" id="my-connection-form-username" placeholder="Entrer votre adresse mail" name="email" required></input>
                    <label htmlFor="my-connection-form-password">Mot de Passe</label>
                    <input id="my-connection-form-password" type="password" placeholder="Entrer le mot de passe" name="password" required></input>
                    <button type="submit" id='my-connection-form-submit' value='Connexion'>Connexion</button>
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
                    <button type="submit" id='my-signup-form-submit' value='Créer un compte'>Créer votre compte</button>
                    <p id="error-signup"></p>
                </form>
            </div>
        </div>
    )
}