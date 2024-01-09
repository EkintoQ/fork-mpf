import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL

export const getUserList = async (idMovieList) => {

    try {
        const response = await axios.get(
            `${BASE_URL}/movies/list/get?idMovieList=${idMovieList}`,
            {withCredentials: true},
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}