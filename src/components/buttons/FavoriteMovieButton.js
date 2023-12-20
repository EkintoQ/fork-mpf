import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './FavoriteMovieButton.module.css';
import {getFavoriteMovie, postFavoriteMovie} from '../../api/server/FavoriteMovieAPI';
import {AuthContext} from "../../App";

const FavoriteMovieButton = ({ idMovie, className }) => {
    const isLoggedIn = useContext(AuthContext);
    const [favorite, setFavorite] = useState(false);

    const getFavouriteMovieState = async () => {
        try {
            const response = await getFavoriteMovie(idMovie);
            setFavorite(response);
        } catch (error) {
            console.log(error);
        }
    };

    const handleClick = async () => {
        if (isLoggedIn) {
            setFavorite(!favorite)
            try {
                await postFavoriteMovie(idMovie);
            } catch (error) {
                console.log(error);
            }
        } else {
            window.location.href = '/login'
        }
    };

    const getFavoriteImage = () => {
        if (favorite) {
            return '/images/likeTrue.png';
        } else {
            return '/images/likeFalse.png';
        }
    };

    useEffect(() => {
        getFavouriteMovieState().then()
    }, [idMovie]);

    return (
        <img
            src={getFavoriteImage()}
            className={!className ? styles.default : className}
            alt="favorite"
            onClick={handleClick}
        />
    );
};

FavoriteMovieButton.propTypes = {
    idMovie: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default FavoriteMovieButton;