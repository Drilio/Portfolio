const IsConnected = async (token, userId) => {
    try {
        //on récupère les infos dans le but de les envoyer
        let user = {
            token: token,
            userId: userId,
        };

        // Appel de la fonction fetch avec toutes les informations nécessaires
        const response = await fetch("http://localhost:3000/api/auth/isconnect", {
            method: "post",
            headers: { "Content-Type": "application/json", "accept": "application/json" },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            console.log("ok")
            const data = await response.json();
            return true;
        } else {
            console.log("not ok")
            throw new Error('la validation du token a échoué');
        }
    } catch (error) {
        console.error('Une erreur est survenue lors de la vérification du token', error);
        return false;
    }
}

export default IsConnected;