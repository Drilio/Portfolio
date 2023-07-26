import '../style/aboutMe.css'
import placeholer from '../images/Lucette-Placeholder.webp'
import DownloadCV from './DownloadCV'

export default function AboutMe() {

    return (
        <div className='about-me-main'>
            <img className='img-about-me' src={placeholer} alt="project-preview"></img>
            <div className='about-me-presentation'>
                <h2>
                    <span>Je suis Antoine Roy,</span>
                    <br />
                    <span>Web Developpeur basé à Grenoble.</span>
                </h2>
                <p>
                    <span>Après 10 ans d'experiences en tant que chef de projet associatif je suis actuellement en reconversion professionelle</span>
                    <br />
                    <span>Suite à une formation en développement Web, je suis maintenant à la recherche d'une alternance.</span>
                    <br />
                    <span>Je suis à l'aise avec l'HTML, le CSS, mais aussi le JavaScript, Node.js et React.</span>
                    <br />
                    <span>N'hésitez pas à me contacter.</span>
                </p>
                <DownloadCV />
            </div>

        </div>
    )
}