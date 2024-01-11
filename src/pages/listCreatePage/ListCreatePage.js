import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import "./ListCreatePage.css";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import {UserContext} from "../../App";
import {getUserList} from "../../api/server/listOfFilmsService/ListFilmService/GetUserList";
import SearchFilmContainerList from "./components/SearchFilmContainerList";
import MyFilmsListContainer from "./components/MyFilmsListContainer";
import {getRandomMovie} from "../../api/tmdb/MovieAPI";

const TMDB_PICTURE_BACK = process.env.REACT_APP_TMDB_PICTURE_BACK

const ListCreatePage = () => {
    const myUser = useContext(UserContext);

    const {username, id} = useParams()

    const [selectedMovies, setSelectedMovies] = useState([]);
    const [alignment, setAlignment] = useState('main');
    const [permission, setPermission] = useState(false);

    const [backgroundImage, setBackgroundImage] = useState('');


    const handleChange = (event, newAlignment) => {
        if (newAlignment) {
            setAlignment(newAlignment);
        }
    };

    const handleSelectedMoviesChange = (newSelectedMovies) => {
        setSelectedMovies(newSelectedMovies);
    };

    const checkPermission = () => {
        if (myUser && (username === myUser.username)) {
            setPermission(true);
        } else if (username===undefined) {
            setPermission(true);
        } else {
            setPermission(false);
        }
    };

    useEffect(() => {
        getUserList(id).then(data => {
            setSelectedMovies(data?.movies || selectedMovies);
        });
        getRandomMovie().then(data => setBackgroundImage(`${TMDB_PICTURE_BACK}${data.backdrop_path}`))
        checkPermission();
    }, [id, username, myUser])

    return (
        <div className="list-create-container">
            <div className="list-page-back">
                <img className="background-img" src={backgroundImage} alt="Your Image"/>
            </div>
            <div className="list-inner-container">
                {permission &&
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
                }
                {alignment === "search"
                    ?
                    <SearchFilmContainerList movies={selectedMovies}
                                             onSelectedMoviesChange={handleSelectedMoviesChange}/>
                    :
                    <MyFilmsListContainer id={id} movies={selectedMovies} permission={permission}
                                          onSelectedMoviesChange={handleSelectedMoviesChange}/>
                }
            </div>
        </div>
    )
}

export default ListCreatePage;
