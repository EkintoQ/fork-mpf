import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const postUserList = async (title, content) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/movies/list/set?title=${title}`,
            content,
            {
                headers: {
                    'Content-Type': 'text/plain',
                },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};