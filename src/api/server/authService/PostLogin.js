import axios from "axios";
import queryString from "query-string";

const BASE_URL = process.env.REACT_APP_BASE_URL

export const postLogin = async (userData) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/login`,
            queryString.stringify(userData),
            {withCredentials: true}
        );
        const authToken = response.headers['set-cookie'];

        if (Array.isArray(authToken)) {
            const cookieValue = authToken.join(';');
            document.cookie = `authToken=${cookieValue}`;
        } else if (typeof authToken === 'string') {
            document.cookie = `authToken=${authToken}`;
        }
        return true
    } catch (err) {
        console.log(err);
        return false
    }
};