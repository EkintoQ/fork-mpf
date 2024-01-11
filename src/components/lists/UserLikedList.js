import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import styles from '../../pages/filmsBrowsingPage/FilmsBrowsingPage.module.css';
import MoviePoster from "../poster/MoviePoster";
import WatchMovieButton from "../buttons/WatchMovieButton";
import FavoriteMovieButton from "../buttons/FavoriteMovieButton";
import ToWatchMovieButton from "../buttons/ToWatchMovieButton";
import "./UserLikedList.css";
import {UserContext} from "../../App";
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import {getFavoriteAllMovie} from "../../api/server/listOfFilmsService/FavoriteFilmService/GetFavoriteAllMovie";
import {getWatchedAllMovie} from "../../api/server/listOfFilmsService/WatchedFilmService/GetWatchedAllMovie";
import {getToWatchAllMovie} from "../../api/server/listOfFilmsService/ToWatchFilmService/GetToWatchAllMovie";
import {CircularProgress} from "@mui/material";

const UserLikedList = ({value}) => {
    const user = useContext(UserContext);
    const {username} = useParams()

    const [likedList, setLikedList] = useState([])
    const [loading, setLoading] = useState(true);

    let check = false
    if (user && user.username === username) {
        check = true
    }

    const getTabList = ({value}) => {
        setLoading(true);
        switch (value) {
            case 'liked':
                getFavoriteAllMovie().then(data => setLikedList(data))
                break;
            case 'watched':
                getWatchedAllMovie().then(data => setLikedList(data))
                break;
            case 'toWatch':
                getToWatchAllMovie().then(data => setLikedList(data))
                break;
            default:
                getFavoriteAllMovie().then(data => setLikedList(data))
        }
        setLoading(false);
    }

    useEffect(() => {
        getTabList(value={value})
    }, [value])

    return (
        <div className="films-browser-list">
            {loading && <CircularProgress color="success" />}
            {likedList &&
                likedList.map(likedMovie => (
                <div className="films-browser-card">
                    <MoviePoster
                        movie={likedMovie}
                        className={styles.browsingPoster}
                        responsible={true}/>
                    {check
                        &&
                        <div className="film-poster-buttons">
                            <WatchMovieButton
                                idMovie={likedMovie.id}
                                className={styles.watched}
                            />
                            <FavoriteMovieButton
                                idMovie={likedMovie.id}
                                className={styles.favorite}
                            />
                            <ToWatchMovieButton
                                idMovie={likedMovie.id}
                                className={styles.toWatch}
                            />
                        </div>
                    }
                </div>
            ))}
            {!likedList &&
                <div className="no-movies-container">
                    <p className="no-movies-text">Looks like this user hasn't added any movies yet.</p>
                    <SentimentDissatisfiedIcon className="dissatisfied-icon"/>
                </div>
            }
        </div>
    );
}
export default UserLikedList;