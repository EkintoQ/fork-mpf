import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL

export const setAvatar = async (avatarFile) => {
    try {
        return await axios.post(
            `${BASE_URL}/user/edit/newAvatar`,
            avatarFile,
            {withCredentials: true}
        );
    } catch (error) {
        return error.response;
    }
};

export default setAvatar;