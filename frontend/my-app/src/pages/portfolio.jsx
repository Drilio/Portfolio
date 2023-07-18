import Projects from "../components/Projects"
import { useState, useEffect } from 'react'
import "../style/portfolio.css"
export default function Portfolio() {
    const [languages, setLanguages] = useState([])

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
        <div>
            <div className='avaible-languages'>
                <h2>Les languages existant sont les suivants</h2>
                {languages.length > 0 && (
                    <div>
                        {languages.map(language => (
                            <div className="language-button" key={language._id + "NameLogo"}>
                                <button key={language._id}>{language.Name}</button>
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