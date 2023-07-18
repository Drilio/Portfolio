import { useState, useEffect } from 'react'

export default function AddProjects() {
    const [languages, setLanguages] = useState([])
    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('')

    //On récupère les languages depuis l'API
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

        checkboxesCheckId.forEach(id => {
            formData.append('languagesId', id);
        });

        fetch('http://localhost:3000/api/projects', {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(error => {
                console.error('Oups, ça n\'a pas fonctionné comme prévu !', error);
            });
    }

    useEffect(() => {
        fetchLanguagesData()
    }, [])


    return (
        <div>
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

        </div>
    )
}