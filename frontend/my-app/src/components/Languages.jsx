import { useState, useEffect } from 'react'
import DeleteThisLanguage from './DeleteLanguage';
import ModifyLanguage from './ModifyLanguage';

export default function Languages() {

    const [languages, setLanguages] = useState([])

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
        <div className='languages-contener'>
            {languages.length > 0 && (
                <div className='language-contener'>
                    {languages.map(language => (
                        <div className="language" key={language._id}>
                            <h3>{language.Name}</h3>
                            <img src={language.imageUrl} alt="project-preview"></img>
                            <div className='overlay'>
                                <DeleteThisLanguage id={language._id}></DeleteThisLanguage>
                                <ModifyLanguage id={language._id}></ModifyLanguage>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}