import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import "../style/header.css";
import IsConnected from './AuthHelper';

export default function Header() {
    const [isConnected, setIsConnected] = useState(false);
    const [headerClassName, setHeaderClassName] = useState('');
    const [menuStyle, setMenuStyle] = useState({ display: 'none', })

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

        //Detection du scroll pour mettre en page le header
        function handleScroll() {
            const targetElement = document.getElementById('your-target-element-id');
            if (targetElement) {
                const { top } = targetElement.getBoundingClientRect();
                if (top <= 0) {
                    console.log('User has scrolled to the precise point on the page');
                    setHeaderClassName('scrolled');
                    setMenuStyle({ display: 'flex' })
                } else {
                    setHeaderClassName('');
                    setMenuStyle({ display: 'none' });
                }
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
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
        <div id='header' className={`header ${headerClassName}`}>
            <div className="top-header">
                <nav >
                    <div className='nav-header'>
                        <h1 id='header-name'>Antoine</h1>
                        <ul className='menu-link' style={menuStyle}>
                            <li><NavLink to="/" id="projects" className="header-link">PORTFOLIO</NavLink></li>
                            <li><NavLink to="/about" id="about" className="header-link">A PROPOS</NavLink></li>
                            <li><NavLink to="/contacts" id="contacts" className="header-link">CONTACTS</NavLink></li>
                            <ul className='menu-connection'>
                                {isConnected ? (
                                    <li><NavLink to="/" id="log" className="header-link" onClick={log}>DECONNEXION</NavLink></li>
                                ) : (
                                    <li><NavLink to="/connection" id="log" className="header-link">CONNEXION</NavLink></li>
                                )}
                            </ul>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    )
}