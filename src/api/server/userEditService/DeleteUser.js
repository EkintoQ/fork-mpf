import axios from "axios";
import queryString from "query-string";

const BASE_URL = process.env.REACT_APP_BASE_URL

export const deleteUser = async (password) => {

    const params = {
        password: password
    };

    try {
        const response = await axios.post(
            `${BASE_URL}/user/edit/delete`,
            queryString.stringify(params),
            { withCredentials: true },
        );
        return true;
    } catch (err) {
        console.log(err);
    }
};