import axios from "axios";
import queryString from "query-string";

const BASE_URL = process.env.REACT_APP_BASE_URL
// getUserDto
export const getUserDto = async () => {

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
// Delete a user
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

// Set a new bio
export const postNewBio = async (bio) => {

    const params = {
        bio: bio
    };

    try {
        const response = await axios.post(
            `${BASE_URL}/user/edit/newBio`,
            queryString.stringify(params),
            { withCredentials: true },
        );
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

// Set a new email
export const postNewEmail = async (email) => {

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

// Set a new password(password is validated)
export const postNewPassword = async (password0, password1, passwordOld) => {

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

// Set a new username
export const postNewUsername = async (username) => {

    const params = {
        username: username
    };

    try {
        const response = await axios.post(
            `${BASE_URL}wwww/user/edit/newUsername`,
            queryString.stringify(params),
            { withCredentials: true },
        );
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};