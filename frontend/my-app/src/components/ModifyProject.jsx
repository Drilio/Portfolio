import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "./Modal";

export default function ModifyProjetct({ setIsLoad }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const { id } = useParams();
    const [languages, setLanguages] = useState([])

    async function ModifyThisProject(event) {
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

        let form = document.getElementById('modify-projects-form');
        let formData = new FormData(form);
        let projectTitle = formData.get("title");
        const regexTitle = /^[a-zA-Z0-9\s]*$/;
        let userId = localStorage.getItem('responseId');
        formData.append('userId', userId);
        checkboxesCheckId.forEach(id => {
            formData.append('languagesId', id);
        });
        if (regexTitle.test(projectTitle)) {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}api/projects/${id}`, {
                    method: 'PUT',
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('responseToken')}`,
                    },
                });
                if (response.ok) {
                    setIsLoad(response);
                    setModalOpen(false)
                } else {
                    console.log('Failed to modify project:', response.status);
                    // Handle the error or show an appropriate message
                }
            } catch (error) {
                console.log('Error modifying project:', error);
                // Handle the error or show an appropriate message
            }
        } else {
            alert("Veuillez entrer un titre valide (lettres, chiffres et espaces autorisés).");
        }
    }



    const handleOpenModal = () => {
        setModalOpen(true);
        let header = document.getElementById('header')
        header.style.display = "none"
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        let header = document.getElementById('header')
        header.style.display = ""
    };

    // On fait en sorte d'avoir une prévisualisation de l'image (ici on créé l'URL)
    function handleImageChange(e) {
        setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
    //import des langages depuis la base de donnée
    const fetchLanguagesData = () => {
        fetch(`${process.env.REACT_APP_API_URL}api/languages`)
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

    return (
        <div className="">
            <button className="modify-project-button" onClick={() => handleOpenModal('A')}>Modifier le projet</button>
            <Modal
                isOpen={isModalOpen}
                content={
                    <div className="modify-modal-main" >
                        <button onClick={handleCloseModal} className="close-button">X</button>
                        <div className="modify-modal">
                            <form method='POST' id="modify-projects-form" onSubmit={ModifyThisProject} className="modify-projects-form">
                                <label>Titre du projet</label>
                                <input type="text" id="madd-projects-form-title" placeholder="Entrer le titre du projet" name="title"></input>
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
                                    <input type="file" onChange={handleImageChange} id="upload-image" name="image" accept="image/png, image/jpeg, image/webp"></input>
                                </div>
                                <button type="submit" id='add-projects-form-submit' value='Modifier le projet'>Modifier le projet</button>
                            </form>
                        </div>
                    </div>
                }
            ></Modal >
        </div >
    )
}