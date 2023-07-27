import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import '../style/projectDetails.css'

export default function ProjectDetails() {
    const { id } = useParams();
    const [project, setProject] = useState(null);

    const fetchProjectData = useCallback(() => {
        fetch(`http://localhost:3000/api/projects/${id}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setProject(data)
                console.log(data)
            })
            .catch(error => {
                console.error('Error fetching project data:', error);
            });
    }, [id]);


    useEffect(() => {
        fetchProjectData()
    }, [fetchProjectData])

    return (
        <div className='project-detail' >
            {project ? (
                <div className='project-article-main'>
                    <h2>{project.title}</h2>
                    <div className='project-language-container'>
                        {Array.isArray(project.languagesUse) ? (
                            <ul>
                                {project.languagesUse.map(language => (
                                    <li className='project-language' key={`${project._id}-${language}`}>{language}</li>
                                ))}
                            </ul>

                        ) : (
                            <p>No languages specified for this project.</p>
                        )}
                    </div>


                    <div className='article-img'>
                        <img src={project.imageUrl} alt="project-preview"></img>
                    </div>
                    <div className='project-description'>
                        <p>{project.description}</p>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}