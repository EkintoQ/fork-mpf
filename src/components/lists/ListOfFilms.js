import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import "./ListOfFilms.css";
import WatchMovieButton from "../buttons/WatchMovieButton";
import FavoriteMovieButton from "../buttons/FavoriteMovieButton";
import ToWatchMovieButton from "../buttons/ToWatchMovieButton";
import {getTabList} from "../../api/server/UserTabsService";
import styles from "../../pages/filmsBrowsingPage/FilmsBrowsingPage.module.css";
import MoviePoster from "../poster/MoviePoster";

const ListOfFilms = ({user, value}) => {
    const {username} = useParams()

    const [lists, setLists] = useState([])

    let check = false
    if (user.username === username) {
        check = true
        }

    useEffect(() => {
        getTabList(value).then(data => setLists(data))
    }, [value])

    return (
        <div className="lists-of-films">
            {lists && lists.map(list => (
                <div className="list-card" key={list.id}>
                    <div className="list-poster">
                        <MoviePoster
                            movie={list}
                            className={styles.browsingPoster}
                            responsible={true}/>
                        <div className="film-poster-buttons">
                            <WatchMovieButton
                                idMovie={list.id}
                                className={styles.watched}
                            />
                            <FavoriteMovieButton
                                idMovie={list.id}
                                className={styles.favorite}
                            />
                            <ToWatchMovieButton
                                idMovie={list.id}
                                className={styles.toWatch}
                            />
                        </div>
                    </div>
                    <div className="list-info">
                        <Link to={`/film/${list.id}`} className="films-browser-title">
                            {list.title}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ListOfFilms;
