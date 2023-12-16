import axios from "axios";
import queryString from "query-string";
import {API_BASE_URL_PROD} from './apiConfig';


const BASE_URL = process.env.REACT_APP_BASE_URL

export const postDislikedMovie = async (idMovie) => {

    const params = {
        idMovie: idMovie
    };

    try {
        const response = await axios.post(
            `${BASE_URL}/movies/dislike/set`,
            { withCredentials: true },
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

// Check if a user has disliked a movie
export const getDislikedMovie = async (idMovie) => {

    const options = {
        withCredentials: true
    }

    try {
        const response = await axios.get(
            `${BASE_URL}/movies/dislike/get?idMovie=${idMovie}`,
            options
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

// getAllCountDislikedByIdMovie
export const getDislikedCountMovie = async (idMovie) => {

    const options = {
        withCredentials: true
    }

    try {
        const response = await axios.get(
            `${BASE_URL}/movies/dislike/count/dislike?id=${idMovie}`,
            options
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

// Get all movies disliked by a user
export const getAllDislikedMovie = async () => {

    const options = {
        withCredentials: true
    }

    try {
        const response = await axios.get(
            `${BASE_URL}/movies/dislike/all`,
            options
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}