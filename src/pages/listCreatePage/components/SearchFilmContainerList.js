import React, {useEffect, useState} from 'react';
import { TextField} from "@mui/material";
import MoviePoster from "../../../components/poster/MoviePoster";
import styles from "../../filmsBrowsingPage/FilmsBrowsingPage.module.css";
import {Link} from "react-router-dom";
import "./SearchFilmContainerList.css"
import {getMovieSearch} from "../../../api/tmdb/MovieAPI";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const SearchFilmContainerList = ({movies, onSelectedMoviesChange}) => {

    const [selectedMovies, setSelectedMovies] = useState(movies);
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const isMovieSelected = (movie) => {
        return selectedMovies.some((selectedMovie) => selectedMovie.id === movie.id);
    };

    const handleAddToSelected = (movie) => {
        const updatedSelectedMovies = [...selectedMovies, movie];
        setSelectedMovies(updatedSelectedMovies);
        onSelectedMoviesChange(updatedSelectedMovies);
    };

    const handleRemoveFromSelected = (movie) => {
        const updatedSelectedMovies = selectedMovies.filter(
            (selectedMovie) => selectedMovie.id !== movie.id
        );
        setSelectedMovies(updatedSelectedMovies);
        onSelectedMoviesChange(updatedSelectedMovies);
    };

    const handleChangeSearch = (event) => {
        setQuery(event.target.value);
    };

    useEffect(() => {
        getMovieSearch(query).then(data => setSearchResults(data.results));
    }, [query])

    return (
        <div className="search-list-container">
            <p className="list-text-search">SEARCH A FILM</p>
            <ArrowDownwardIcon className="arrow-icon"/>
            <TextField
                className="search-list-field"
                label="Search field"
                variant="outlined"
                onChange={handleChangeSearch}
                value={query}
                InputLabelProps={{
                    shrink: Boolean(query),
                }}
            />
            {searchResults.length > 1 ?
                <div className="list-search-movie">
                    {searchResults.map(movie => (
                        <div className="film-search-poster">
                            {isMovieSelected(movie) ?
                                <CancelIcon
                                    className="remove-movie-button"
                                    onClick={() => handleRemoveFromSelected(movie)}
                                >
                                </CancelIcon>
                                :
                                <AddCircleIcon
                                    className="add-movie-button"
                                    onClick={() => handleAddToSelected(movie)}
                                />
                            }
                            <MoviePoster
                                movie={movie}
                                className={styles.browsingPoster}
                                responsible={true}
                            />
                            <Link to={`/film/${movie.id}`} className="film-title">
                                {movie.title}
                            </Link>
                        </div>
                    ))}
                </div>
            :
                <div className="no-query-container">
                    {!query ?
                        <p className="no-query-text">Type something to search</p>
                        :
                        <p className="no-query-text">There is no films in base like {query}</p>
                    }
                </div>
            }
        </div>
    );
};

export default SearchFilmContainerList;