import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL

export const getUser = async (username) => {

    try {
        const response = await axios.get(
            `${BASE_URL}/user/${username}`,
            { withCredentials: true }
        );
        return response.data;
    } catch (err) {
        return err.response;
    }
}