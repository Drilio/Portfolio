import "../style/footer.css"
export default function Footer() {
    return (
        <div>
            <div className='social-media'>
                <ul className='list-social-media'>
                    <li><a href="https://twitter.com/AntoineDev38" rel="noreferrer" target="_blank" id="twitter" className="a-social-media"><i className="fa-brands fa-twitter"></i></a></li>
                    <li><a href="https://github.com/Drilio" rel="noreferrer" target="_blank" id="github" className="a-social-media"><i className="fa-brands fa-github"></i></a></li>
                    <li><a href='https://www.linkedin.com/in/antoine-roy-a22402282/' target="_blank" rel="noreferrer" id="linkedin" className="a-social-media"><i className="fa-brands fa-linkedin"></i></a></li>
                </ul>
            </div>
        </div>
    )
}