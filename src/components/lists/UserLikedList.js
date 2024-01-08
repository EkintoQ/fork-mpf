import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import styles from '../../pages/filmsBrowsingPage/FilmsBrowsingPage.module.css';
import MoviePoster from "../poster/MoviePoster";
import WatchMovieButton from "../buttons/WatchMovieButton";
import FavoriteMovieButton from "../buttons/FavoriteMovieButton";
import ToWatchMovieButton from "../buttons/ToWatchMovieButton";
import "./UserLikedList.css";
import {getTabList} from "../../api/server/UserTabsService";
import {UserContext} from "../../App";

const UserLikedList = ({value}) => {
    const user = useContext(UserContext);
    const {username} = useParams()

    const [likedList, setLikedList] = useState([])

    let check = false
    if (user && user.username === username) {
        check = true
    }

    useEffect(() => {
        getTabList(value={value}).then(data => setLikedList(data))
    }, [value])

    return (
        <div className="films-browser-list">
            {likedList &&
                likedList.map(likedMovie => (
                <div className="film-browser-card" key={likedMovie.id}>
                    <div className="film-browser-poster">
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
                </div>
            ))}
            {!likedList &&
                <p>NO MOVIES</p>
            }
        </div>
    );
}
export default UserLikedList;