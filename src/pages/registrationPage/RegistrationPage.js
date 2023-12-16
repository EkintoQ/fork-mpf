import React, {useEffect, useState} from 'react';
import './RegistrationPage.css';
import {postRegistration} from '../../api/server/AuthenticationAPI';
import {getRandomMovieImage} from '../../api/tmdb/MovieAPI';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from "react-router-dom";
import {Spinner} from "react-bootstrap";

const RegistrationPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [backgroundImage, setBackgroundImage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (password !== confirmPassword) {
            toast.error('Passwords do not match. Please try again.', {
                position: toast.POSITION.TOP_CENTER,
            });
            return;
        }

        try {
            const params = {
                username: username,
                email: email,
                password: password,
            }
            const response = await postRegistration(params);
            if (response.status === 201) {
                toast.success('Registration successful! \n Please verify your email to activate your account. To do so go by the link that was sent to your email.', {
                    position: toast.POSITION.TOP_CENTER,
                });
                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            }
        } catch (error) {
            if (error.response && error.response.status === 403) {
                toast.error('User is already registered. Please try another email', {
                    position: toast.POSITION.TOP_CENTER,
                });

            } else if (error.response && error.response.status === 401) {
                toast.error('Sorry but this username is already occupied. Please try another one', {
                    position: toast.POSITION.TOP_CENTER,
                });

            } else if (error.response && error.response.status === 400) {
                toast.error(error.response.data, {
                    position: toast.POSITION.TOP_CENTER,
                });
            } else {
                toast.error('Ups. Something went wrong. Please try again.', {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
            console.log(error);
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
            <div className="registration-form-container">
                <h1 className="head">Sign up</h1>
                <h2 className="description">Sign up to manage your account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            className="registration-input"
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            className="registration-input"
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            className="registration-input"
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input
                            className="registration-input"
                            type="password"
                            id="confirm-password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                    </div>
                    <button className="submit-btn" type="submit" disabled={loading}>
                        {loading ? <Spinner></Spinner>: 'Join Us'}
                    </button>
                    <div className="signup-msg">Already have an account?
                        <Link to="/login" className="link"> Sign in</Link>
                    </div>
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default RegistrationPage;
