import axios from "axios";
import {API_BASE_URL_PROD} from './apiConfig';



// getUserByUsername
export const getUser = async (username) => {

    const options = {
        withCredentials: true
    }

    try {
        const response = await axios.get(
            `${API_BASE_URL_PROD}/user/${username}`,
            options
        );
        return response.data;
    } catch (err) {
        console.log(err);
        return false
    }
}

// getUsernameByAuth
export const getUsernameByAuth = async () => {

    const options = {
        withCredentials: true
    }

    try {
        const response = await axios.get(
            `${API_BASE_URL_PROD}/user/getUsernameAut`,
            options
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

// checkAuthentication
export const checkAuth = async () => {

    const options = {
        withCredentials: true
    }

    try {
        const response = await axios.get(
            `${API_BASE_URL_PROD}/user/getAut`,
            options
        );
        return true;
    } catch (err) {
        return false;
    }
}