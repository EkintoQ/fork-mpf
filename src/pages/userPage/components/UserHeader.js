import React, {useEffect, useState} from "react";
import './UserHeader.css';
import {Avatar, List, ListItemText, Tooltip} from "@mui/material";
import {getAllUserReviews} from "../../../api/server/ReviewAPI";

const BASE_URL= process.env.REACT_APP_BASE_URL;

const UserHeader = ({user}) => {

    const [reviews, setReviews] = useState();

    useEffect(() => {
        getAllUserReviews().then(data => setReviews(data))
    }, [])

    return (
        <div className="user-header">
            <div className="user-bio-info">
                <div className="user-row-info">
                    <div className="user-avatar">
                        {user.avatar &&
                            <Avatar
                                src={`${BASE_URL}/images/${user.avatar}`}
                                alt='USER'
                                sx={{ width: 80, height: 70 }}
                            />
                        }
                        {!user.avatar &&
                            <Avatar
                                src={`/images/user.png`}
                                alt='USER'
                                sx={{ width: 80, height: 70 }}
                            />
                        }
                    </div>
                    <div className="user-micro-info">
                        <h1 className="username-text">{user.username}</h1>
                        <Tooltip title="Date user was created" arrow>
                            <span className="yellow-text">
                                {new Date(user.created).toLocaleDateString()}
                            </span>
                        </Tooltip>
                    </div>
                </div>
                <p className="user-bio-text">BIO</p>
                <hr style={{ margin: '0', height: '1px', width: '100%'}}/>
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
            <div className="user-micro-stats">
                <List sx={{
                    width: '100%',
                    maxWidth: 360,
                    }}
                >
                    <ListItemText primary="Liked movies" secondary={user.likeMovie ? user.likeMovie.length : 0}/>
                    <hr />
                    <ListItemText primary="Watched movies" secondary={user.watchedMovie ? user.watchedMovie.length : 0}/>
                    <hr />
                    <ListItemText primary="To watch movies" secondary={user.toWatchMovie ? user.toWatchMovie.length : 0} />
                    <hr />
                    <ListItemText primary="Total rating" secondary={user.ratingMovie ? user.ratingMovie.length : 0} />
                    <hr />
                    <ListItemText primary="Total reviews" secondary={reviews ? reviews : 0} />
                </List>
            </div>
        </div>
    );
}

export default UserHeader;