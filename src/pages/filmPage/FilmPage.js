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


    const getReviews = async () => {
        try {
            const response = await getReviewAll(id);
            setReviews(response.reverse());
        } catch (error) {
            console.log(error);
        }
    };

    const handleRatingChange = async(event, newValue) => {
        setUserRating(newValue);
        await setMovieRating(id, newValue);
    };

    useEffect(() => {
        getMovieDetails(id).then(data => setMovie(data))
        getMovieBackDropImage(id).then(data => setBack(data))
        getMovieTrailer(id).then(data => setTrailer(data))
        getReviews().then()
        getMovieCredits(id).then(data => setActors(data.cast))
        getMovieRating(id).then(data => setAVGRating(data))
    }, [id, userRating]);

    return (
        <div className="film-info-container">
            <div className="film-header" style={{backgroundImage: `url(${back})`}}></div>

            <div className="film-media-container">
                <div className="movie-like-container">
                    <div className="like-container">
                        <WatchMovieButton
                            idMovie={id}
                            className={styles.watched}
                        />
                        <FavoriteMovieButton
                            idMovie={id}
                            className={styles.favorite}
                        />
                        <ToWatchMovieButton
                            idMovie={id}
                            className={styles.favorite}
                        />
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
                        <div className="movie-rating-number">
                            AVG: {avgRating}
                        </div>
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
