import Projects from "../components/Projects"
import { useState, useEffect } from 'react'
import "../style/portfolio.css"
import IsConnected from '../components/AuthHelper';
import Modal from '../components/Modal';
import Languages from "../components/Languages";

export default function Portfolio() {
    const [languages, setLanguages] = useState([])
    const [isConnected, setIsConnected] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('A');
    const [title, setTitle] = useState('')
    const [imageUrl, setImageUrl] = useState('');
    const [nameLanguage, setNameLanguage] = useState('')
    const [imageLanguageUrl, setImageLanguageUrl] = useState('');
    const [formProject, setFormProject] = useState(false)
    const [formLanguage, setFormLanguage] = useState(false)


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
    }, [])

    //import des langages depuis la base de donnée
    const fetchLanguagesData = () => {
        fetch("http://localhost:3000/api/languages")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setLanguages(data)
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
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    // On fait en sorte d'avoir une prévisualisation de l'image (ici on créé l'URL)
    function handleImageChange(e) {
        setImageUrl(URL.createObjectURL(e.target.files[0]));
    }


    //gestion du formulaire Projet

    function makeFormProjectsAppear() {
        setFormProject(true)
    }

    function makeFormProjectsDisapear() {
        setFormProject(false)
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
        const regexTitle = /^[a-zA-Z0-9\s]+$/;

        checkboxesCheckId.forEach(id => {
            formData.append('languagesId', id);
        });
        if (regexTitle.test(projectTitle)) {
            fetch('http://localhost:3000/api/projects', {
                method: "POST",
                body: formData
            })
                .then(res => res.json())
                .then(res => console.log(res))
                .then(document.location.href = "./portfolio")
                .catch(error => {
                    console.error('Oups, ça n\'a pas fonctionné comme prévu !', error);
                });
        } else {
            alert("Veuillez entrer un titre valide (lettres, chiffres et espaces autorisés).");
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
        let languageName = formData.get("Name");
        console.log(languageName)
        // Regex pour valider le nom de la langue (lettres, chiffres et espaces autorisés)
        const regexName = /^[a-zA-Z0-9\s]+$/;
        if (regexName.test(languageName)) {
            fetch('http://localhost:3000/api/languages', {
                method: "POST",
                body: formData
            })
                .then(res => res.json())
                .then(res => console.log(res))
                .then(document.location.href = "./portfolio")
                .catch(error => {
                    console.error('Oups, ça n\'a pas fonctionné comme prévu !', error);
                });
        } else if (!regexName.test(languageName)) {
            alert("Veuillez entrer un nom de langue valide (lettres, chiffres et espaces autorisés).");
        }
    }


    return (
        <div>
            {isConnected ? (
                <div className="add-projects-languages">
                    <button onClick={() => handleOpenModal('A')}>Ajouter un langage</button>
                    <button onClick={() => handleOpenModal('B')}>Ajouter un projet</button>
                    <Modal
                        isOpen={isModalOpen}
                        content={modalType === 'A' ?
                            <div className="language-modal">
                                {formLanguage ? (
                                    <div>
                                        <div className="top-modal-form-language">
                                            <div className="button-modal">
                                                <button onClick={makeFormLanguagesDisapear}><i className="fa-solid fa-arrow-left"></i></button>
                                                <button onClick={handleCloseModal} className="close-button">X</button>
                                            </div>
                                            <h2>Ajouter un langage</h2>
                                        </div>
                                        <div id="form-languages">
                                            <form method='post' id="add-languages-form" onSubmit={handleFormLanguageSubmit} className="add-languages-form">
                                                <label htmlFor='Name'>Nom du language</label>
                                                <input type="text" id="languages-name" value={nameLanguage} onChange={(event) => setNameLanguage(event.target.value)} placeholder="Entrer le nom du language" name="Name" required></input>
                                                <div className="upload-img-section">
                                                    <img id="img-preview" src="#" alt=""></img>
                                                    <label className="upload-image" htmlFor="upload-image">{imageLanguageUrl ? <img className="form-img-preview" src={imageLanguageUrl} alt='preview'></img> : <p className="upload-section"> <i className="fa-solid fa-cloud-arrow-up"></i> Veuillez upload un Logo</p>}</label>
                                                    <input required type="file" onChange={handleImageLanguageChange} id="upload-image" name="image" accept="image/png, image/jpeg, image/webp"></input>
                                                    <input type="submit" id='add-languages-form-submit' value='Créer le langage'></input>
                                                </div>
                                            </form>
                                        </div>
                                    </div>) : (<div className="modal-one-language">
                                        <div className="modal-languages">
                                            <button onClick={handleCloseModal} className="close-button">X</button>
                                            <h2>Gérer les langage</h2>
                                            <Languages></Languages>
                                        </div>
                                        <button onClick={makeFormLanguagesAppear}>Ajouter un langage</button>
                                    </div>)}

                            </div> :
                            <div className="modal-projects">
                                {formProject ? (<div>
                                    <button onClick={handleCloseModal} className="close-button">X</button>
                                    <button onClick={makeFormProjectsDisapear}>X</button>
                                    <form method='post' id="add-projects-form" onSubmit={handleFormSubmit} className="add-projects-form">
                                        <label>Titre du projet</label>
                                        <input type="text" id="madd-projects-form-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Entrer le titre du projet" name="title" required></input>
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
                                        <div className="upload-img-section">
                                            <img id="img-preview" src="#" alt=""></img>
                                            <label htmlFor="upload-image">+ Ajouter photo</label>
                                            <input required type="file" onChange={handleImageChange} id="upload-image" name="image" accept="image/png, image/jpeg, image/webp"></input>
                                        </div>
                                        {imageUrl ? <img src={imageUrl} alt='preview'></img> : <p> veuillez upload une image</p>}
                                        <input type="submit" id='add-projects-form-submit' value='Créer le projet'></input>
                                    </form>
                                </div>) : (<div>
                                    <div>
                                        <button onClick={handleCloseModal} className="close-button">X</button>

                                        <Projects />
                                    </div>
                                    <button onClick={makeFormProjectsAppear}>Ajouter un projet</button>
                                </div>)}
                            </div>
                        }
                    ></Modal>
                </div>)
                : ("")}
            <div className='avaible-languages'>
                <h2>Les languages existant sont les suivants</h2>
                {languages.length > 0 && (
                    <div className="languages">
                        {languages.map(language => (
                            <div className="language-button" key={language._id + "NameLogo"}>
                                <button id={language.id} key={language._id}>{language.Name}</button>
                                <img className="language-logo" src={language.imageUrl} alt="language-logo"></img>
                            </div>
                        ))}
                    </div>


                )}
            </div>
            <Projects />
        </div>
    )
}