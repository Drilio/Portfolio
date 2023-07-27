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
                        <li><i className="fa-brands fa-twitter"></i></li>
                        <li><i className="fa-brands fa-github"></i></li>
                        <li><i className="fa-brands fa-linkedin"></i></li>
                    </ul>
                </div>
            </div>
        </div>

    )
}