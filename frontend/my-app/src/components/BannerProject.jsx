import '../style/banner.css';

export default function BannerProject({ projectTitle }) {

    return (
        <div>
            <div className="banner-project">
                <div className="type-writing-container">
                    <h1>{projectTitle}</h1>
                    <span id="your-target-element-id"></span>
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