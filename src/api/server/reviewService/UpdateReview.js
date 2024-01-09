import axios from "axios";
import queryString from "query-string";

const BASE_URL = process.env.REACT_APP_BASE_URL

export const UpdateReview = async (content, idReview, title) => {

    const params = {
        content: content,
        idReview: idReview,
        title: title
    }

    try {
        const response = await axios.post(
            `${BASE_URL}/review/up`,
            queryString.stringify(params),
            {withCredentials: true},
        )
        return response.data
    } catch (err) {
        console.log(err)
    }
};