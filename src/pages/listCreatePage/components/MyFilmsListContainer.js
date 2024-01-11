import React, {useEffect, useState} from 'react';
import {Button, TextField} from "@mui/material";
import MoviePoster from "../../../components/poster/MoviePoster";
import styles from "../../filmsBrowsingPage/FilmsBrowsingPage.module.css";
import {Link} from "react-router-dom";
import {updateUserList} from "../../../api/server/listOfFilmsService/ListFilmService/UpdateUserList";
import {addMovieToList} from "../../../api/server/listOfFilmsService/ListFilmService/AddMovieToList";
import {getUserList} from "../../../api/server/listOfFilmsService/ListFilmService/GetUserList";
import {postUserList} from "../../../api/server/listOfFilmsService/ListFilmService/PostUserList";
import "./MyFilmsListContainer.css"

const MyFilmsListContainer = ({id, movies, onSelectedMoviesChange, permission}) => {

    const [selectedMovies, setSelectedMovies] = useState(movies);
    const [oldSelectedMovies, setOldSelectedMovies] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [localPermission, setLocalPermission] = useState(permission)

    const handleRemoveFromSelected = (movie) => {
        const updatedSelectedMovies = selectedMovies.filter(
            (selectedMovie) => selectedMovie.id !== movie.id
        );
        setSelectedMovies(updatedSelectedMovies);
        onSelectedMoviesChange(updatedSelectedMovies);
    };

    const handleChangeContent = (event) => {
        setContent(event.target.value);
    };

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleUpdateList = async () => {
        const newMovies = selectedMovies.filter(movie => !oldSelectedMovies.some(oldMovie => oldMovie.id === movie.id));

        const removedMovies = oldSelectedMovies.filter(oldMovie => !selectedMovies.some(movie => movie.id === oldMovie.id));

        for (const movie of newMovies) {
            await addMovieToList(id, movie.id);
        }

        for (const movie of removedMovies) {
            await addMovieToList(id, movie.id);
        }

        await updateUserList(content, id, title);
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

    useEffect(() => {
        getUserList(id).then(data => {
            setTitle(data?.title || title);
            setContent(data?.content || content);
            setOldSelectedMovies(data?.movies || []);
            data ? setIsEditMode(true) : setIsEditMode(false);
        });
        setSelectedMovies(movies);
        setLocalPermission(permission);
    }, [id, movies, permission])

    return (
        <div className="list-mine-container">
            <div></div>
            {localPermission &&
                <div className="list-field">
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
                </div>
            }
            <div className="list-search-movie">
                {selectedMovies
                    &&
                    selectedMovies.map(movie => (
                        <div className="film-search-poster">
                            {localPermission &&
                                <Button
                                    className="remove-movie-button"
                                    onClick={() => handleRemoveFromSelected(movie)}
                                >
                                    Remove from my list
                                </Button>
                            }
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
                    {localPermission && (
                        isEditMode ? (
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
                        )
                    )}
                </div>
                :
                <p className="list-empty">List is empty</p>
            }
        </div>
    );
};

export default MyFilmsListContainer;