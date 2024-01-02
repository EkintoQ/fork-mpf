import React, {useContext} from 'react';
import styles from "./SingleReview.module.css";
import ReviewDeleteButton from "./ReviewDeleteButton";
import {UserContext} from "../../App";
import PropTypes from "prop-types";
import LikeReviewButton from "./LikeReviewButton";
import {Link} from "react-router-dom";

const BASE_URL= process.env.REACT_APP_BASE_URL;

const SingleReview = ({ review, updateReviews, className }) => {
    const user = useContext(UserContext);

    return (
        <div className={styles.singleReview} key={review.id}>
            <Link to ={`/user/${review.user.username}`}>
                <img
                    src={`${BASE_URL}/images/${review.user.avatar}`}
                    alt='USER'
                    style={{
                        width: "80px",
                    }}
                />
            </Link>
            <div className={styles.reviewContent}>
                <h>
                    Review by <strong className={styles.logoText}>{review.user.username}</strong>
                    <p className="blue-text">Created:
                        <span
                        className="yellow-text">{review.dataCreated ? new Date(review.dataCreated).toLocaleDateString() : '0'}
                        </span>
                    </p>
                </h>
                <h3>{review.title}</h3>
                <p>{review.content}</p>
            </div>
            <div className={styles.RightContainer}>
                <div className={styles.RightTopContainer}>
                    {user
                        &&
                        user.username === review.user.username
                        &&
                        <ReviewDeleteButton
                            idReview={review.id}
                            updateReviews={updateReviews}
                        />
                    }
                </div>
                <div className={styles.RightBottomContainer}>
                    <LikeReviewButton
                        idReview={review.id}
                        up={false}
                    />
                    <LikeReviewButton
                        idReview={review.id}
                        up={true}
                    />
                </div>
            </div>
        </div>
    );
};

SingleReview.propTypes = {
    review: PropTypes.object.isRequired,
    updateReviews: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default SingleReview;