import Projects from "../components/Projects"
import { useState, useEffect } from 'react'
import "../style/portfolio.css"
import IsConnected from '../helper/AuthHelper';
import Modal from '../components/Modal';
import Languages from "../components/Languages";
import AboutMe from "../components/AboutMe";
import ContactForm from "../components/ContactForm";
import Banner from '../components/Banner';


export default function Portfolio() {
    const [languages, setLanguages] = useState([])
    const [isConnected, setIsConnected] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('A');
    const [imageUrl, setImageUrl] = useState('');
    const [nameLanguage, setNameLanguage] = useState('')
    const [imageLanguageUrl, setImageLanguageUrl] = useState('');
    const [formLanguage, setFormLanguage] = useState(false)
    const [filtersNames, setFiltersNames] = useState([])
    const [isLoad, setIsLoad] = useState('')
    // Ajouter un state is Loging qui permet d'activé un rechargement sans rechargé la page 

    //verficiation de la connexion
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
    }, [isLoad])

    //import des langages depuis la base de donnée
    const fetchLanguagesData = () => {
        fetch(`${process.env.REACT_APP_API_URL}api/languages`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setLanguages(data)
                const languageNames = data.map(language => language.Name);
                setFiltersNames(languageNames);
            })
            .catch(error => {
                console.error('Error fetching languages:', error);
            });
    }

    useEffect(() => {
        fetchLanguagesData()
    }, [])


    //gestion de la modal d'ajout
    const handleOpenModal = (type) => {
        setModalType(type);
        setModalOpen(true);
        let header = document.getElementById('header')
        header.style.display = "none"
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setFormLanguage(false);
        let header = document.getElementById('header')
        header.style.display = ""
    };

    // On fait en sorte d'avoir une prévisualisation de l'image (ici on créé l'URL)
    function handleImageChange(e) {
        setImageUrl(URL.createObjectURL(e.target.files[0]));
    }


    function handleFormSubmit(event) {
        event.preventDefault();
        // récupérer toute les checkbox "On" puis append le tableau dans le formData
        let checkboxes = document.querySelectorAll('input[type=checkbox]');
        let checkboxesCheckId = [];
        checkboxes.forEach(element => {
            if (element.checked) {
                console.log(element);
                checkboxesCheckId.push(element.id);
            }
        });

        let form = document.getElementById('add-projects-form');
        let formData = new FormData(form);
        let projectTitle = formData.get("title");
        let gitlink = formData.get("github");

        const regexTitle = new RegExp("^[a-zA-Z0-9\\s]+$");
        const regexgit = new RegExp("https://github.com/[a-zA-Z0-9_-]+/[a-zA-Z0-9_-]+");
        let userId = localStorage.getItem('responseId');
        formData.append('userId', userId);

        checkboxesCheckId.forEach(id => {
            formData.append('languagesId', id);
        });

        if (regexTitle.test(projectTitle) && regexgit.test(gitlink)) {
            fetch(`${process.env.REACT_APP_API_URL}api/projects`, {
                method: "POST",
                body: formData
            })
                .then((res) => {
                    console.log(res);
                    setIsLoad(res);
                    setModalOpen(false);
                })
                .catch(error => {
                    console.error('Oups, ça n\'a pas fonctionné comme prévu !', error);
                });
        } if (!regexTitle.test(projectTitle)) {
            alert("Veuillez entrer un titre valide (lettres, chiffres et espaces autorisés).");
        } else if (!regexgit.test(gitlink)) {
            alert("Veuillez entrer un lien github valide");
        }
    }

    //Gestion du formulaire Langage
    function makeFormLanguagesAppear() {
        setFormLanguage(true)
    }

    function makeFormLanguagesDisapear() {
        setFormLanguage(false)
    }

    function handleImageLanguageChange(e) {
        setImageLanguageUrl(URL.createObjectURL(e.target.files[0]));
    }

    function handleFormLanguageSubmit(event) {
        event.preventDefault();

        let form = document.getElementById("add-languages-form");
        let formData = new FormData(form);
        let userId = localStorage.getItem('responseId');
        formData.append('userId', userId);
        let languageName = formData.get("Name");
        // Regex pour valider le nom de la langue (lettres, chiffres et espaces autorisés)
        const regexName = /^[a-zA-Z0-9\s]+$/;
        if (regexName.test(languageName)) {
            fetch(`${process.env.REACT_APP_API_URL}api/languages`, {
                method: "POST",
                body: formData
            })
                .then((res) => {
                    res.json();
                    console.log(res);
                    setIsLoad(res);
                    setModalOpen(false);
                    setFormLanguage(false);
                    setImageLanguageUrl('');
                })
                .catch(error => {
                    console.error('Oups, ça n\'a pas fonctionné comme prévu !', error);
                });
        } else if (!regexName.test(languageName)) {
            alert("Veuillez entrer un nom de langue valide (lettres, chiffres et espaces autorisés).");
        }
    }


    return (
        <div className="portfolio-main">
            <Banner />
            <div id="about">
                <AboutMe />
            </div>
            {isConnected ? (
                <div className="add-projects-languages">
                    <button className='button-open-modal' onClick={() => handleOpenModal('A')}>Ajouter un langage</button>
                    <button className='button-open-modal' onClick={() => handleOpenModal('B')}>Ajouter un projet</button>
                    <Modal
                        isOpen={isModalOpen}
                        content={modalType === 'A' ?
                            <div className="language-modal">
                                {formLanguage ? (
                                    <div>
                                        <div className="top-modal-form-language">
                                            <div className="button-modal">
                                                <button className="close-button" onClick={makeFormLanguagesDisapear}><i className="fa-solid fa-arrow-left"></i></button>
                                                <button onClick={handleCloseModal} className="close-button"><i className="fa-solid fa-xmark"></i></button>
                                            </div>
                                            <h2>Ajouter un langage</h2>
                                        </div>
                                        <div id="form-languages">
                                            <form method='post' id="add-languages-form" onSubmit={handleFormLanguageSubmit} className="add-languages-form">
                                                <label htmlFor='Name'>Nom du language</label>
                                                <input type="text" id="languages-name" value={nameLanguage} onChange={(event) => setNameLanguage(event.target.value)} placeholder="Entrer le nom du language" name="Name" required></input>
                                                <div className="upload-img-section">
                                                    <label className="upload-image" htmlFor="upload-image">{imageLanguageUrl ? <img className="form-img-preview" src={imageLanguageUrl} alt='preview'></img> : <p className="upload-section"> <i className="fa-solid fa-cloud-arrow-up"></i> Upload un Logo</p>}</label>
                                                    <input required type="file" onChange={handleImageLanguageChange} id="upload-image" name="image" accept="image/png, image/jpeg, image/webp"></input>
                                                    <button type="submit" id='add-languages-form-submit' value='Créer le langage'>Créer le langage</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>) : (<div className="modal-one-language">
                                        <div className="modal-languages">
                                            <div className="button-modal-languages">
                                                <button onClick={handleCloseModal} className="close-button"><i className="fa-solid fa-xmark"></i></button>
                                            </div>
                                            <h2>Gérer les langage</h2>
                                            <Languages></Languages>
                                        </div>
                                        <button className="button-add-language" onClick={makeFormLanguagesAppear}>Ajouter un langage </button>
                                    </div>)}

                            </div> :
                            <div className="modal-projects">
                                <div>
                                    <button onClick={handleCloseModal} className="close-button"><i className="fa-solid fa-xmark"></i></button>
                                    <form method='post' id="add-projects-form" onSubmit={handleFormSubmit} className="add-projects-form">
                                        <label>Titre du projet</label>
                                        <input type="text" id="madd-projects-form-title" placeholder="Entrer le titre du projet" name="title" required></input>
                                        <label>Lien GitHub</label>
                                        <input type="url" name='github' placeholder="Entrer le lien Git du projet"></input>
                                        <fieldset>
                                            <legend>languages utilisé</legend>
                                            <div>
                                                {languages.length > 0 && (
                                                    <div>
                                                        {languages.map(language => (
                                                            <div className='languageId' key={language._id}>
                                                                <input type="checkbox" id={language._id} name={language.Name}></input>
                                                                <label htmlFor={language.Name}>{language.Name}</label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </fieldset>
                                        <label htmlFor="description">Décrivez votre projet</label>
                                        <textarea type='text' rows={4} cols={50} className='description-project' name="description" placeholder="Présentez ici votre projet en quelques lignes"></textarea>
                                        <div className="upload-img-section">
                                            <label className="upload-image" htmlFor="upload-image">{imageUrl ? <img className="form-img-preview" src={imageUrl} alt='preview'></img> : <p className="upload-section"> <i className="fa-solid fa-cloud-arrow-up"></i> Upload un Logo</p>}</label>
                                            <input required type="file" onChange={handleImageChange} id="upload-image" name="image" accept="image/png, image/jpeg, image/webp"></input>
                                        </div>
                                        <button type="submit" id='add-projects-form-submit' value='Créer le projet'>Créer le projet</button>
                                    </form>
                                </div>
                            </div>
                        }
                    ></Modal>
                </div>)
                : ("")}
            <div id='projects'>
                <Projects isLoad={isLoad} filtersNames={filtersNames} />
            </div>
            <div id="contact">
                <ContactForm />
            </div>
        </div>
    )
}