import './NavBar.css'
import NavList from "../navList/NavList";
import LogoBar from "../logoBar/LogoBar";
import {useContext} from "react";
import {AuthContext, UserContext} from "../../../App";
import Userbar from "../userBarComponent/Userbar";
import NavBrandComponent from "../navBrand/NavBrandComponent";

const NavBar = () => {
    const isLoggedIn = useContext(AuthContext);
    const user = useContext(UserContext);
    return (
        <nav className="Navbar">
            <div className="NavRow">
                <div className="LeftContainer">
                    <LogoBar/>
                    <NavBrandComponent/>
                </div>
                <NavList/>
                <div className="RightContainer">
                    {isLoggedIn
                        &&
                        <Userbar/>
                    }
                    {isLoggedIn
                        &&
                        <div className="Username">{user.username}</div>
                    }
                </div>
            </div>
        </nav>
    )
}

export default NavBar;