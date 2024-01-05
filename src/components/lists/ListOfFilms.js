import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import "./ListOfFilms.css";
import {getUserLists} from "../../api/server/listAPI";

const ListOfFilms = ({user, value}) => {
    const {username} = useParams()

    const [lists, setLists] = useState([])

    let check = false
    if (user.username === username) {
        check = true
        }

    useEffect(() => {
        getUserLists(username).then(data => setLists(data))
    }, [value])

    return (
        <div className="lists-of-films">
            <Link to={`/list/new`}
                className="list-button-create"
            >
                Create a new list
            </Link>
            {lists && lists.map(list => (
                <div className="list-card">
                    <div className="list-info">
                        <Link to={`/lists/${username}/${list.id}`} className="films-browser-title">
                            <h1>{list.title}</h1>
                        </Link>
                        <h2>{list.content}</h2>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ListOfFilms;
