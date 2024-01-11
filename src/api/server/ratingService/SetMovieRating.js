import axios from "axios";
import queryString from "query-string";

const BASE_URL = process.env.REACT_APP_BASE_URL

export const setMovieRating = async (idMovie, rating) => {

    const params = {
        idMovie: idMovie,
        rating: rating
    };

    console.log(idMovie, rating);

    try {
        const response = await axios.post(
            `${BASE_URL}/movies/rating/set`,
            queryString.stringify(params),
            { withCredentials: true },
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
};