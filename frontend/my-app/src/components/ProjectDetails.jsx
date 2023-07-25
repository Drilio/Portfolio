import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';


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
        <div>
            {project ? (
                <div>
                    <h2>{project.title}</h2>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}