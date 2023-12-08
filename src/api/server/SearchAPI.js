import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL
// getAllSearchedMovies
export const getMovieInfoSearch = async (query) => {

    const options = {
        withCredentials: true
    }

    try {
        const response = await axios.get(
            `${BASE_URL}/movies/search/${query}`,
            options
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}