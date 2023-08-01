import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Filters from './filters'

import "../style/projects.css"
export default function Projects({ filtersNames, isLoad }) {

    const [projects, setProjects] = useState([])
    const [filter, setFilter] = useState('tous');

    const fetchProjectsData = () => {
        fetch(`${process.env.REACT_APP_API_URL}api/projects`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setProjects(data)
            })

    }


    useEffect(() => {
        fetchProjectsData();
    }, [isLoad]);

    const filteredProjects = filter === 'tous'
        ? projects
        : projects.filter(project => project.languagesUse.includes(filter));

    return (
        <div className='section-projects'>

            <h2>Traveaux Récents</h2>
            <Filters filtersNames={filtersNames} setFilter={setFilter} ></Filters>
            {filteredProjects.length > 0 && (
                <div className='projects-contener'>
                    {filteredProjects.map(project => (
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