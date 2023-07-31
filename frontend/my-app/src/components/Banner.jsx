import '../style/banner.css';
import TypingAnimation from './TypingAnimation';

export default function Banner() {
    const textsArray = ['Portfolio', 'Web Dev']

    return (
        <div>
            <div className="banner">
                <span id="your-target-element-id"></span>
                <div className="type-writing-container">
                    <h1><TypingAnimation texts={textsArray} delay={100} /></h1>
                </div>
                <div className='social-media'>
                    <ul className='list-social-media'>
                        <li> <a href="https://twitter.com/AntoineDev38" rel="noreferrer" target="_blank"><i className="fa-brands fa-twitter"></i></a></li>
                        <li><a href="https://github.com/Drilio" rel="noreferrer" target="_blank"><i className="fa-brands fa-github"></i></a></li>
                        <li><a href='https://www.linkedin.com/in/antoine-roy-a22402282/' rel="noreferrer" target="_blank"><i className="fa-brands fa-linkedin"></i></a></li>
                    </ul>
                </div>
            </div>
        </div >

    )
}