import axios from "axios";
import queryString from "query-string";
import {API_BASE_URL_PROD} from './apiConfig';


// Get all ratings for a user
export const getAllRatingByUser = async () => {

    const options = {
        withCredentials: true
    }

    try {
        const response = await axios.get(
            `${API_BASE_URL_PROD}/movies/rating/allByUser`,
            options
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

// getCountMovieRating
export const getCountMovieRating = async (idMovie) => {

    const options = {
        withCredentials: true
    }

    try {
        const response = await axios.get(
            `${API_BASE_URL_PROD}/movies/rating/count/rating?id=${idMovie}`,
            options
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

// Remove the rating for a movie
export const removeRating = async (idMovie) => {

    const params = {
        MovieId: idMovie
    };

    try {
        const response = await axios.post(
            `${API_BASE_URL_PROD}/movies/rating/del`,
            queryString.stringify(params),
            { withCredentials: true },
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

// Get the rating for a movie
export const getMovieRating = async (idMovie) => {

    const options = {
        withCredentials: true
    }

    try {
        const response = await axios.get(
            `${API_BASE_URL_PROD}/movies/rating/rating?id=${idMovie}`,
            options
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

// Set the rating for a movie
export const postMovieRating = async (idMovie, rating) => {

    const params = {
        MovieId: idMovie,
        rating: rating
    };

    try {
        const response = await axios.post(
            `${API_BASE_URL_PROD}/movies/rating/set`,
            queryString.stringify(params),
            { withCredentials: true },
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
};