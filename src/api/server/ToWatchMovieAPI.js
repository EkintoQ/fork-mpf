import axios from "axios";
import queryString from "query-string";
import {API_BASE_URL_PROD} from './apiConfig';


// allUserToWatchMovies
export const getAllToWatch = async () => {

    const options = {
        withCredentials: true
    }

    try {
        const response = await axios.get(
            `${API_BASE_URL_PROD}/movies/towatch/all`,
            options
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

// getAllCountToWatchByIdMovie
export const getAllCountToWatch = async (idMovie) => {

    const options = {
        withCredentials: true
    }

    try {
        const response = await axios.get(
            `${API_BASE_URL_PROD}/movies/towatch/all?id=${idMovie}`,
            options
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

// Check if a user have in to watch
export const getToWatch = async (idMovie) => {

    const options = {
        withCredentials: true
    }

    try {
        const response = await axios.get(
            `${API_BASE_URL_PROD}/movies/towatch/get?id=${idMovie}`,
            options
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

// setOrDeleteMovieToWatch
export const postToWatchMovie = async (idMovie) => {

    const params = {
        id: idMovie
    };

    try {
        const response = await axios.post(
            `${API_BASE_URL_PROD}/movies/towatch/set`,
            queryString.stringify(params),
            { withCredentials: true },
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
};