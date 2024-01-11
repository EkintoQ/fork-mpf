import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import "./ListCreatePage.css";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import {UserContext} from "../../App";
import {getUserList} from "../../api/server/listOfFilmsService/ListFilmService/GetUserList";
import SearchFilmContainerList from "./components/SearchFilmContainerList";
import MyFilmsListContainer from "./components/MyFilmsListContainer";

const ListCreatePage = () => {
    const myUser = useContext(UserContext);

    const {username, id} = useParams()

    const [selectedMovies, setSelectedMovies] = useState([]);
    const [alignment, setAlignment] = useState('main');
    const [permission, setPermission] = useState(false);


    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const handleSelectedMoviesChange = (newSelectedMovies) => {
        setSelectedMovies(newSelectedMovies);
    };

    const checkPermission = () => {
        if (myUser && username === myUser.username) {
            setPermission(true);
        } else {
            setPermission(false);
        }
    };

    useEffect(() => {
        getUserList(id).then(data => {
            setSelectedMovies(data?.movies || selectedMovies);
        });
        checkPermission();
    }, [id, username, myUser])

    return (
        <div className="list-create-container">
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
                    <SearchFilmContainerList movies={selectedMovies} onSelectedMoviesChange={handleSelectedMoviesChange}/>
                    :
                    <MyFilmsListContainer id={id} movies={selectedMovies} permission={permission} onSelectedMoviesChange={handleSelectedMoviesChange}/>
                }
            </div>
        </div>
    )
}

export default ListCreatePage;
