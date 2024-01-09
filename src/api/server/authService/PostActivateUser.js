import axios from "axios";
import queryString from "query-string";

const BASE_URL = process.env.REACT_APP_BASE_URL

export const postActivateUser = async (userData) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/activate`,
            queryString.stringify(userData)
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};