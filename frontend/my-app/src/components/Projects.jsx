import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import "../style/projects.css"
export default function Projects({ filtersNames }) {

    const [projects, setProjects] = useState([])

    const fetchProjectsData = () => {
        fetch("http://localhost:3000/api/projects")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setProjects(data)
            })

    }

    function filterProjects(event) {

    }


    useEffect(() => {
        fetchProjectsData()
    }, [])


    return (
        <div className='section-projects'>

            <h2>Traveaux Récents</h2>
            <div className='filters-projects'>
                <div>
                    <button className='filters'>Tous</button>
                </div>
                {filtersNames.map(name => (
                    <div className="language" key={name + 'filters'}>
                        <button className='filters'>{name}</button>
                    </div>
                ))}
            </div>
            {projects.length > 0 && (
                <div className='projects-contener'>
                    {projects.map(project => (
                        <div className="project" key={project._id}>
                            <img src={project.imageUrl} alt="project-preview"></img>
                            <Link to={`/project/${project._id}`}>
                                <div className='overlay'>
                                    <div className='test-overlay'>
                                        <h3 className='title-project'>{project.title}</h3>
                                        {project.languagesUse.map(language => (
                                            <p className={language} key={`${project._id}-${language}`}>
                                                {language}
                                            </p>
                                        ))}
                                    </div>

                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}