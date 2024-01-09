import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL

export const checkAuth = async () => {

    try {
        const response = await axios.get(
            `${BASE_URL}/user/getAut`,
            { withCredentials: true }
        );
        return true;
    } catch (err) {
        return false;
    }
}