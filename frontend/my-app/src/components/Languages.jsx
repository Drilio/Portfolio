import { useState, useEffect } from 'react'
import DeleteThisLanguage from './DeleteLanguage';

export default function Languages({ setIsLanguageChange }) {

    const [languages, setLanguages] = useState([])
    const [isLoad, setIsLoad] = useState('')
    const [isModalModifyOpen, setModalModifyOpen] = useState(false);
    const [languageId, setLanguageId] = useState('')
    //import des langages depuis la base de donnée

    const handleOnclick = (languageId) => {
        setModalModifyOpen(true)
        setLanguageId(languageId)
    }
    const fetchLanguagesData = () => {

        fetch(`${process.env.REACT_APP_API_URL}api/languages`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setLanguages(data)
                setIsLoad('');
            })
            .catch(error => {
                console.error('Error fetching languages:', error);
            });
    }

    useEffect(() => {
        if (isLoad !== '') {
            setIsLanguageChange('yes')
        }
        fetchLanguagesData()
    }, [isLoad])

    async function ModifyThisLanguage(event) {
        event.preventDefault();
        console.log('modify')

        let form = document.getElementById('modify-language-form');

        let formData = new FormData(form);

        let languageName = formData.get("Name");

        const regexName = /^[a-zA-Z0-9\s]+$/;

        let userId = localStorage.getItem('responseId');
        formData.append('userId', userId);

        let token = localStorage.getItem('responseToken')
        const formDataObject = Object.fromEntries(formData);

        if (regexName.test(languageName)) {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}api/languages/${languageId}`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formDataObject)
                });
                if (response.ok) {
                    // document.location.href = `./${id}`;
                    setIsLoad('ok');
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

    return (
        <div className='languages-contener'>
            {isModalModifyOpen ? (
                <div className="modify-modal-main" >
                    <button onClick={() => setModalModifyOpen(false)} className="close-button"><i class="fa-solid fa-arrow-left"></i></button>
                    <div className="modify-modal">
                        <form method='POST' id="modify-language-form" onSubmit={ModifyThisLanguage} className="modify-language-form">
                            <label>Nom du langage</label>
                            <input type="text" id="madd-languages-form-name" placeholder="Entrer le titre du projet" name="Name"></input>
                            <button type="submit" className='add-languages-form-submit' value='Modifier le projet'>Modifier le projet</button>
                        </form>
                    </div>
                </div>

            ) : (
                <>
                    {languages.length > 0 && (
                        <div className='language-contener'>
                            {languages.map(language => (
                                <div className="ag-courses_item" key={language._id}>
                                    <div className="ag-courses-item_link">
                                        <div className="ag-courses-item_bg"></div>

                                        <div className="ag-courses-item_title">
                                            <p>{language.Name}</p>
                                        </div>
                                        <div className="button-language-modal">
                                            <DeleteThisLanguage id={language._id}></DeleteThisLanguage>
                                            <button className="modify-language-button" onClick={() => handleOnclick(language._id)}><i className="fa-solid fa-eye"></i></button>
                                        </div>
                                        <div className="ag-courses-item_bg"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

        </div>
    )
}