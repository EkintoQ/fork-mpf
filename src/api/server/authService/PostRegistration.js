import axios from "axios";
import queryString from "query-string";

const BASE_URL = process.env.REACT_APP_BASE_URL

// registration
export const postRegistration = async (userData) => {
    return await axios.post(
        `${BASE_URL}/registration`,
        queryString.stringify(userData)
    )
};