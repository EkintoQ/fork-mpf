import './SearchComponent.css'
import {Button} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {Link} from "react-router-dom";


const SearchComponent = () => {
    return (
        <div>
            <Link to="/search">
                <Button className="Search"
                        color="primary"
                        size="large"
                        variant="outlined"
                        startIcon={<SearchIcon/>}
                        link="/search"
                >
                    Search...
                </Button>
            </Link>
        </div>
    )
}

export default SearchComponent;