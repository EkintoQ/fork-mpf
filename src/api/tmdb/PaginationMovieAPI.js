import axios from "axios";

const TMDB_URL = process.env.REACT_APP_TMDB_URL
export const getMovies = async (page) => {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGEzNWQ1OGZkMTI0OTdiMTExZTRkZDFjNGE0YzAwNCIsInN1YiI6IjY0NDUyZGMwNjUxZmNmMDYxNzliZmY5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.expCnsMxBP9wfZab438BOkfl0VPQJftRFG7WPkSRyD0'
        }
    };

    try {
        const response = await axios.get(
            `${TMDB_URL}/3/movie/popular?page=${page}`,
            options
        );

        return response.data.results;
    } catch (err) {
        console.log(err);
    }
};