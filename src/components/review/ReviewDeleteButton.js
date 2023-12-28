import {useState} from "react";
import {delReview} from "../../api/server/ReviewAPI";
import styles from "./ReviewDeleteButton.module.css";
import PropTypes from "prop-types";

const ReviewDeleteButton = ({idReview, updateReviews, className}) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = async () => {
        try {
            await delReview(idReview);
            await updateReviews();
        } catch (error) {
            console.log(error);
        }
    }

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const getReviewDeleteImage = () => {
        if (!isHovered) {
            return "/images/trash_blue.png";
        } else {
            return '/images/trash_logo.png';
        }
    };

    return (
        <img
            src={getReviewDeleteImage()}
            className={!className ? styles.default : className}
            alt="delete"
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        />
    )
}

ReviewDeleteButton.propTypes = {
    idReview: PropTypes.number.isRequired,
    updateReviews: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default ReviewDeleteButton;