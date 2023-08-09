import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import "../style/header.css";
import IsConnected from '../helper/AuthHelper';
import { HashLink } from 'react-router-hash-link';
import Hamburger from './hamburger';

export default function Header() {
    const [isConnected, setIsConnected] = useState(false);
    const [headerClassName, setHeaderClassName] = useState('');
    const [menuStyle, setMenuStyle] = useState({ display: 'none', })
    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [menuStyleBurger, setMenuStyleBurger] = useState({ display: 'none', })

    useEffect(() => {
        const token = window.localStorage.getItem('responseToken');
        const userId = window.localStorage.getItem('responseId');

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
                    setHeaderClassName('scrolled');
                    setMenuStyle({ display: 'flex', })
                } else {
                    setHeaderClassName('');
                    setMenuStyle({ display: 'none', });
                }
            }
        }


        //Detection du changement de taille d'écran
        const updateScreenWidth = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', updateScreenWidth);

        if (hamburgerOpen) {
            setMenuStyleBurger({ display: 'flex' })
        } else if (!hamburgerOpen) {
            setMenuStyleBurger({ display: 'none' })
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', updateScreenWidth);
        };
    }, [hamburgerOpen])

    function log() {
        console.log("test log")
        if (isConnected) {
            localStorage.clear();
            setIsConnected(false); // Mise à jour de l'état isConnected après la déconnexion
            document.location.href = "/";
        }
    }

    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen);
    }

    return (
        <>
            {screenWidth < 760 ? (
                <div id='header-burger' className={hamburgerOpen ? 'header-menu-burger-open' : 'header-menu-burger'}>
                    <div className={hamburgerOpen ? "top-header-burger-open" : "top-header-burger"}>
                        <nav >
                            <div className={hamburgerOpen ? 'nav-header-burger-open' : 'nav-header-burger'}>
                                <div className={hamburgerOpen ? 'button-burger-container-open' : 'button-burger-container'} onClick={toggleHamburger} >
                                    <Hamburger isOpen={setHamburgerOpen} ></Hamburger>
                                </div>
                                <div className='hamburger-menu'>
                                    {!hamburgerOpen ? (
                                        ""
                                    ) : (
                                        <div className='container-burger-link' style={menuStyleBurger}>
                                            <ul className='menu-link-burger' id="menu-link-burger">
                                                <div className='link-list-mobil'>
                                                    <li><HashLink smooth to="/#about" id="about-link-burger" className="header-link-burger">A PROPOS</HashLink></li>
                                                    <li><HashLink smooth to="/#projects" id="projects-link-burger" className="header-link-burger">PORTFOLIO</HashLink></li>
                                                    <li><HashLink smooth to="/#contact" id="contacts-link-burger" className="header-link-burger">CONTACTS</HashLink></li>
                                                </div>
                                                <ul className='menu-connection'>
                                                    {isConnected ? (
                                                        <li><NavLink to="/" id="log-burger" className="header-link-burger" onClick={log}>DECONNEXION</NavLink></li>
                                                    ) : (
                                                        <li><NavLink to="/connection" id="log-burger" className="header-link-burger">CONNEXION</NavLink></li>
                                                    )}
                                                </ul>
                                            </ul>

                                        </div>
                                    )}
                                </div>
                            </div>
                        </nav>
                    </div>
                </div >
            ) : (
                <div id='header' className={`header ${headerClassName}`}>
                    <div className="top-header">
                        <nav >
                            <div className='nav-header'>
                                <NavLink to='/'><h1 id='header-name'>Antoine</h1></NavLink>
                                <ul className='menu-link' id="menu-link" style={menuStyle}>
                                    <li><HashLink smooth to="/#about" id="about-link" className="header-link">A PROPOS</HashLink></li>
                                    <li><HashLink smooth to="/#projects" id="projects-link" className="header-link">PORTFOLIO</HashLink></li>
                                    <li><HashLink smooth to="/#contact" id="contacts-link" className="header-link">CONTACTS</HashLink></li>
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
        </>
    )
}