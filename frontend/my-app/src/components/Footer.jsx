import { NavLink } from "react-router-dom";
import "../style/footer.css"
export default function Footer() {
    return (
        <div>
            <div className='social-media'>
                <ul className='list-social-media'>
                    <li><NavLink to="#" id="twitter" className="a-social-media"><i className="fa-brands fa-twitter"></i></NavLink></li>
                    <li><NavLink to="#" id="github" className="a-social-media"><i className="fa-brands fa-github"></i></NavLink></li>
                    <li><NavLink to="#" id="linkedin" className="a-social-media"><i className="fa-brands fa-linkedin"></i></NavLink></li>
                </ul>
            </div>
        </div>
    )
}