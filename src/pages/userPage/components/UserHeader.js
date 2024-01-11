import React, {useEffect, useState} from "react";
import './UserHeader.css';
import {Tooltip} from "@mui/material";
import UserAvatar from "./UserAvatar";
import {useParams} from "react-router-dom";
import {getUser} from "../../../api/server/userService/GetUser";

const UserHeader = () => {
    const {username} = useParams();
    const [user, setUser] = useState([]);

    useEffect(() => {
        getUser(username).then(data => setUser(data))
    }, [username])

    return (
        <div className="user-header">
            <div className="user-bio-info">
                <div className="user-row-info">
                    <UserAvatar/>
                    <div className="user-micro-info">
                        <h1 className="username-text">{user.username}</h1>
                        <Tooltip title="Date user was created" arrow>
                            <span className="yellow-text">
                                {new Date(user.created).toLocaleDateString()}
                            </span>
                        </Tooltip>
                    </div>
                </div>
                {user.bio &&
                    <p className="user-bio-text">
                        {user.bio}
                    </p>
                }
                {!user.bio &&
                    <p className="user-bio-text">
                        User added no information about himself.
                    </p>
                }
            </div>
            <ul className="user-micro-stats">
                <li>
                    <div>{user.likeMovie ? user.likeMovie.length : 0}</div>
                    <div className="user-micro-stats-name">LIKED</div>
                </li>
                <li>
                    <div>{user.watchedMovie ? user.watchedMovie.length : 0}</div>
                    <div className="user-micro-stats-name">WATCHED</div>
                </li>
                <li>
                    <div>{user.toWatchMovie ? user.toWatchMovie.length : 0}</div>
                    <div className="user-micro-stats-name">TO WATCH</div>
                </li>
                <li>
                    <div>{user.ratingMovie ? user.ratingMovie.length : 0}</div>
                    <div className="user-micro-stats-name">RATED</div>
                </li>
                <li>
                    <div>{user.reviews ? user.reviews.length : 0}</div>
                    <div className="user-micro-stats-name">REVIEWED</div>
                </li>
                <li>
                    <div>{user.lists ? user.lists.length : 0}</div>
                    <div className="user-micro-stats-name">LISTS</div>
                </li>
            </ul>
        </div>
    );
}

export default UserHeader;