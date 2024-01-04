import './NavList.css'
import {Link} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../../App";

const NavList = () => {
    const isLoggedIn = useContext(AuthContext);

    return (
        <ul className="NavList">
            {!isLoggedIn
                &&
                (<li><Link to="/login" className="NavListLink">SIGN IN</Link></li>)
            }
            {!isLoggedIn
                &&
                (<li><Link to="/registration" className="NavListLink">CREATE ACCOUNT</Link></li>)
            }
            <li><Link to="/films/1" className="NavListLink">FILMS</Link></li>
            <li><Link to="/aboutUs" className="NavListLink">ABOUT US</Link></li>
        </ul>
    )
}

export default NavList;