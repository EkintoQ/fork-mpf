import React, {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import "./ListOfFilms.css";
import {getUserLists} from "../../api/server/listOfFilmsService/ListFilmService/GetUserLists";
import {UserContext} from "../../App";
import {getUserList} from "../../api/server/listOfFilmsService/ListFilmService/GetUserList";
import SingleList from "./SingleList";

const ListOfFilms = () => {
    const user = useContext(UserContext);
    const {username} = useParams()

    const [lists, setLists] = useState([])

    let check = false
    if (user && user.username === username) {
        check = true
    }

    const fetchLists = async () => {
        const listsData = await getUserLists(username);
        const listDetailsPromises = listsData.map(list => getUserList(list.id));
        const listDetails = await Promise.all(listDetailsPromises);
        return listsData.map((list, index) => {
            return {
                ...list,
                movies: listDetails[index].movies,
            };
        });
    };

    useEffect(() => {
        fetchLists().then(data => setLists(data));
    }, [username]);
    return (
        <div className="lists-of-films">
            {check &&
                <Link to={`/list/new`}
                    className="list-button-create"
                >
                    Create a new list
                </Link>
            }
            <div className="list-of-lists">
                {lists && lists.map(list => (
                    <SingleList username={username} list={list}/>
                ))}
            </div>
        </div>
    )
}

export default ListOfFilms;
