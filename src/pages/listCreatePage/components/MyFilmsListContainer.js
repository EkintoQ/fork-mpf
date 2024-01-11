import React, {useContext, useEffect, useState} from 'react';
import {Button, TextField} from "@mui/material";
import MoviePoster from "../../../components/poster/MoviePoster";
import styles from "../../filmsBrowsingPage/FilmsBrowsingPage.module.css";
import {Link, useNavigate} from "react-router-dom";
import {updateUserList} from "../../../api/server/listOfFilmsService/ListFilmService/UpdateUserList";
import {addMovieToList} from "../../../api/server/listOfFilmsService/ListFilmService/AddMovieToList";
import {getUserList} from "../../../api/server/listOfFilmsService/ListFilmService/GetUserList";
import {postUserList} from "../../../api/server/listOfFilmsService/ListFilmService/PostUserList";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import "./MyFilmsListContainer.css"
import {deleteUserList} from "../../../api/server/listOfFilmsService/ListFilmService/DeleteUserList";
import {UserContext} from "../../../App";

const MyFilmsListContainer = ({id, movies, onSelectedMoviesChange, permission}) => {
    const myUser = useContext(UserContext);

    const navigate = useNavigate();

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

    const handleDeleteList = async() => {
        await deleteUserList(id);
        navigate(`/user/${myUser.username}`)
    }

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

                navigate(`/user/${myUser.username}`)
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
            {localPermission &&
                <div className="list-field">
                    {isEditMode ?
                        <p className="list-text-create">EDIT YOUR LIST</p>
                        :
                        <p className="list-text-create">START A NEW LIST</p>
                    }
                    <ArrowDownwardIcon className="arrow-icon"/>
                    <div className="list-inputs">
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
                        <DeleteIcon
                            className="delete-list-icon"
                            onClick={handleDeleteList}
                        />
                        {selectedMovies.length > 0 && localPermission && (
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
                </div>
            }
            {selectedMovies.length === 0 &&
                (localPermission ?
                        <p className="list-empty">ADD SOME FILMS TO YOUR LIST</p>
                        :
                        <p className="list-empty">LIST IS EMPTY</p>
                )
            }
            <div className="list-my-movie">
                {selectedMovies
                    &&
                    selectedMovies.map(movie => (
                        <div className="film-search-poster">
                            {localPermission &&
                                <CancelIcon
                                    className="remove-movie-button"
                                    onClick={() => handleRemoveFromSelected(movie)}
                                />
                            }
                            <MoviePoster
                                movie={movie}
                                className={styles.browsingPoster}
                                responsible={true}/>
                            <Link to={`/film/${movie.id}`} className="film-title">{movie.title}</Link>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default MyFilmsListContainer;