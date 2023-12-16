import React from "react";
import {Link} from "react-router-dom";
import "./ListOfFilms.css";
import WatchMovieButton from "../buttons/WatchMovieButton";
import FavoriteMovieButton from "../buttons/FavoriteMovieButton";
import ToWatchMovieButton from "../buttons/ToWatchMovieButton";
import Poster from "../poster/Poster";

const ListOfFilms = ({movies}) => {

    const TMDB_PIC = process.env.REACT_APP_TMDB_PICTURE

    return (
        <div className="films-browser-list">
            {movies && movies.map(movie => (
                <div className="film-browser-card" key={movie.id}>
                    <div className="film-browser-poster">
                        <Poster
                            path={TMDB_PIC + movie.poster_path}
                            link={`/film/${movie.id}`}
                        />
                        <div className="film-poster-buttons">
                            <WatchMovieButton
                                idMovie={movie.id}

                            />
                            <FavoriteMovieButton
                                idMovie={movie.id}

                            />
                            <ToWatchMovieButton
                                idMovie={movie.id}

                            />
                        </div>
                    </div>
                    <div className="films-browser-info">
                        <Link to={`/film/${movie.id}`} className="films-browser-title">
                            {movie.title}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ListOfFilms;
