import axios from "axios";
import queryString from "query-string";

const BASE_URL = process.env.REACT_APP_BASE_URL

export const setNewEmail = async (email) => {

    const params = {
        email: email
    };

    try {
        const response = await axios.post(
            `${BASE_URL}/user/edit/newEmail`,
            queryString.stringify(params),
            { withCredentials: true },
        );
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};
