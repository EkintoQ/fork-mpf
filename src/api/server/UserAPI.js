import axios from "axios";

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
export const getUsernameByAuth = async () => {

    const options = {
        withCredentials: true
    }

    try {
        const response = await axios.get(
            `${BASE_URL}/user/getUsernameAut`,
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