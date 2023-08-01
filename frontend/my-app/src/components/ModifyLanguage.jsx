import { useState } from "react";
import Modal from "./Modal";

export default function ModifyLanguage({ id }) {
    const [isModalModifyOpen, setModalModifyOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    async function ModifyThisLanguage(event) {
        event.preventDefault();

        let form = document.getElementById('modify-language-form');
        let formData = new FormData(form);
        let languageName = formData.get("name");
        const regexName = /^[a-zA-Z0-9\s]+$/;
        let userId = localStorage.getItem('responseId');
        formData.append('userId', userId);

        if (regexName.test(languageName)) {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/languages/${id}`, {
                    method: 'PUT',
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('responseToken')}`,
                    },
                });
                if (response.ok) {
                    // document.location.href = `./${id}`;
                } else {
                    console.log('Failed to modify project:', response.status);
                    window.alert('Nous n\'avons pas pu modifier le langage');
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
        setModalModifyOpen(true);
        let header = document.getElementById('header')
        header.style.display = "none"
    };

    const handleCloseModal = () => {
        setModalModifyOpen(false);
        let header = document.getElementById('header')
        header.style.display = ""
    };

    // On fait en sorte d'avoir une prévisualisation de l'image (ici on créé l'URL)
    function handleImageChange(e) {
        setImageUrl(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <div className="">
            <button className="modify-language-button" onClick={() => handleOpenModal('A')}><i className="fa-solid fa-eye"></i></button>
            <Modal
                isOpen={isModalModifyOpen}
                content={
                    <div className="modify-modal-main" >
                        <button onClick={handleCloseModal} className="close-button">X</button>
                        <div className="modify-modal">
                            <form method='POST' id="modify-language-form" onSubmit={ModifyThisLanguage} className="modify-language-form">
                                <label>Nom du langage</label>
                                <input type="text" id="madd-language-form-name" placeholder="Entrer le titre du projet" name="name"></input>
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