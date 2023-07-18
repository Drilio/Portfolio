import "../style/connection.css"

export default function Connection() {

    function userConection() {
        //On cible le bouton conexion
        let myForm = document.getElementById("my-form");
        //On met un evenement au click ou sur la touche "entrée"
        myForm.addEventListener("submit", function (event) {
            let inputs = document.getElementsByTagName("input");
            let myError;
            console.log(inputs)
            //on vérifie que les champs sont remplies
            for (let input of inputs) {
                if (!input.value) {
                    myError = "Veuillez renseigner tous les champs";
                }
            }
            //on retourne une erreur si les champs sont vides
            if (myError) {
                event.preventDefault()
                document.getElementById("error-connection").innerHTML = myError;
                document.getElementById("error-connection").style.color = "red";
                return false;
            }
            else {
                event.preventDefault()
                //on récupere les infos dans le but de les envoyer
                let user = {
                    email: event.target.querySelector("[name=email]").value,
                    password: event.target.querySelector("[name=password]").value
                };
                // Création de la charge utile au format JSON
                let chargeUtile = JSON.stringify(user);
                // Appel de la fonction fetch avec toutes les informations nécessaires
                fetch("http://localhost:5678/api/users/login", {
                    method: "post",
                    headers: { "Content-Type": "application/json", "accept": "application/json" },
                    body: chargeUtile
                })
                    //verifier qu'il y a une réponse et la renvoie en json
                    .then(function (response) {
                        if (response.ok) {
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
                        document.location.href = "./index.html";
                    })
                    // si l'authentification n'a pas fonctionné
                    .catch(function (error) {
                        console.log(error);
                        window.alert("Veuillez entrez des id corrects")
                    });
            }
        });
    }

    return (

        <div>
            <div className="connection-form">
                <h2>CONNEXION</h2>
                <form id="my-connection-form">
                    <label htmlFor="my-connection-form-username">Nom d'utilisateur</label>
                    <input type="text" id="my-connection-form-username" placeholder="Entrer le nom d'utilisateur" name="username" required></input>
                    <label htmlFor="my-connection-form-password">Mot de Passe</label>
                    <input id="my-connection-form-password" type="password" placeholder="Entrer le mot de passe" name="password" required></input>
                    <input type="submit" id='my-connection-form-submit' value='Connexion'></input>
                    <p id="error-connection"></p>
                </form>
            </div>
            <div className="signup-form">
                <h2>CREATION DE COMPTE</h2>
                <form id="my-signup-form">
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