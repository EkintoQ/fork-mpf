import axios from "axios";
import queryString from "query-string";

const BASE_URL = process.env.REACT_APP_BASE_URL

export const getMovieStats = async (idMovie) => {

    try {
        const response = await axios.get(
            `${BASE_URL}/movies/${idMovie}`,
            {withCredentials: true}
        )
        return response.data
    } catch (err) {
        console.log(err)
    }
};