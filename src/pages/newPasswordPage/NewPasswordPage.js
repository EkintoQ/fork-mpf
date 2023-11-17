import React, {useEffect, useState} from 'react';
import './NewPasswordPage.css';
import {useLocation} from 'react-router-dom';
import {postResetPassword} from "../../api/server/LostPassAPI";
import {getRandomMovieImage} from "../../api/tmdb/MovieAPI";
import queryString from "query-string";
import {toast, ToastContainer} from "react-toastify";
import {Spinner} from "react-bootstrap";

const LostPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const location = useLocation();
    const [backgroundImage, setBackgroundImage] = useState('');
    const [loading, setLoading] = useState(false);


    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);


        try {
            if (password !== confirmPassword) {
                toast.error('Ups... Seems like your passwords don\'t match. \n Please try again:)', {
                    position: toast.POSITION.TOP_CENTER,
                });
                console.error('Passwords doesnt match')
            } else {
                const response = await postResetPassword(queryString.parse(location.search).token, password, confirmPassword);
                console.log('Password reset successful!', response.data);
                window.location.href = '/login'
            }
        } catch (error) {
            toast.error('Ups... Something went wrong \n Please try again:)', {
                position: toast.POSITION.TOP_CENTER,
            });
            console.error('Error occurred while resetting password:', error);
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
            <div className="newpass-container">
                <h1 className="head">Reset password</h1>
                <h2 className="description">Create a new password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="password">New password</label>
                        <input
                            className="newpass-password-input"
                            type="password"
                            id="password"
                            value={password}
                            placeholder="Enter your password"
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <input
                            className="newpass-password-input"
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            placeholder="Confirm your password"
                            onChange={handleConfirmPasswordChange}
                        />
                    </div>
                    <button className="submit-btn" type="submit" disabled={loading}>
                        {loading ? <Spinner></Spinner>: 'Join Us'}
                    </button>
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default LostPasswordPage;
