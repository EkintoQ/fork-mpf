import {Link} from "react-router-dom";
import React, {useContext} from "react";
import "./DropdownUserComponent.css"
import {UserContext} from "../../../App";
import LogoutComponent from "../LogoutComponent";

const DropdownUserComponent = () => {
    const user = useContext(UserContext)

    return(
        <div className="dropdown-content">
            <Link to={`/user/${user.username}`}>My page</Link>
            <Link to={"/settings"}>Settings</Link>
            <LogoutComponent/>
        </div>
    )
}

export default DropdownUserComponent