import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import "../style/projects.css"
export default function Projects() {

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


    useEffect(() => {
        fetchProjectsData()
    }, [])


    return (
        <div className='section-projects'>
            <h2>Traveaux Récents</h2>
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
                                            <p className='project-name' key={`${project._id}-${language}`}>
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