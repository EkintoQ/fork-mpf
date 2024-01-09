import axios from "axios";
import queryString from "query-string";

const BASE_URL = process.env.REACT_APP_BASE_URL

export const postReview = async (content, idMovie, title) => {

    const params = {
        idMovie: idMovie,
        title: title
    }


    try {
        const response = await axios.post(
            `${BASE_URL}/review/movie/set?${queryString.stringify(params)}`,
            content,
            {
                withCredentials: true,
            }
        )
        return response.data
    } catch (err) {
        console.log(err)
    }
};