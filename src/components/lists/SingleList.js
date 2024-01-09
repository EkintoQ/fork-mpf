import React from 'react';
import {Link, useParams} from "react-router-dom";
import "./SingleList.css"

const TMDB_PICTURE = process.env.REACT_APP_TMDB_PICTURE

const SingleList = ({list}) => {
    const {username} = useParams()

    return (
        <div className="list-card">
            <div className="list-poster">
                {list.movies && list.movies.slice(0, 4).map((movie, index) => (
                    <div className={`list-movie-poster-wrapper position-${index + 1}`} key={index}>
                        <img
                            className="list-movie-poster"
                            src={TMDB_PICTURE + movie.poster_path}
                            alt={movie.title}
                        />
                    </div>
                ))}
            </div>
            <div className="list-info">
                <Link to={`/lists/${username}/${list.id}`} className="films-browser-title">
                    <h1>{list.title}</h1>
                </Link>
            </div>
        </div>
    );
};

export default SingleList;