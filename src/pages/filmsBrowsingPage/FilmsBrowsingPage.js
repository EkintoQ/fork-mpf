import {Link, useNavigate, useParams} from 'react-router-dom'
import React, {useEffect, useState} from "react";
import './FilmsBrowsingPage.css'
import WatchMovieButton from "../../components/buttons/WatchMovieButton";
import FavoriteMovieButton from "../../components/buttons/FavoriteMovieButton";
import styles from './FilmsBrowsingPage.module.css';
import {getMovies} from "../../api/tmdb/PaginationMovieAPI";
import Pagination from "../../components/pagination/Pagination";
import ToWatchMovieButton from "../../components/buttons/ToWatchMovieButton";
import MoviePoster from "../../components/poster/MoviePoster";
import {Spinner} from "react-bootstrap";
import {getFavoriteMovie} from "../../api/server/listOfFilmsService/FavoriteFilmService/GetFavoriteMovie";

const FilmsBrowsingPage = () => {
    const {currentPage} = useParams();
    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(9999);
    const [loading, setLoading] = useState(false);

    const getMovieList = async (page) => {
        setLoading(true);
        try {
            const movieList = await getMovies(page)
            const moviesWithLike = await Promise.all(
                movieList.map(async (movie) => {
                    const likedMovie = await getFavoriteMovie(movie.id);
                    return {
                        ...movie,
                        likedMovie: likedMovie
                    };
                })
            );
            setMovies(moviesWithLike);
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    };

    const handlePreviousPage = () => {
        if (parseInt(currentPage) > 1) {
            navigate(`/films/${parseInt(currentPage) - 1}`);
        }
    };

    const handleNextPage = () => {
        if (parseInt(currentPage) < totalPages) {
            navigate(`/films/${parseInt(currentPage) + 1}`);
        }
    };

    useEffect(() => {
        getMovieList(currentPage).then();
    }, [currentPage]);

    return (
        <div className="films-browser-container">
            <h1 className="header">Movie Browser</h1>
            <div className="films-browser-list">
                {movies.map(movie => (
                    <div className="film-browser-card" key={movie.id}>
                        <div className="film-browser-poster">
                            <MoviePoster
                                movie={movie}
                                className={styles.browsingPoster}
                                responsible={true}/>
                            <div className="film-poster-buttons">
                                <WatchMovieButton
                                    idMovie={movie.id}
                                    className={styles.watched}
                                />
                                <FavoriteMovieButton
                                    idMovie={movie.id}
                                    className={styles.favorite}
                                />
                                <ToWatchMovieButton
                                    idMovie={movie.id}
                                    className={styles.toWatch}
                                />
                            </div>
                        </div>
                        <div className="films-browser-info">
                            <Link to={`/film/${movie.id}`} className="films-browser-title">
                                {movie.title}
                            </Link>
                            <div className="release-date">
                                {movie.release_date.split('-')[0]}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination
                currentPage={parseInt(currentPage)}
                totalPages={totalPages}
                onPreviousPage={handlePreviousPage}
                onNextPage={handleNextPage}
            />
        </div>

    )
}

export default FilmsBrowsingPage;
