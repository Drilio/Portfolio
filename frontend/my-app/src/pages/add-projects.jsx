import { useState, useEffect } from 'react'

export default function AddProjects() {
    const [languages, setLanguages] = useState([])
    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('')
    const [languagesId, setLanguagesId] = useState([])

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
    //On récupère l'information des languages utilisés
    function handleCheckboxChange(event) {
        const languageId = event.target.id;
        console.log(languageId)
        const isChecked = event.target.checked;

        if (isChecked) {
            setLanguagesId(prevLanguages => [...prevLanguages, languageId]);
        } else {
            setLanguagesId(prevLanguages =>
                prevLanguages.filter(lang => lang !== languageId)
            );
        }
    }

    // On fait en sorte d'avoir une prévisualisation de l'image (ici on créé l'URL)
    function handleImageChange(e) {
        setImageUrl(URL.createObjectURL(e.target.files[0]));
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        const dataToSubmit = {
            title,
            languagesId,
            imageUrl
        }
        // console.log(dataToSubmit)
        fetch('http://localhost:3000/api/projects', {
            method: "POST",
            headers: { 'Content-type': 'application/json;charset=UTF-8', },
            body: JSON.stringify(dataToSubmit)
        })
            .then(console.log(dataToSubmit))
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
            <form method='post' action='#' onSubmit={handleFormSubmit} className="add-projects-form">
                <label>Titre du projet</label>
                <input type="text" id="madd-projects-form-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Entrer le titre du projet" name="titre" required></input>
                <fieldset>
                    <legend>languages utilisé</legend>
                    <div>
                        {languages.length > 0 && (
                            <div>
                                {languages.map(language => (
                                    <div className='language' key={language._id}>
                                        <input onChange={handleCheckboxChange} type="checkbox" id={language._id} name={language.Name}></input>
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