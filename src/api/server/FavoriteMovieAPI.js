import axios from "axios";
import queryString from "query-string";
import {API_BASE_URL_PROD} from './apiConfig';


// Set or delete a movie from the favorite list
export const postFavoriteMovie = async (idMovie) => {

    const params = {
        idMovie: idMovie
    };

    try {
        const response = await axios.post(
            `${API_BASE_URL_PROD}/movies/favorite/set`,
            queryString.stringify(params),
            { withCredentials: true },
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

// Check if a user has favorite a movie
export const getFavoriteMovie = async (idMovie) => {

    const options = {
        withCredentials: true
    }

    try {
        const response = await axios.get(
            `${API_BASE_URL_PROD}/movies/favorite/get?idMovie=${idMovie}`,
            options
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

// getAllCountFavoriteByIdMovie
export const getFavoriteCountMovie = async (idMovie) => {

    const options = {
        withCredentials: true
    }

    try {
        const response = await axios.get(
            `${API_BASE_URL_PROD}/movies/favorite/count/favorite?id=${idMovie}`,
            options
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

// Get all movies user's favorite list
export const getAllFavoriteMovie = async () => {

    const options = {
        withCredentials: true
    }

    try {
        const response = await axios.get(
            `${API_BASE_URL_PROD}/movies/favorite/all`,
            options
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}