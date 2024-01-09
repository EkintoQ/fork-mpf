import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL

export const getWatchedMovie = async (idMovie) => {

    try {
        const response = await axios.get(
            `${BASE_URL}/movies/watched/get?idMovie=${idMovie}`,
            { withCredentials: true }
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}