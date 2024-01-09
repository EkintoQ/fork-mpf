import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL

export const postUserList = async (title, content) => {
    const data = {
        content: content,
    };

    try {
        const response = await axios.post(
            `${BASE_URL}/movies/list/set?title=${title}`,
            {data},
            {withCredentials: true}
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
};