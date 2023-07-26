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
            });
    }, [id]);


    useEffect(() => {
        fetchProjectData()
    }, [fetchProjectData])

    return (
        <div className='project-detail-name' >
            {project ? (
                <div className='project-article-main'>
                    <h2>{project.title}</h2>
                    <div className='project-language-container'>
                        {project.languagesUse?.map(language => (
                            <p className='project-language' key={`${project._id}-${language}`}>
                                {language}
                            </p>
                        ))}
                    </div>

                    <div className='article-img'>
                        <img src={project.imageUrl} alt="project-preview"></img>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}