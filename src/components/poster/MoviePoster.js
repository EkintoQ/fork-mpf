import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import styles from "./MoviePoster.module.css";
import {getMovieRating} from "../../api/server/ratingService/GetMovieRating";

const TMDB_PICTURE = process.env.REACT_APP_TMDB_PICTURE
const NO_IMAGE = process.env.REACT_APP_NO_IMAGE

const MoviePoster = ({ movie, className, responsible }) => {
    const path = movie.poster_path ? TMDB_PICTURE + movie.poster_path : NO_IMAGE;

    return (
        <div>
            {responsible && (
                <Link to={`/film/${movie.id}`}>
                    <div style={{position: 'relative', display: 'inline-block'}}>
                        <img
                            src={path}
                            className={!className ? styles.default : className}
                            alt="movie-poster"
                        />
                    </div>
                </Link>
            )}
            {!responsible && (
                <div style={{position: 'relative', display: 'inline-block'}}>
                    <img
                        src={path}
                        className={!className ? styles.default : className}
                        alt="movie-poster"
                    />
                </div>
            )}
        </div>


    )
}

MoviePoster.propTypes = {
    movie: PropTypes.object.isRequired,
    className: PropTypes.string,
    responsible: PropTypes.bool
};

export default MoviePoster;
