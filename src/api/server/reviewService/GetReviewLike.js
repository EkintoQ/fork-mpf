import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL

export const getReviewLike = async (idReview) => {

    try {
        const response = await axios.get(
            `${BASE_URL}/review/like?idReview=${idReview}`,
            { withCredentials: true }
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
};