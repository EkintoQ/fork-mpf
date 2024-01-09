import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL

export const getWatchedAllMovie = async () => {

    try {
        const response = await axios.get(
            `${BASE_URL}/movies/watched/allByUser`,
            { withCredentials: true }
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}