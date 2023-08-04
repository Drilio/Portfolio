import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import '../style/projectDetails.css'
import BannerProject from './BannerProject';
import DeleteProject from './DeleteProject';
import ModifyProjetct from './ModifyProject';
import { Fragment } from 'react';
import IsConnected from '../helper/AuthHelper';

export default function ProjectDetails() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    const [isLoad, setIsLoad] = useState('')
    //verification de la connexion 
    useEffect(() => {
        const token = window.localStorage.getItem('responseToken')
        const userId = window.localStorage.getItem('responseId')

        IsConnected(token, userId)
            .then((isValid) => {
                if (isValid === true) {
                    setIsConnected(true);
                } else {
                    setIsConnected(false);
                }
            })
            .catch((error) => {
                console.log("test isConnected false")
                setIsConnected(false)
            });
    })

    const fetchProjectData = useCallback(() => {
        fetch(`${process.env.REACT_APP_API_URL}api/projects/${id}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setProject(data)
            })
            .catch(error => {
                console.error('Error fetching project data:', error);
            });
    }, [id, isLoad]);


    useEffect(() => {
        fetchProjectData();
        if (window.innerWidth > 760) {
            document.getElementById('header').className = 'header';
            document.getElementById('menu-link').style = 'display:none;'
        }
    }, [fetchProjectData])


    return (
        <div className='main-project'>
            {project ? (
                <>
                    <BannerProject projectTitle={project.title} />
                </>
            ) : ('')
            }
            {isConnected ? (
                <div className='button-project'>
                    <DeleteProject ></DeleteProject>
                    <ModifyProjetct setIsLoad={setIsLoad}></ModifyProjetct>
                </div>
            ) : ('')}

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
                        <div className='git-hub-project'><a href={project.github} rel="noreferrer" target="_blank"><i className="fa-brands fa-github"></i>
                            <p>Lien Github du projet</p></a></div>
                        <div className='project-description'>
                            {project.description.split('\r\n').map((paragraph, index) => (
                                <Fragment key={index}>
                                    <p>{paragraph}</p>
                                </Fragment>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="loader-container">
                        <div className="spinner"></div>
                    </div>
                )}
            </div>
        </div>

    )
}