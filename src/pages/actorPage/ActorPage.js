import React, {useContext, useEffect, useState, lazy, Suspense} from "react";
import {AuthContext} from "../../App";
import {useParams} from "react-router-dom";
import {getActorCredits, getActorDetails} from "../../api/tmdb/ActorService";
import Poster from "../../components/poster/Poster";
import "./ActorPage.css"
import ActorFilmsDropDownMenu from "./components/ActorFilmsDropDownMenu";

const ListOfFilms = lazy(() => import('../../components/lists/UserLikedList'));

const ActorPage = () => {
    const {id} = useParams();
    const isLoggedIn = useContext(AuthContext);

    const TMDB_PIC = process.env.REACT_APP_TMDB_PICTURE

    const [actor, setActor] = useState([]);
    const [credits, setCredits] = useState([]);
    const [isTextVisible, setIsTextVisible] = useState(false);
    const [selectedRole, setSelectedRole] = useState('cast');
    const [isListVisible, setIsListVisible] = useState(true);

    const handleRoleChange = (role) => {
        setSelectedRole(role);
    };

    const toggleTextVisibility = () => {
        setIsTextVisible(!isTextVisible);
    };

    const handleListVisibilityChange = (isVisible) => {
        setIsListVisible(isVisible);
    };

    useEffect(() => {
        getActorDetails(id).then(data => setActor(data))
        getActorCredits(id).then(data => setCredits(data))
    }, [selectedRole]);

    return(
        <div className="actor-info-container">
            <h1>{actor.name}</h1>
            <hr/>
            <div className="actor-header">
                <div className="actor-poster-container">
                    <Poster
                        path={TMDB_PIC + actor.profile_path}
                        id={`/person/${id}`}
                    />
                    <div>
                        {actor.birthday && <p>{`Birthday: ${actor.birthday}`}</p>}
                        {actor.deathday && <p>{`Deathday: ${actor.deathday}`}</p>}
                        {actor.place_of_birth && <p>{`Place of birth: ${actor.place_of_birth}`}</p>}
                    </div>
                </div>
                <div className="actor-bio">
                    <div className={isTextVisible ? "actor-bio-visible" : "actor-bio-hidden"}>
                        {actor.biography}
                    </div>
                    {isTextVisible && (
                        <button className="actor-no-expand-btn" onClick={toggleTextVisibility}>
                            x
                        </button>
                    )}
                    {!isTextVisible && (
                        <button className="actor-expand-btn" onClick={toggleTextVisibility}>
                            show more
                        </button>
                    )}
                </div>
            </div>
            <div className="actor-film-bar">
                <hr/>
                <h2>Films with {actor.name}</h2>
                <hr/>
                <ActorFilmsDropDownMenu onRoleChange={handleRoleChange} onListVisibilityChange={handleListVisibilityChange} />
                <Suspense fallback={<div>Loading...</div>}>
                    {/*{isListVisible && <ListOfFilms movies={selectedRole === 'cast' ? credits.cast : credits.crew} />}*/}
                </Suspense>
            </div>
            <div className="actor-comment-section">
                <hr/>
                <h2>Recent reviews</h2>
                <hr/>

            </div>
        </div>
    );
};

export {ActorPage};