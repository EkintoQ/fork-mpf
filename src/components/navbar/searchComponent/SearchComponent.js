import './SearchComponent.css'
import {useState} from "react";
import DropdownSearchComponent from "../dropDownSearchComponent/DropdownSearchComponent";

const SearchComponent = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchText, setSearchText] = useState('');

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSearchTextChange = (event) => {
        setSearchText(event.target.value);
    };

    return (
        <div className="Search">
            <input type="text"
                   className="Round"
                   value={searchText}
                   onChange={handleSearchTextChange}
            />
            <input type="image"
                   className="Submit"
                   src="/images/search.png"
                   onClick={handleDropdownToggle}
                   alt="+"
            />
            {isDropdownOpen
                &&
                <DropdownSearchComponent
                query={searchText}/>
            }
        </div>
    )
}

export default SearchComponent;