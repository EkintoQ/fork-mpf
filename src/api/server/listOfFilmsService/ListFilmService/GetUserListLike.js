import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL

export const getUserListLike = async (idList) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/movies/list/like/get?idList=${idList}`,
            { withCredentials: true },
        );
        return response.data;
    } catch (err) {
        return false
    }
}