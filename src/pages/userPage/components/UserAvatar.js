import React, {useContext, useEffect, useState} from 'react';
import {Avatar} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import "./UserAvatar.css";
import {UserContext} from "../../../App";
import {useParams} from "react-router-dom";
import SetAvatar from "../../../api/server/userEditService/SetAvatar";
import {getUser} from "../../../api/server/UserAPI";
import Swal from 'sweetalert2'

const BASE_URL= process.env.REACT_APP_BASE_URL;

const UserAvatar = () => {
    const user = useContext(UserContext);

    const {username} = useParams();

    const [avatarPath, setAvatarPath] = useState(null);
    const [avatarUpdated, setAvatarUpdated] = useState(false);

    const handleUpdateAvatar = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

            const response = await SetAvatar(formData);

            if (response.status === 200) {
                setAvatarUpdated(true);
                await Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Your avatar has been updated",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            else if (response.status === 400) {
                await Swal.fire({
                    position: "top",
                    icon: "error",
                    title: "Image size is exceeded (1MB)",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            else{
                await Swal.fire({
                    position: "top",
                    icon: "error",
                    title: "Something went wrong. Please try again",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
    };

    useEffect(() => {
        getUser(username).then(data => setAvatarPath(data.avatar));
        setAvatarUpdated(false);
    }, [username, avatarUpdated]);

    return (
        <div className="user-avatar">
            {avatarPath ?
                <Avatar
                    src={`${BASE_URL}/images/${avatarPath}`}
                    alt='USER_AVATAR'
                    sx={{width: 100, height: 100}}
                />
                :
                <Avatar
                    src={`/images/user.png`}
                    alt='USER_ALT'
                    sx={{width: 100, height: 100}}
                />
            }
            {user && user.username === username
                &&
                <div className="update-avatar">
                    <label htmlFor="avatarInput">
                        <AddAPhotoIcon/>
                    </label>
                    <input
                        type="file"
                        id="avatarInput"
                        style={{display: 'none'}}
                        onChange={handleUpdateAvatar}
                    />
                </div>
            }
        </div>
    );
};

export default UserAvatar;