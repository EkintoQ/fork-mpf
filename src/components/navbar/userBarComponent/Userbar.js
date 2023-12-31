import './Userbar.css'
import React, {useContext, useState} from "react";
import DropdownUserComponent from "../dropDownUserComponent/DropdownUserComponent";
import {UserContext} from "../../../App";

const BASE_URL= process.env.REACT_APP_BASE_URL;

const Userbar = () => {
    const user = useContext(UserContext);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return(
        <div className='User'>
            <img
                src={`${BASE_URL}/images/${user.avatar}`}
                alt='USER'
                onClick={handleDropdownToggle}
            />
            {isDropdownOpen && (
                <DropdownUserComponent/>
            )}
        </div>
    )

}

export default Userbar;