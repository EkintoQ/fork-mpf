import axios from "axios";
import queryString from "query-string";

const BASE_URL = process.env.REACT_APP_BASE_URL

export const postLogout = async () => {

    const params = {
        withCredentials: true
    }

    try {
        const response = await axios.post(
            `${BASE_URL}/logout`,
            queryString.stringify(params),
            {withCredentials: true}
        );
        return response.data;
    } catch (error) {
        console.error('Error occurred during logout:', error);
    }
};