import axios from "axios";
import queryString from "query-string";

const BASE_URL = process.env.REACT_APP_BASE_URL

export const setNewPassword = async (password0, password1, passwordOld) => {

    const params = {
        password0: password0,
        password1: password1,
        passwordold: passwordOld
    };

    try {
        const response = await axios.post(
            `${BASE_URL}/user/edit/newPas`,
            queryString.stringify(params),
            { withCredentials: true },
        );
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};