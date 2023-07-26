import '../style/banner.css';
import { useEffect, useState } from 'react';
import TypingAnimation from './TypingAnimation';

export default function Banner() {
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const textsArray = ['Portfolio', 'Web Dev']

    useEffect(() => {
        function handleResize() {
            setImageSize({ width: '100%', height: window.innerHeight });
        }

        handleResize();

        // EventListener qui permet de prendre en compte quand l'utilisateur change la taille de sa fenêtre
        window.addEventListener('resize', handleResize);

        // On retire l'eventListener quand c'est necessaire
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
            <div className="banner" style={{ width: imageSize.width, height: imageSize.height }}>
                <span id="your-target-element-id"></span>
                <div className="type-writing-container">
                    <h1><TypingAnimation texts={textsArray} delay={100} /></h1>
                </div>
                <div className='social-media'>
                    <ul className='list-social-media'>
                        <li><i class="fa-brands fa-twitter"></i></li>
                        <li><i class="fa-brands fa-github"></i></li>
                        <li><i class="fa-brands fa-linkedin"></i></li>
                    </ul>
                </div>
            </div>
        </div>

    )
}