import React, {useEffect, useState} from 'react';
import './ActivateUserPage.css';
import {useLocation} from 'react-router-dom';
import {getRandomMovieImage} from "../../api/tmdb/MovieAPI";
import {toast, ToastContainer} from "react-toastify";
import {postActivateUser} from "../../api/server/AuthenticationAPI";
import queryString from "query-string";
import {Spinner} from "react-bootstrap";

const LostPasswordPage = () => {
    const location = useLocation();
    const [backgroundImage, setBackgroundImage] = useState('');
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            //activation of user
            const responseActivate = await postActivateUser(queryString.parse(location.search).token);
            toast.success('You were successfully activated', {
                position: toast.POSITION.TOP_CENTER,
            });
            window.location.href = '/login'
            console.log(responseActivate);
        } catch (error) {
            toast.error('Ups... Something went wrong \n Please try again:)', {
                position: toast.POSITION.TOP_CENTER,
            });
            console.error('Error occurred while activating user:', error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getRandomMovieImage().then((response) => {
            setBackgroundImage(response);
        });
    }, []);

    return (
        <div className="image-container" style={{backgroundImage: `url(${backgroundImage})`}}>
            <div className="activate-form-container">
                <h1 className="head">User activation</h1>
                <h2 className="description">Activate your account to start using it</h2>
                <form onSubmit={handleSubmit}>
                    <button className="submit-btn" type="submit" disabled={loading}>
                        {loading ? <Spinner></Spinner>: 'Activate'}
                    </button>
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default LostPasswordPage;
