import React, {useEffect, useState} from 'react';
import './SearchPage.css'
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import { getMovieSearch } from '../../api/tmdb/MovieAPI';
import MoviePoster from "../../components/poster/MoviePoster";
import styles from "../filmsBrowsingPage/FilmsBrowsingPage.module.css";
import {Link} from "react-router-dom";

const SearchPage = () => {
    const [option, setOption] = useState('films');
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (event) => {
        setOption(event.target.value);
    };

    const handleChangeSearch = (event) => {
        setQuery(event.target.value);
    };

    useEffect(() => {
        getMovieSearch(query).then(data => setSearchResults(data.results));
    }, [query]);

    return (
        <div className="search-page-container">
            <div className="search-header">
                <FormControl className="search-form">
                    <InputLabel className="search-input">Choose field</InputLabel>
                    <Select
                        className="search-select"
                        value={option}
                        onChange={handleChange}
                    >
                        <MenuItem className="search-item" value={'films'}>Films</MenuItem>
                        <MenuItem className="search-item" value={'actors'}>Actors</MenuItem>
                        <MenuItem className="search-item" value={'users'}>Users</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    className="search-field"
                    label="Search field"
                    variant="outlined"
                    onChange={handleChangeSearch}
                />
            </div>
            {query ?
                <div className="search-answer-container">
                    {searchResults
                        &&
                        option === 'films'
                        &&
                        searchResults.map(movie => (
                            <div className="film-search-poster">
                                <MoviePoster
                                    movie={movie}
                                    className={styles.browsingPoster}
                                    responsible={true}/>
                                <Link to={`/film/${movie.id}`} className="film-title">{movie.title}</Link>
                            </div>
                    ))}
                </div>
                :
                <div className="no-search">
                    Type something in search field...
                </div>
            }
        </div>
    );
};

export default SearchPage;
