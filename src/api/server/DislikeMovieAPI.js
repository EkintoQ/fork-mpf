import axios from "axios";
import queryString from "query-string";
import {API_BASE_URL_PROD} from './apiConfig';



// Set or delete a movie from the disliked list
export const postDislikedMovie = async (idMovie) => {

    const params = {
        idMovie: idMovie
    };

    try {
        const response = await axios.post(
            `${API_BASE_URL_PROD}/movies/dislike/set`,
            queryString.stringify(params),
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
            `${API_BASE_URL_PROD}/movies/dislike/get?idMovie=${idMovie}`,
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
            `${API_BASE_URL_PROD}/movies/dislike/count/dislike?id=${idMovie}`,
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
            `${API_BASE_URL_PROD}/movies/dislike/all`,
            options
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}