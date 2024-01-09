import axios from "axios";
import queryString from "query-string";

const BASE_URL = process.env.REACT_APP_BASE_URL

export const postResetPassword = async (token, password0, password1) => {

    const params = {
        token: token,
        password0: password0,
        password1: password1
    };

    try {
        const response = await axios.post(
            `${BASE_URL}/lostpassword/reset`,
            queryString.stringify(params),
            {withCredentials: true},
        );
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error occurred while resetting password:', error.response.data);
        } else if (error.message) {
            console.error('Error occurred while resetting password:', error.message);
        } else {
            console.error('Error occurred while resetting password:', error);
        }
    }
};