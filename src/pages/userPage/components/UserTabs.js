import React, {useContext, useEffect, useState} from "react";
import './UserTabs.css';
import {Box, Divider, Tab, Tabs} from "@mui/material";
import UserLikedList from "../../../components/lists/UserLikedList";
import ListOfFilms from "../../../components/lists/ListOfFilms";
import {useParams} from "react-router-dom";
import {getUser} from "../../../api/server/userService/GetUser";
import {UserContext} from "../../../App";

const UserTabs = () => {
    const myUser = useContext(UserContext);
    const {username} = useParams();

    const [user, setUser] = useState([]);
    const [value, setValue] = useState('liked');
    const [right, setRight] = useState(false);


    const checkRight = () => {
        if (myUser && username === myUser.username) {
            setRight(true);
        } else {
            setRight(false);
            handleChange(null, 'lists');
        }
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        getUser(username).then(data => setUser(data));
        checkRight();
    }, [username]);

    return (
        <div className="user-tabs">
            <Box
                className="box-tabs"
                sx={{ width: '100%', margin: '1rem' }}>
                {right ?
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="fullWidth"
                        className="user-tab-container"
                    >
                        <Tab value="liked" label="Liked" />
                        <Divider orientation="vertical" flexItem />
                        <Tab value="watched" label="Watched" />
                        <Divider orientation="vertical" flexItem />
                        <Tab value="toWatch" label="To watch" />
                        <Divider orientation="vertical" flexItem />
                        <Tab value="lists" label="Lists"/>
                    </Tabs>
                    :
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="fullWidth"
                        className="user-tab-container"
                    >
                        <Tab value="lists" label="Lists"/>
                    </Tabs>
                }
            </Box>
            {value !== "lists"
                ?
                <UserLikedList user={user} value={value} />
                :
                <ListOfFilms user={user} value={value} />
            }
        </div>
    );
}

export default UserTabs;