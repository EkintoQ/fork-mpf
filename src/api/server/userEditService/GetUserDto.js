import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL

export const getUserDto = async () => {

    try {
        const response = await axios.get(
            `${BASE_URL}/user/edit/getUserDto`,
            { withCredentials: true }
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}