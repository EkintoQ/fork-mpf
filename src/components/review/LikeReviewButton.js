import React, {useContext, useEffect, useState} from "react";
import styles from "./LikeReviewButton.module.css";
import PropTypes from "prop-types";
import {AuthContext} from "../../App";
import {getReviewLike} from "../../api/server/reviewService/GetReviewLike";
import {postReviewLike} from "../../api/server/reviewService/PostReviewLike";

const LikeReviewButton = ({idReview, className, up}) => {
    const isLoggedIn = useContext(AuthContext);
    const [isHovered, setIsHovered] = useState(false);
    const [like, setLike] = useState();

    const getLikeState = async () => {
        try {
            const response = await getReviewLike(idReview);
            setLike(response);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const handleClick = async () => {
        if (isLoggedIn) {
            try {
                setLike(!like);
                if (up === false && like === undefined){
                    setLike(false)
                }
                await postReviewLike(idReview, up);
            } catch (error) {
                console.log(error);
            }
        } else {
            window.location.href = '/login'
        }
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const getLikeImage = () => {
        if (up) {
            if (isHovered) {
                return '/images/like_blue.png';
            } else if (like === true) {
                return '/images/like_logo.png';
            } else {
                return '/images/like_yellow.png';
            }
        } else {
            if (isHovered) {
                return '/images/dislike_blue.png';
            } else if (like === false) {
                return '/images/dislike_logo.png';
            } else {
                return '/images/dislike_yellow.png';
            }
        }
    };

    useEffect(() => {
        getLikeState().then()
    }, [like]);


    return (
        <img
            src={getLikeImage()}
            className={!className ? styles.default : className}
            alt="like"
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        />
    )
}

LikeReviewButton.propTypes = {
    idReview: PropTypes.number.isRequired,
    className: PropTypes.string,
    up: PropTypes.bool.isRequired
};

export default LikeReviewButton;