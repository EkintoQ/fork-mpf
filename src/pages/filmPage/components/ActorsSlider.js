import React, {useState} from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ActorsSlider.css'
import {Link} from "react-router-dom";

const TMDB_PICTURE = process.env.REACT_APP_TMDB_PICTURE

const ActorsSlider = ({actors}) => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <Slider {...settings}>
            {actors.map((actor) => (
                <Link to={`/person/${actor.id}`} className="carousel-card">
                    {actor.profile_path &&
                        <img src={TMDB_PICTURE + actor.profile_path} alt={actor.name} />
                    }
                    {!actor.profile_path &&
                        <img src={'/images/logo.png'} alt={actor.name} />
                    }
                    <h1>{actor.name}</h1>
                </Link>
            ))}
        </Slider>
    );
};

export default ActorsSlider;
