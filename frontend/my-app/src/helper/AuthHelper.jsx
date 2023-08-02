const IsConnected = async (token, userId) => {
    try {
        //on récupère les infos dans le but de les envoyer
        let user = {
            token: token,
            userId: userId,
        };

        // Appel de la fonction fetch avec toutes les informations nécessaires
        const response = await fetch(`${process.env.REACT_APP_API_URL}api/auth/isconnect`, {
            method: "post",
            headers: { "Content-Type": "application/json", "accept": "application/json" },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            return true;
        } else {
            throw new Error('la validation du token a échoué');
        }
    } catch (error) {
        console.error('Une erreur est survenue lors de la vérification du token', error);
        return false;
    }
}

export default IsConnected;