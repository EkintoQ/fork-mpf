import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL

export const updateUserList = async (content, idMovieList, title) => {

    const data = {
        content: content
    };

    try {
        const response = await axios.post(
            `${BASE_URL}/movies/list/up?idMovieList=${idMovieList}&title=${title}`,
            {data},
            { withCredentials: true },
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
};
