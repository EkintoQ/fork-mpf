import React, {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import "./ListCreatePage.css";
import styles from "../../pages/filmsBrowsingPage/FilmsBrowsingPage.module.css";
import {Button, TextField, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {getMovieSearch} from "../../api/tmdb/MovieAPI";
import MoviePoster from "../../components/poster/MoviePoster";
import {UserContext} from "../../App";
import {postUserList} from "../../api/server/listOfFilmsService/ListFilmService/PostUserList";
import {addMovieToList} from "../../api/server/listOfFilmsService/ListFilmService/AddMovieToList";
import {updateUserList} from "../../api/server/listOfFilmsService/ListFilmService/UpdateUserList";
import {getUserList} from "../../api/server/listOfFilmsService/ListFilmService/GetUserList";

const ListCreatePage = () => {
    const user = useContext(UserContext);

    const {username, id} = useParams()

    const [selectedMovies, setSelectedMovies] = useState([]);
    const [alignment, setAlignment] = useState('main');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);

    const isMovieSelected = (movie) => {
        return selectedMovies.some((selectedMovie) => selectedMovie.id === movie.id);
    };

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const handleChangeSearch = (event) => {
        setQuery(event.target.value);
    };

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleChangeContent = (event) => {
        setContent(event.target.value);
    };

    const handleRemoveFromSelected = (movie) => {
        const updatedSelectedMovies = selectedMovies.filter(
            (selectedMovie) => selectedMovie.id !== movie.id
        );
        setSelectedMovies(updatedSelectedMovies);
    };

    const handleAddToSelected = (movie) => {
        const updatedSelectedMovies = [...selectedMovies, movie];
        setSelectedMovies(updatedSelectedMovies);
    };

    const handleSaveNewList = async () => {
        try {
            const newList = await postUserList(title, content);
            if (newList && newList.id) {
                const listId = newList.id;

                for (const movie of selectedMovies) {
                    await addMovieToList(listId, movie.id);
                }

                setIsEditMode(true);
                console.log('New list and movies added successfully!');
            }
        } catch (error) {
            console.error('Error creating list or adding movies:', error);
        }
    };

    const handleUpdateList = async () => {
        await updateUserList(content, id, title);
        for (const movie of selectedMovies) {
            await addMovieToList(id, movie.id);
        }
    };

    let check = false
    if (user.username === username) {
        check = true
    }

    useEffect(() => {
        getUserList(id).then(data => {
            setSelectedMovies(data?.movies || selectedMovies);
            setTitle(data?.title || title);
            setContent(data?.content || content);
            data ? setIsEditMode(true) : setIsEditMode(false);
        });
        getMovieSearch(query).then(data => setSearchResults(data.results));
    }, [query])

    return (
        <div className="list-create-container">
            <div className="list-inner-container">
                <ToggleButtonGroup
                    color="primary"
                    className="toggle-group"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                >
                    <ToggleButton className="toggle-button" value="main">My list</ToggleButton>
                    <ToggleButton className="toggle-button" value="search">Search</ToggleButton>
                </ToggleButtonGroup>
                {alignment === "search"
                    ?
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
                            {searchResults
                                &&
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
                                ))}
                        </div>
                    </div>
                    :
                    <div className="list-mine-container">
                            <div></div>
                            <TextField
                                className="title-field"
                                label="Title of the list"
                                variant="outlined"
                                onChange={handleChangeTitle}
                                value={title}
                                InputLabelProps={{
                                    shrink: Boolean(title),
                                }}
                            />
                            <TextField
                                className="content-field"
                                label="Description of the list"
                                variant="outlined"
                                onChange={handleChangeContent}
                                value={content}
                                InputLabelProps={{
                                    shrink: Boolean(content),
                                }}
                            />
                            <div className="list-search-movie">
                                {selectedMovies
                                    &&
                                    selectedMovies.map(movie => (
                                        <div className="film-search-poster">
                                            <Button
                                                className="remove-movie-button"
                                                onClick={() => handleRemoveFromSelected(movie)}
                                            >
                                                Remove from my list
                                            </Button>
                                            <MoviePoster
                                                movie={movie}
                                                className={styles.browsingPoster}
                                                responsible={true}/>
                                            <Link to={`/film/${movie.id}`} className="film-title">{movie.title}</Link>
                                        </div>
                                    ))}
                            </div>
                        {selectedMovies.length > 0
                            ?
                            <div>
                                {isEditMode ? (
                                    <Button
                                        className="update-list-button"
                                        onClick={handleUpdateList}
                                    >
                                        Update list
                                    </Button>
                                ) : (
                                    <Button
                                        className="save-list-button"
                                        onClick={handleSaveNewList}
                                    >
                                        Save new list
                                    </Button>
                                )}
                            </div>
                            :
                            <p className="list-empty">List is empty</p>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default ListCreatePage;
