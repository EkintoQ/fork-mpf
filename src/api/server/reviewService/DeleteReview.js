import axios from "axios";
import queryString from "query-string";

const BASE_URL = process.env.REACT_APP_BASE_URL

export const deleteReview = async(idReview) => {

    const params = {
        idReview: idReview
    }

    try {
        const response = await axios.post(
            `${BASE_URL}/review/del`,
            queryString.stringify(params),
            {withCredentials: true},
        )
        return response.data
    } catch (err) {
        console.log(err)
    }
};