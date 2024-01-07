import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL
// GET TAB API
export const getTabList = async ({username, value}) => {

    const options = {
        withCredentials: true
    }

    let endpoint;

    switch (value) {
        case 'liked':
            endpoint = '/movies/favorite/all';
            break;
        case 'watched':
            endpoint = '/movies/watched/allByUser';
            break;
        case 'toWatch':
            endpoint = '/movies/towatch/all';
            break;
        default:
            endpoint = '/movies/favorite/all';
    }

    try {
        const response = await axios.get(
            `${BASE_URL}${endpoint}`,
            options
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}