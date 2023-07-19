
import { useState, useEffect } from 'react'

export default function IsConnected() {

    const [IsConnected, setIsConnected] = useState()

    function fetchIsConnected() {

        //on récupere les infos dans le but de les envoyer
        let user = {
            userToker: window.localStorage.getItem('responseToken'),
            userId: window.localStorage.getItem('responseId'),
        };
        console.log(user)
        // Appel de la fonction fetch avec toutes les informations nécessaires
        fetch("http://localhost:3000/api/auth/isconnect", {
            method: "post",
            headers: { "Content-Type": "application/json", "accept": "application/json" },
            body: JSON.stringify(user)
        })
            .then(function (response) {
                if (response.ok) {
                    setIsConnected(true);
                }
            })
            .catch(function (error) {
                console.log(error);
                setIsConnected(false);
            })
    }

    useEffect(() => {
        fetchIsConnected()
    })
}