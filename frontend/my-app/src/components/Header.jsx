import { NavLink } from 'react-router-dom'
import "../style/header.css"

export default function Header() {

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