import {useParams} from 'react-router-dom';
import {AuthContext} from "../../App";
import {useContext, useEffect, useState} from 'react';
import ReactPlayer from 'react-player';
import './FilmPage.css';
import styles from "./FilmPage.module.css";
import {getMovieBackDropImage, getMovieCredits, getMovieDetails, getMovieTrailer} from "../../api/tmdb/MovieAPI";
    import WatchMovieButton from "../../components/buttons/WatchMovieButton";
import FavoriteMovieButton from "../../components/buttons/FavoriteMovieButton";
import ToWatchMovieButton from "../../components/buttons/ToWatchMovieButton";
import MoviePoster from "../../components/poster/MoviePoster";
import CreateReviewForm from "../../components/review/CreateReviewForm";
import SingleReview from "../../components/review/SingleReview";
import ActorsSlider from "./components/ActorsSlider";
import {getReviewAll} from "../../api/server/reviewService/GetReviewAll";
import {Rating} from "@mui/material";
import {getMovieRating} from "../../api/server/ratingService/GetMovieRating";
import {setMovieRating} from "../../api/server/ratingService/SetMovieRating";
import {getMyMovieRating} from "../../api/server/ratingService/GetMyMovieRating";
import {deleteMovieRating} from "../../api/server/ratingService/DeleteMovieRating";
import {getMovieStats} from "../../api/server/movieService/getMovieStats";

const FilmPage = () => {
    const {id} = useParams();

    const isLoggedIn = useContext(AuthContext);

    const [movie, setMovie] = useState([]);
    const [back, setBack] = useState([]);
    const [trailer, setTrailer] = useState('');
    const [reviews, setReviews] = useState([]);
    const [actors, setActors] = useState([]);
    const [userRating, setUserRating] = useState(0);
    const [avgRating, setAVGRating] = useState(0);
    const [favoriteCount, setFavoriteCount] = useState(0);
    const [toWatchCount, setToWatchCount] = useState(0);
    const [watchedCount, setWatchedCount] = useState(0);
    const [ratedCount, setRatedCount] = useState(0);


    const getReviews = async () => {
        try {
            const response = await getReviewAll(id);
            setReviews(response.reverse());
        } catch (error) {
            console.log(error);
        }
    };

    const handleRatingChange = async(event, newValue) => {
        console.log(newValue, userRating);
        if (newValue === null){
            await deleteMovieRating(id);
            setUserRating(0);
        } else {
            await setMovieRating(id, newValue);
            setUserRating(newValue);
        }
    };

    useEffect(() => {
        getMovieDetails(id).then(data => setMovie(data))
        getMovieBackDropImage(id).then(data => setBack(data))
        getMovieTrailer(id).then(data => setTrailer(data))
        getReviews().then()
        getMovieCredits(id).then(data => setActors(data.cast))
        getMovieRating(id).then(data => setAVGRating(data))
        getMyMovieRating(id).then(data => setUserRating(data))
        getMovieStats(id).then(data => {
            setFavoriteCount(data.favoriteCount);
            setToWatchCount(data.toWatchCount);
            setWatchedCount(data.watchedCount);
            setRatedCount(data.ratingCount);
        })
    }, [id, userRating]);

    return (
        <div className="film-info-container">
            <div className="film-header" style={{backgroundImage: `url(${back})`}}></div>

            <div className="film-media-container">
                <div className="movie-like-container">
                    <div className="like-container">
                        <div className="button-stats">
                            <WatchMovieButton
                                idMovie={id}
                                className={styles.watched}
                            />
                            {watchedCount}
                        </div>
                        <div className="button-stats">
                            <FavoriteMovieButton
                                idMovie={id}
                                className={styles.favorite}
                            />
                            {favoriteCount}
                        </div>
                        <div className="button-stats">
                            <ToWatchMovieButton
                                idMovie={id}
                                className={styles.favorite}
                            />
                            {toWatchCount}
                        </div>
                    </div>
                    <div className="movie-poster-rating">
                        <MoviePoster
                            movie={movie}
                        />
                        <Rating
                            className="movie-rating"
                            value={userRating > 0 ? userRating : avgRating}
                            max={10}
                            onChange={handleRatingChange}
                        />
                        <div className="rated-count">
                            Rated by {ratedCount} members
                        </div>
                        <div className="movie-rating-number">
                            AVG: {avgRating}
                        </div>
                        {userRating > 0 &&
                            <div className="movie-rating-number">
                                Your rating: {userRating}
                            </div>
                        }
                    </div>
                </div>
                <div className="film-details">
                    <h1>{movie.title}</h1>
                    <p>Release Date: {movie.release_date}</p>
                    <p>Runtime: {movie.runtime} minutes</p>
                    {movie.genres && movie.genres.length > 0 && (
                        <p>Genres: {movie.genres.map((genre) => genre.name).join(", ")}</p>
                    )}
                    <p>Revenue: {movie.revenue} $</p>
                    <p>Overview: {movie.overview}</p>
                </div>
            </div>

            {trailer && (
                <div className="player-wrapper">
                    <ReactPlayer
                        className="react-player"
                        url={trailer}
                        controls={true}
                    />
                </div>
            )}

            <div className="carousel-cast">
                <h1>Cast</h1>
                <ActorsSlider
                    actors={actors}
                    />
            </div>

            {isLoggedIn
                &&
                <div className="review-create-container">
                    <CreateReviewForm
                        movieId={movie.id}
                        updateReviews={getReviews}
                    />
                </div>
            }

            <div className="review-container">
                <h2>All Reviews</h2>
                {reviews.map((review) => (
                    <SingleReview
                        review={review}
                        updateReviews={getReviews}
                    />
                ))}
            </div>

        </div>
    );
};

export {FilmPage};
