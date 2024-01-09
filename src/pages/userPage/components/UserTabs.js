import React, {useState} from "react";
import './UserTabs.css';
import {Box, Divider, Tab, Tabs} from "@mui/material";
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
                sx={{ width: '100%', margin: '1rem' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    className="user-tab-container"
                >
                    <Tab value="liked" label="Liked"/>
                    <Divider orientation="vertical" flexItem />
                    <Tab value="watched" label="Watched"/>
                    <Divider orientation="vertical" flexItem />
                    <Tab value="toWatch" label="To watch"/>
                    <Divider orientation="vertical" flexItem />
                    <Tab value="lists" label="Lists"/>
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