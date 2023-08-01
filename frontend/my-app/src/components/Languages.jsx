import { useState, useEffect } from 'react'
import DeleteThisLanguage from './DeleteLanguage';

export default function Languages() {

    const [languages, setLanguages] = useState([])

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

    return (
        <div className='languages-contener'>
            {languages.length > 0 && (
                <div className='language-contener'>
                    {languages.map(language => (
                        <div className="language" key={language._id}>
                            <h3>{language.Name}</h3>
                            <img src={language.imageUrl} alt="project-preview"></img>
                            <div className='overlay'>
                                <DeleteThisLanguage id={language._id}></DeleteThisLanguage>
                                <button className='modal-language-button js-modify-modify'><i className="fa-solid fa-eye"></i></button>
                            </div>
                        </div>

                    ))}
                </div>
            )}
        </div>
    )
}