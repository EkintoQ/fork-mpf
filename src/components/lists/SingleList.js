import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import "./SingleList.css"
import {getUser} from "../../api/server/userService/GetUser";
import {Avatar} from "@mui/material";

const TMDB_PICTURE = process.env.REACT_APP_TMDB_PICTURE;
const BASE_URL= process.env.REACT_APP_BASE_URL;

const SingleList = ({list, username}) => {
    const [user, setUser] = useState([]);

    const moviesWithPlaceholders = [...(list.movies || []), ...Array(4).fill('')].slice(0, 4);

    useEffect(() => {
        getUser(username).then(data => setUser(data));
    }, [username]);

    return (
        <div className="list-card">
            <Link to={`/lists/${username}/${list.id}`} className="list-poster">
                {moviesWithPlaceholders.map((movie, index) => (
                    <img
                        className="list-movie-poster"
                        src={movie ? TMDB_PICTURE + movie.poster_path : '/images/black.png'}
                        alt={movie.title}
                        style={{zIndex: 4 - index}}
                    />
                ))}
            </Link>
            <div className="list-info">
                <Link to={`/lists/${username}/${list.id}`} className="films-browser-title">
                    <h1 className="list-title">{list.title}</h1>
                </Link>
                <div className="user-credits">
                    <Link to={`/user/${username}`}>
                        <Avatar
                            src={`${BASE_URL}/images/${user.avatar}`}
                            alt='USER_AVATAR'
                            sx={{width: 30, height: 30}}
                        />
                    </Link>
                    <Link to={`/user/${username}`} className="user-nickname">{username}</Link>
                </div>
                <h2 className="list-content">{list.content}</h2>
            </div>
        </div>
    );
};

export default SingleList;