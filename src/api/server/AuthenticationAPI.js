import axios from "axios";
import queryString from "query-string";
import {API_BASE_URL_PROD} from './apiConfig';

const BASE_URL = process.env.REACT_APP_BASE_URL


// login
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

// registration
export const postRegistration = async (userData) => {
    return await axios.post(
            `${BASE_URL}/registration`, queryString.stringify(userData))
};

// post_activate
export const postActivateUser = async (userData) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/activate`, queryString.stringify(userData));
        return response.data;
    } catch (error) {
        console.log(error);
    }

};

// log_out
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