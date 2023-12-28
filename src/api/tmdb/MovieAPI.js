import axios from "axios";


const TMDB_URL = process.env.REACT_APP_TMDB_URL
const TMDB_BEARER = process.env.REACT_APP_TMDB_KEY
const TMDB_PICTURE = process.env.REACT_APP_TMDB_PICTURE

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: TMDB_BEARER,
    },
};

export const getMovieSearch = async (query) => {
    try {
        const response = await axios.get(
            `${TMDB_URL}/3/search/movie?query=${query}`,
            options
        );
        return response.data
    } catch (err) {
        console.log(err);
    }
};

export const getMovieDetails = async (id) => {
    try {
        const response = await axios.get(
            `${TMDB_URL}/3/movie/${id}`,
            options
        );
        console.log(response)
        return response.data
    } catch (err) {
        console.log(err);
    }
};

export const getMovieBackDropImage = async (id) => {
    try {
        const response = await axios.get(
            `${TMDB_URL}/3/movie/${id}/images`,
            options
        );
        return TMDB_PICTURE + response.data.backdrops[0].file_path
    } catch (err) {
        console.log(err);
    }
};

export const getRandomMovie = async () => {
    try {
        const response = await axios.get(
            `${TMDB_URL}/3/movie/popular`,
            options
        );
        const randomIndex = Math.floor(
            Math.random() * response.data.results.length
        );
        return response.data.results[randomIndex];
    } catch (err) {
        console.log(err);
    }
};

export const getRandomMovieImage = async () => {
    try {
        const response = await axios.get(
            `${TMDB_URL}/3/movie/popular`,
            options
        );

        const randomIndex = Math.floor(
            Math.random() * response.data.results.length
        );

        return `https://image.tmdb.org/t/p/original` +
            response.data.results[randomIndex].backdrop_path;
    } catch (err) {
        console.log(err);
    }
};

export const getMovieTrailer = async (id) => {
    try {
        const response = await axios.get(
            `${TMDB_URL}/3/movie/${id}/videos`,
            options
        );

        const trailerUrl = `https://www.youtube.com/watch?v=`;

        if (response.data.results.length > 0) {
            const trailer = response.data.results.find(
                (video) => video.type === 'Trailer'
            );
            return trailerUrl + trailer.key
        }
        else return false
    } catch (err) {
        console.log(err);
    }
};

export const getUpComingMovies = async () => {
    try {
        const response = await axios.get(
            `${TMDB_URL}/3/movie/upcoming?language=en-US&page=1`,
            options
        );
        return response.data.results
    } catch (err) {
        console.log(err);
    }
}

export const getMovieCredits = async (id) => {
    try {
        const response = await axios.get(
            `${TMDB_URL}/3/movie/${id}/credits`,
            options
        );
        return response.data
    } catch (err) {
        console.log(err);
    }
}