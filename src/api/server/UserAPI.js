import axios from "axios";
import {API_BASE_URL_PROD} from './apiConfig';


const BASE_URL = process.env.REACT_APP_BASE_URL
// getUserByUsername
export const getUser = async (username) => {

    const options = {
        withCredentials: true
    }

    try {
        const response = await axios.get(
            `${BASE_URL}/user/${username}`,
            options
        );
        return response.data;
    } catch (err) {
        console.log(err);
        return false
    }
}

// getUsernameByAuth
export const getUserDtoByAuth = async () => {

    const options = {
        withCredentials: true
    }

    try {
        const response = await axios.get(
            `${BASE_URL}/user/edit/getUserDto`,
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
            `${BASE_URL}/user/getAut`,
            options
        );
        return true;
    } catch (err) {
        return false;
    }
}