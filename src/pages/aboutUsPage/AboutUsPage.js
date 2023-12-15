import React, {useEffect, useState} from 'react';
import {getRandomMovie} from "../../api/tmdb/MovieAPI";
import '../settingsPage/SettingsPage.css';
import './AboutUsPage.css';


const AboutUsPage = () => {
    return (
        <div className="about-container">
            <h1 className="about-head">About Us</h1>
            <div className="about-text">
                <p>
                    Our main idea is to create a place where people can express their love
                    for movies and share that love with other users. Our service will
                    allow people to keep track of their movie-watching history, create
                    their own lists of favorite movies according to their preferences, and
                    share them with others to discover people's different tastes in
                    movies.
                </p>
                <p>
                    It's important to say that users won't be able to watch movies on our
                    platform, which we think helps keep our platform as social as
                    possible, reducing distractions from other features that aren't
                    connected to it.
                </p>
                <p>
                    People will be able to rate a video and leave a short review about it.
                    The target audience for our website will be people who want to connect
                    with a community around their favorite movies from different genres
                    and have a tool that will help organize their own movie collection in
                    an easy way.
                </p>
            </div>
        </div>
    );
};

export default AboutUsPage;