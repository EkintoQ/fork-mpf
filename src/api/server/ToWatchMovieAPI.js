import axios from "axios";
import queryString from "query-string";

const BASE_URL = process.env.REACT_APP_BASE_URL
// allUserToWatchMovies
export const getAllToWatch = async () => {

    const options = {
        withCredentials: true
    }

    try {
        const response = await axios.get(
            `${BASE_URL}/movies/towatch/all`,
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
            `${BASE_URL}/movies/towatch/all?id=${idMovie}`,
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
            `${BASE_URL}/movies/towatch/get?id=${idMovie}`,
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
            `${BASE_URL}/movies/towatch/set`,
            queryString.stringify(params),
            { withCredentials: true },
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
};