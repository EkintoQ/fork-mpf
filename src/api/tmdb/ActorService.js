import axios from "axios";


const TMDB_URL = process.env.REACT_APP_TMDB_URL
const TMDB_KEY = process.env.REACT_APP_TMDB_KEY

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: TMDB_KEY
    }
};

export const getActorDetails = async (id) => {
    try {
        const response = await axios.get(
            `${TMDB_URL}/3/person/${id}`,
            options
        );
        return response.data
    } catch (err) {
        console.log(err);
    }
};

export const getActorCredits = async (id) => {
    try {
        const response = await axios.get(
            `${TMDB_URL}/3/person/${id}/combined_credits`,
            options
        );
        return response.data
    } catch (err) {
        console.log(err);
    }
};