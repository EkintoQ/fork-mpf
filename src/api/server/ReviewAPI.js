import axios from "axios";
import queryString from "query-string";

const BASE_URL = process.env.REACT_APP_BASE_URL
// delMovieReview
export const delReview = async(idReview) => {

    const params = {
        idReview: idReview
    }

    try {
        const response = await axios.post(
            `${BASE_URL}/review/del`,
            queryString.stringify(params),
            {withCredentials: true},
        )
        return response.data
    } catch (err) {
        console.log(err)
    }
};

// setMovieReview
export const postReview = async (content, idMovie, title) => {

    const params = {
        idMovie: idMovie,
        title: title
    }

    const data = {
        content: content
    }

    try {
        const response = await axios.post(
            `${BASE_URL}/review/movie/set?${queryString.stringify(params)}`,
            data,
            {
                withCredentials: true,
            }
        )
        return response.data
    } catch (err) {
        console.log(err)
    }
};

// setLike
export const postReviewLike = async (idReview, like) => {

    const params = {
        idReview: idReview,
        like: like
    }

    try {
        const response = await axios.post(
            `${BASE_URL}/review/like`,
            queryString.stringify(params),
            {withCredentials: true},
        )
        return response.data
    } catch (err) {
        console.log(err)
    }
};

// getLikeReviewByIdMovie
export const getReviewLike = async (idReview) => {

    const options = {
        withCredentials: true
    }

    try {
        const response = await axios.get(
            `${BASE_URL}/review/like?idReview=${idReview}`,
            options
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

// setUpdateMovieReview
export const postReviewUpdate = async (content, idReview, title) => {

    const params = {
        content: content,
        idReview: idReview,
        title: title
    }

    try {
        const response = await axios.post(
            `${BASE_URL}/review/up`,
            queryString.stringify(params),
            {withCredentials: true},
        )
        return response.data
    } catch (err) {
        console.log(err)
    }
};

// getByIdReview
export const getReviewById = async (idReview) => {

    const options = {
        withCredentials: true
    }

    try {
        const response = await axios.get(
            `${BASE_URL}/review/get?idReview=${idReview}`,
            options
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }   
}

// getAllReviewByIdMovie
export const getAllReview = async (idMovie) => {

    const options = {
        withCredentials: true
    }

    try {
        const response = await axios.get(
            `${BASE_URL}/review/movie/all?idMovie=${idMovie}`,
            options
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const getAllUserReviews = async () => {

    const options = {
        withCredentials: true
    }

    try {
        const response = await axios.get(
            `${BASE_URL}/review/count/user`,
            options
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}