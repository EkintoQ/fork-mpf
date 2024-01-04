import axios from "axios";
import queryString from "query-string";

const BASE_URL = process.env.REACT_APP_BASE_URL
// Set or delete a movie from the favorite list
export const postFavoriteMovie = async (idMovie) => {

    const params = {
        idMovie: idMovie
    };

    try {
        const response = await axios.post(
            `${BASE_URL}/movies/favorite/set`,
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
            `${BASE_URL}/movies/favorite/get?idMovie=${idMovie}`,
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
            `${BASE_URL}/movies/favorite/count/favorite?id=${idMovie}`,
            options
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}
