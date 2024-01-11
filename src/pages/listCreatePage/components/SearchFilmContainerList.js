import React, {useEffect, useState} from 'react';
import {Button, TextField} from "@mui/material";
import MoviePoster from "../../../components/poster/MoviePoster";
import styles from "../../filmsBrowsingPage/FilmsBrowsingPage.module.css";
import {Link} from "react-router-dom";
import "./SearchFilmContainerList.css"
import {getMovieSearch} from "../../../api/tmdb/MovieAPI";

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
            <div className="list-search-movie">
                {searchResults.length > 1
                    ?
                    searchResults.map(movie => (
                        <div className="film-search-poster">
                            {isMovieSelected(movie) ? (
                                <Button
                                    className="remove-movie-button"
                                    onClick={() => handleRemoveFromSelected(movie)}
                                >
                                    Remove from my list
                                </Button>
                            ) : (
                                <Button
                                    className="add-movie-button"
                                    onClick={() => handleAddToSelected(movie)}
                                >
                                    Add to my list
                                </Button>
                            )}
                            <MoviePoster
                                movie={movie}
                                className={styles.browsingPoster}
                                responsible={true}/>
                            <Link to={`/film/${movie.id}`} className="film-title">{movie.title}</Link>
                        </div>
                    ))
                    :
                    <div className="no-search">
                    {!query ?
                        <p>Type something to search</p>
                        :
                        <p>There is no films like {query}</p>
                    }
                    </div>
                }
            </div>
        </div>
    );
};

export default SearchFilmContainerList;