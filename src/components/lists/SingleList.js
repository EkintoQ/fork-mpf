    import React, {useContext, useEffect, useState} from 'react';
    import {Link, useNavigate} from "react-router-dom";
    import "./SingleList.css"
    import {Avatar} from "@mui/material";
    import {postUserListLike} from "../../api/server/listOfFilmsService/ListFilmService/PostUserListLike";
    import FavoriteIcon from '@mui/icons-material/Favorite';
    import MovieIcon from '@mui/icons-material/Movie';
    import {getUserListLike} from "../../api/server/listOfFilmsService/ListFilmService/GetUserListLike";
    import {UserContext} from "../../App";

    const TMDB_PICTURE = process.env.REACT_APP_TMDB_PICTURE;
    const BASE_URL= process.env.REACT_APP_BASE_URL;

    const SingleList = ({list, username}) => {
        const user = useContext(UserContext);

        const [likeStatus, setLikeStatus] = useState(false);

        const navigate = useNavigate();

        const moviesWithPlaceholders = [...(list.movies || []), ...Array(4).fill('')].slice(0, 4);

        const handleLike = async () => {
            if (!user) {
                navigate('/login');
                return;
            }
            await postUserListLike(list.id, true);
            setLikeStatus(!likeStatus);
        };

        useEffect(() => {
            getUserListLike(list.id).then(data => setLikeStatus(data));
        }, [list]);

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
                        <Link to={`/user/${list.user.username}`}>
                            <Avatar
                                src={`${BASE_URL}/images/${list.user.avatar}`}
                                alt='USER_AVATAR'
                                sx={{width: 30, height: 30}}
                            />
                        </Link>
                        <Link to={`/user/${list.user.username}`} className="user-nickname">{list.user.username}</Link>
                        <FavoriteIcon onClick={handleLike}
                                      className={`like-button ${likeStatus ? 'liked' : ''}`}
                        />
                    </div>
                    <h2 className="list-content">{list.content}</h2>
                    <div className="list-stats">
                        <MovieIcon/>{list.movies.length}
                    </div>
                </div>
            </div>
        );
    };

    export default SingleList;