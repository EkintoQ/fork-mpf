import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getUser} from "../../api/server/UserAPI";
import {getRandomMovie} from "../../api/tmdb/MovieAPI";
import './UserPage.css';
import UserHeader from "./components/UserHeader";
import UserTabs from "./components/UserTabs";

const TMDB_PICTURE_BACK = process.env.REACT_APP_TMDB_PICTURE_BACK

const UserPage = () => {
    const {username} = useParams();

    const [user, setUser] = useState();
    const [backgroundImage, setBackgroundImage] = useState('');

    useEffect(() => {
        getUser(username).then(data => setUser(data))
        getRandomMovie().then(data => setBackgroundImage(`${TMDB_PICTURE_BACK}${data.backdrop_path}`))
    }, [])

    if (!user) {
        // Display loading state or a spinner while fetching user data
        return <div>Loading...</div>;
    }

    return (
        <div className="user-page-container">
            <div className="user-page-back"
                 style={{backgroundImage: `url(${backgroundImage})`,
                 }}>
            </div>
            <div className="user-info-container">
                <UserHeader user={user}/>
                <UserTabs user={user}/>
            </div>
        </div>
    );
}

export default UserPage;