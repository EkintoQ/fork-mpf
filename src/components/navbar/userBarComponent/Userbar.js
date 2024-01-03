import './Userbar.css'
import React, {useContext, useState} from "react";
import {UserContext} from "../../../App";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";
import LogoutComponent from "../logOutComponent/LogoutComponent";
import {Divider, List} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

const BASE_URL= process.env.REACT_APP_BASE_URL;

const Userbar = () => {
    const user = useContext(UserContext);

    const [drawerState, setDrawerState] = useState(false);

    const toggleDrawer = (state) => () => {
        setDrawerState(state);
    };

    const list = () => (
        <Box className="list-box">
            <List>
                <Link to={`/user/${user.username}`} className="list-link">My page</Link>
                <Divider/>
                <Link to={"/settings"} className="list-link">Settings</Link>
                <Divider/>
                <Divider/>
                <LogoutComponent/>
            </List>
        </Box>
    );

    return(
        <div className='User'>
            {user.avatar ?
                <img
                    src={`${BASE_URL}/images/${user.avatar}`}
                    alt='USER'
                    onClick={toggleDrawer(true)}
                />
                :
                <img
                    src={`/images/user.png`}
                    alt='USER'
                    onClick={toggleDrawer(true)}
                />
            }
            <MenuIcon
                className="menu-icon"
                onClick={toggleDrawer(true)}
            />
            {drawerState && (
                <div>
                    <Drawer
                        anchor='right'
                        open={drawerState}
                        onClose={toggleDrawer(false)}
                    >
                        {list()}
                    </Drawer>
                </div>
            )}
        </div>
    )

}

export default Userbar;