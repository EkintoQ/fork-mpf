import axios from "axios";
import queryString from "query-string";

const BASE_URL = process.env.REACT_APP_BASE_URL

export const postReview = async (content, idMovie, title) => {

    const params = {
        idMovie: idMovie,
        title: title
    }

    const data = {
        content: content
    }

    try {
        const response = await axios.post(
            `${BASE_URL}/review/movie/set?${queryString.stringify(params)}`,
            data,
            {
                withCredentials: true,
            }
        )
        return response.data
    } catch (err) {
        console.log(err)
    }
};