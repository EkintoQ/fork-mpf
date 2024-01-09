import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL

export const getToWatchAllMovie = async () => {

    try {
        const response = await axios.get(
            `${BASE_URL}/movies/towatch/all`,
            { withCredentials: true }
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}