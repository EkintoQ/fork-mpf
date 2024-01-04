import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import styles from "./MoviePoster.module.css";
import {getMovieRating} from "../../api/server/RatingMovieAPI";

const TMDB_PICTURE = process.env.REACT_APP_TMDB_PICTURE
const NO_IMAGE = process.env.REACT_APP_NO_IMAGE

const MoviePoster = ({ movie, className, responsible }) => {
    const [rating, setRating] = useState();
    const path = movie.poster_path ? TMDB_PICTURE + movie.poster_path : NO_IMAGE;


    const getRatingMovie = async () => {
        try {
            const response = await getMovieRating(movie.id);
            setRating(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getRatingMovie().then()
    }, []);

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
                    <div className={styles.rating} style={{position: 'absolute', bottom: '0', right: '0'}}>
                        {rating}
                    </div>
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
                    <div className={styles.rating} style={{position: 'absolute', bottom: '0', right: '0'}}>
                        {rating}
                    </div>
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
