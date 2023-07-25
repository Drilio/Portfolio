import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import "../style/header.css";
import IsConnected from './AuthHelper';

export default function Header() {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const token = window.localStorage.getItem('responseToken')
        const userId = window.localStorage.getItem('responseId')

        IsConnected(token, userId)
            .then((isValid) => {
                if (isValid === true) {
                    setIsConnected(true);
                } else {
                    setIsConnected(false);
                }
            })
            .catch((error) => {
                console.log("test isConnected false")
                setIsConnected(false)
            });
    }, [])

    function log() {
        console.log("test log")
        if (isConnected) {
            localStorage.clear();
            setIsConnected(false); // Mise à jour de l'état isConnected après la déconnexion
            document.location.href = "./";
        }
    }

    return (
        <div className="header">
            <div className="top-header">
                <nav className='nav-header'>
                    <div>
                        <ul className='menu-link'>
                            <li><NavLink to="/" id="home" className="">Accueil</NavLink></li>
                            <li><NavLink to="/portfolio" id="projects" className="">Portfolio</NavLink></li>
                            <li><NavLink to="/about" id="about" className="">A Propos</NavLink></li>
                            <li><NavLink to="/contacts" id="contacts" className="">Contacts</NavLink></li>
                        </ul>
                    </div>
                    <div>
                        <ul className='menu-connection'>
                            <div>
                                {isConnected ? (
                                    <li><NavLink to="/" id="log" onClick={log}>Déconnexion</NavLink></li>
                                ) : (
                                    <li><NavLink to="/connection" id="log" className="">Connexion</NavLink></li>
                                )}
                            </div>
                        </ul>
                    </div>

                </nav>
            </div>
        </div>
    )
}