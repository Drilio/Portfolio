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
        <div>
            {projects.length > 0 && (
                <div className='projects-contener'>
                    {projects.map(project => (
                        <div className="project" key={project._id}>

                            <h3>{project.title}</h3>
                            <img src={project.imageUrl} alt="project-preview"></img>
                            {project.languagesUse.map(language => (
                                <div key={`${project._id}-${language}`}>
                                    {language}
                                </div>
                            ))}
                            <Link to={`/project/${project._id}`}>En savoir plus</Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}