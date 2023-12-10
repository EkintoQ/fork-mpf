import axios from "axios";
import {API_BASE_URL_PROD} from './apiConfig';


// getAllSearchedMovies
export const getMovieInfoSearch = async (query) => {

    const options = {
        withCredentials: true
    }

    try {
        const response = await axios.get(
            `${API_BASE_URL_PROD}/movies/search/${query}`,
            options
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}