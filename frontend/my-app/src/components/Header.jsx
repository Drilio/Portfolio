import { NavLink } from 'react-router-dom'
import "../style/header.css"

import { useEffect } from 'react'

export default function Header() {
    //créer un "helper" (un autre dossier) qui récupère le token du localStorage qui le décode en faisant un fetch, qui return si oui ou non
    function editMode() {
        // On va chercher les infos sur le localStorage
        let userToken = window.localStorage.getItem("responseToken");

        // on verifie que ça fait - de 24h00 que l'utilisateur c'est connecté 
        let lastConexion = window.localStorage.getItem('DerniereConnexion');
        let now = new Date();
        let createdAt = new Date(Date.parse(lastConexion.toString()));
        let oneDay = 24 * 60 * 60 * 1000;
        if ((now - createdAt) > oneDay) {
            const error = {
                User: 'Session has expired, please reconect',
            };
            window.alert(error);

        } else if (userToken) {
            //on regarde s'il existe bien un Token en local storage et si c'est le cas on active le mode édition
            // On fait apparaitre la partie edition du haut de la page
            let sectionEdit = document.querySelector(".edit");
            sectionEdit.setAttribute("style", "display : flex");
            //on transforme login en logout
            let login = document.getElementById('connection');
            login.setAttribute("style", "display : none");
            let logout = document.getElementById("logout");
            logout.setAttribute("style", "display : flex");
        }
    }

    // useEffect(() => {
    //     editMode()
    // })


    function logout() {
        console.log("test logout")
        let logout = document.getElementById('logout');
        let userToken = window.localStorage.getItem("responseToken");
        logout.addEventListener('click', function (e) {
            if (userToken) {
                e.preventDefault();
                localStorage.clear();
                document.location.href = "./"
            }
        })
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
                            <li><NavLink to="/connection" id="connection" className="">Connexion</NavLink></li>
                            <li id="logout"><button onClick={logout}>Deconnexion</button></li>
                            <div className='edit'>
                                <li><NavLink to="/add-projects" id="addprojects" className="">Ajouter un projet</NavLink></li>
                                <li><NavLink to="/add-languages" id='addlanguage'>Ajouter un language</NavLink></li>
                            </div>

                        </ul>
                    </div>

                </nav>
            </div>
        </div>
    )
}