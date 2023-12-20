import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './ToWatchMovieButton.module.css';
import {getToWatch, postToWatchMovie} from '../../api/server/ToWatchMovieAPI';
import {AuthContext} from "../../App";

const ToWatchMovieButton = ({idMovie, className}) => {
    const [toWatch, setToWatch] = useState(false);
    const isLoggedIn = useContext(AuthContext);

    const getToWatchMovieState = async () => {
        try {
            const response = await getToWatch(idMovie);
            setToWatch(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getToWatchMovieState().then()
    }, [idMovie]);

    const handleClick = async () => {
        if (isLoggedIn) {
            setToWatch(!toWatch)
            try {
                await postToWatchMovie(idMovie);
            } catch (error) {
                console.log(error);
            }
        } else {
            window.location.href = '/login'
        }
    }

    const getToWatchImage = () => {
        if (toWatch) {
            return '/images/backpackYellow.png';
        } else {
            return '/images/backpackLogo.png';
        }
    };

    return (
        <img
            src={getToWatchImage()}
            className={!className ? styles.default : className}
            alt="toWatch"
            onClick={handleClick}
        />
    );
};

ToWatchMovieButton.propTypes = {
    idMovie: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default ToWatchMovieButton;