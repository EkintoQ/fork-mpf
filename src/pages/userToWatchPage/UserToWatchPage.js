import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import styles from '../filmsBrowsingPage/FilmsBrowsingPage.module.css';
import MoviePoster from "../../components/poster/MoviePoster";
import WatchMovieButton from "../../components/buttons/WatchMovieButton";
import FavoriteMovieButton from "../../components/buttons/FavoriteMovieButton";
import ToWatchMovieButton from "../../components/buttons/ToWatchMovieButton";
import "../userFavoritePage/UserFavoritePage.css";
import {UserContext} from "../../App";
import {getAllToWatch} from "../../api/server/ToWatchMovieAPI";

const UserToWatchPage = () => {
    const user = useContext(UserContext);
    const {username} = useParams()

    const [favoriteList, setFavoriteList] = useState([])

    let check = false
    if (user.username === username) {
        check = true
    }

    useEffect(() => {
        getAllToWatch().then(data => setFavoriteList(data))
    }, [username])

    return (
        <div className="films-browser-list">
            {favoriteList.map(favoriteMovie => (
                <div className="film-browser-card" key={favoriteMovie.id}>
                    <div className="film-browser-poster">
                        <MoviePoster
                            movie={favoriteMovie}
                            className={styles.browsingPoster}
                            responsible={true}/>
                        <div className="film-poster-buttons">
                            {check
                                &&
                                <WatchMovieButton
                                    idMovie={favoriteMovie.id}
                                    className={styles.watched}
                                />
                            }
                            {check
                                &&
                                <FavoriteMovieButton
                                    idMovie={favoriteMovie.id}
                                    className={styles.favorite}
                                />
                            }
                            {check
                                &&
                                <ToWatchMovieButton
                                    idMovie={favoriteMovie.id}
                                    className={styles.toWatch}
                                />
                            }
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default UserToWatchPage;