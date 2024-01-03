import './SearchComponent.css'
import {useState} from "react";
import {Button, Modal} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Box from "@mui/material/Box";

const SearchComponent = () => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
        <Button className="Search"
                color="primary"
                size="large"
                variant="outlined"
                onClick={handleOpen}
                startIcon={<SearchIcon/>}>
            Search...
        </Button>
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box>
            </Box>
        </Modal>
        </div>
    )
}

export default SearchComponent;