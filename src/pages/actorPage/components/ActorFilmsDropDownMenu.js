import React, {useState} from 'react';
import "./ActorFilmsDropDownMenu.css"

const ActorFilmsDropDownMenu = ({ onRoleChange, onListVisibilityChange  }) => {

    const [isListVisible, setIsListVisible] = useState(true);

    const handleOptionChange = (event) => {
        onRoleChange(event.target.value);
    };

    const toggleListVisibility = () => {
        const newListVisibility = !isListVisible;
        setIsListVisible(newListVisibility);
        onListVisibilityChange(newListVisibility);
    };

    return (
        <div className="actor-dropdown-menu">
            <label htmlFor="roleSelector">Select role:</label>
            <select id="roleSelector" className="actor-role-select" onChange={handleOptionChange} >
                <option value="cast">As cast</option>
                <option value="crew">As crew</option>
            </select>
            <button className="hide-films-btn" onClick={toggleListVisibility}>
                {isListVisible ? 'Hide list' : 'Show list'}
            </button>
        </div>
    );
};

export default ActorFilmsDropDownMenu;
