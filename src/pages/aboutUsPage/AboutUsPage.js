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
                    People will be able to rate a movie and leave a short review about it.
                    The target audience for our website will be people who want to connect
                    with a community around their favorite movies from different genres
                    and have a tool that will help organize their own movie collection in
                    an easy way.
                </p>
            </div>
            <div className="qrcode-container">
                We are also available on Google Play!
                <img src="/images/qrcode.jpg" alt="qrcode"/>
            </div>
            <h2 className="about-head">First steps:</h2>
            <h4 className="about-head1">Registration</h4>
            <div className="about-text1">
                <p>Create your account and join the family of MoviePocket. Don't forget to Confirm your email!:)</p>
            </div>
            <img src="/images/RegisterPage.png" alt="Registration" className="section-image"/>

            <h4 className="about-head1">Search for good...</h4>
            <div className="about-text1">
                <p>Discover the huge library of movies using search bar.</p>
            </div>
            <img src="/images/SearchPart.png" alt="Search" className="section-image"/>

            <h4 className="about-head1">Assessment</h4>
            <div className="about-text1">
                <p>Add your movies to favorites, or include them to your watchlist to don't forget about them.</p>
            </div>
            <img src="/images/Assessment.png" alt="Assessment" className="section-image"/>

            <div className="about-text1">
                <p>And always keep track on the its amount.</p>
            </div>
            <img src="/images/Statistics.png" alt="Statistics" className="section-image"/>

            <h4 className="about-head1">Reviews</h4>
            <div className="about-text1">
                <p>You can share your opinion with others by leaving the public reviews for the movies.</p>
            </div>
            <img src="/images/Reviews.png" alt="Reviews" className="section-image"/>
            <h1 className="about-head"> </h1>
        </div>
    );
};

export default AboutUsPage;