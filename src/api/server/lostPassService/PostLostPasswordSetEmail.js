import axios from "axios";
import queryString from "query-string";

const BASE_URL = process.env.REACT_APP_BASE_URL

export const postLostPasswordSetEmail = async (email) => {

    const params = {
        email: email
    };

    try {
        const response = await axios.post(
            `${BASE_URL}/lostpassword/setEmail`,
            queryString.stringify(params),
            {withCredentials: true},
        );
        return response.data;
    } catch (err) {
        console.log(err);
        return false;
    }
};