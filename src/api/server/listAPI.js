import axios from "axios";
import queryString from "query-string";

const BASE_URL = process.env.REACT_APP_BASE_URL

export const getUserLists = async (username) => {

    try {
        const response = await axios.get(
            `${BASE_URL}/movies/list/user/all?username=${username}`,
            { withCredentials: true },
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const getUserList = async (idMovieList) => {

    try {
        const response = await axios.get(
            `${BASE_URL}/movies/list/get?idMovieList=${idMovieList}`,
            { withCredentials: true },
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}


export const postUserList = async (title, content) => {
    const data = {
        content: content,
    };

    try {
        const response = await axios.post(
            `${BASE_URL}/movies/list/set?title=${title}`,
            {data},
            {withCredentials: true}
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const addMovieToUserList = async (idList, idMovie) => {

    const params = {
        idMovie: idMovie,
        idList: idList
    };

    try {
        const response = await axios.post(
            `${BASE_URL}/movies/list/movie/set`,
            queryString.stringify(params),
            { withCredentials: true },
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const updateUserList = async (content, idMovieList, title) => {

    const data = {
        content: content
    };

    try {
        const response = await axios.post(
            `${BASE_URL}/movies/list/up?idMovieList=${idMovieList}&title=${title}`,
            {data},
            { withCredentials: true },
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

