import { useState, useEffect } from 'react'

export default function AddLanguages() {
    //On récupère les languages depuis l'API
    const [languages, setLanguages] = useState([])
    const [name, setName] = useState('')
    const [imageUrl, setImageUrl] = useState('');


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

    // On fait en sorte d'avoir une prévisualisation de l'image (ici on créé l'URL)
    function handleImageChange(e) {
        setImageUrl(URL.createObjectURL(e.target.files[0]));
    }


    function handleFormSubmit(event) {
        event.preventDefault();

        let form = document.getElementById("add-languages-form");
        let formData = new FormData(form);

        fetch('http://localhost:3000/api/languages', {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(res => console.log(res))
            .then(document.location.href = "./")
            .catch(error => {
                console.error('Oups, ça n\'a pas fonctionné comme prévu !', error);
            });
    }

    return (

        <div>
            <div className='avaible-languages'>
                <h2>Les languages existant sont les suivants</h2>
                {languages.length > 0 && (
                    <ul>
                        {languages.map(language => (
                            <div key={language._id + "NameLogo"}>
                                <li key={language._id}>{language.Name}</li>
                                <img src={language.imageUrl} alt="language-logo"></img>
                            </div>
                        ))}
                    </ul>
                )}
            </div>
            <form method='post' id="add-languages-form" onSubmit={handleFormSubmit} className="add-languages-form">
                <label htmlFor='Name'>Nom du language</label>
                <input type="text" id="languages-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Entrer le nom du language" name="Name" required></input>
                <div className="upload-img-section">
                    <img id="img-preview" src="#" alt=""></img>
                    <label htmlFor="upload-image">+ Ajouter Logo</label>
                    <input required type="file" onChange={handleImageChange} id="upload-image" name="image" accept="image/png, image/jpeg, image/webp"></input>
                    <input type="submit" id='add-languages-form-submit' value='Créer le langage'></input>
                </div>
                {imageUrl ? <img src={imageUrl} alt='preview'></img> : <p> veuillez upload un Logo</p>}
            </form>
        </div>
    )
}
