import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL

export const updateUserList = async (content, idMovieList, title) => {

    try {
        const response = await axios.post(
            `${BASE_URL}/movies/list/up?idMovieList=${idMovieList}&title=${title}`,
            content,
            { withCredentials: true },
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
};
