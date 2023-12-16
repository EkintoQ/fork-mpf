import axios from 'axios';
import queryString from "query-string";

const BASE_URL = process.env.REACT_APP_BASE_URL
// Set or delete a movie from watched list
export const postWatchedMovie = async (idMovie) => {

    const params = {
        idMovie: idMovie
    };

    try {
        const response = await axios.post(
            '${BASE_URL}/movies/watched/set',
            queryString.stringify(params),
            { withCredentials: true }
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

// Check if a movie is watched by the user
export const getWatchedMovie = async (idMovie) => {

    const options = {
        withCredentials: true
    }

    try {
        const response = await axios.get(
                `${BASE_URL}/movies/watched/get?idMovie=${idMovie}`,
            options
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

// getAllCountWatchedByIdMovie
export const getWatchedCountMovie = async (idMovie) => {

    const options = {
        withCredentials: true
    }

    try {
        const response = await axios.get(
            `${BASE_URL}/movies/watched/count/watched?id=${idMovie}`,
            options
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

// Get all movies watched by the user
export const getWatchedAllByUser = async () => {

    const options = {
        withCredentials: true
    }

    try {
        const response = await axios.get(
            `${BASE_URL}/movies/watched/allByUser`,
            options
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}