import axios from "axios";
import queryString from "query-string";

const BASE_URL = process.env.REACT_APP_BASE_URL

export const postReviewLike = async (idReview, like) => {

    const params = {
        idReview: idReview,
        like: like
    }

    try {
        const response = await axios.post(
            `${BASE_URL}/review/like`,
            queryString.stringify(params),
            {withCredentials: true},
        )
        return response.data
    } catch (err) {
        console.log(err)
    }
};