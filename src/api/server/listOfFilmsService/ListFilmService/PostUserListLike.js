import axios from "axios";
import queryString from "query-string";

const BASE_URL = process.env.REACT_APP_BASE_URL

export const postUserListLike = async (idList, like) => {

    const data = {
        idList: idList,
        like: like
    }

    try {
        const response = await axios.post(
            `${BASE_URL}/movies/list/like/set`,
            queryString.stringify(data),
            {withCredentials: true}
        );
        return response.data;
    } catch (err) {
        console.log(err);
        return err.response
    }
};