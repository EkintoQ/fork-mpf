import React, {useState} from "react";
import './UserTabs.css';
import {Box, Tab, Tabs} from "@mui/material";
import UserLikedList from "../../../components/lists/UserLikedList";
import ListOfFilms from "../../../components/lists/ListOfFilms";

const UserTabs = ({user}) => {

    const [value, setValue] = useState('liked');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="user-tabs">
            <Box
                className="box-tabs"
                sx={{ width: '100%', margin: '1vh', bgColor: 'blue' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    className="user-tab-container"
                >
                    <Tab value="liked" label="Liked" />
                    <Tab value="watched" label="Watched" />
                    <Tab value="toWatch" label="To watch" />
                    <Tab value="lists" label="Lists" />
                </Tabs>
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