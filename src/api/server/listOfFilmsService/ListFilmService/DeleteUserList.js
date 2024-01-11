import axios from 'axios';
import queryString from "query-string";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const deleteUserList = async (idMovieList) => {

    const data = {
        idMovieList: idMovieList,
    }

    try {
        const response = await axios.post(
            `${BASE_URL}/movies/list/del`,
            queryString.stringify(data),
            {withCredentials: true}
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};