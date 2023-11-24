import React, {useEffect, useState} from 'react';
import './LoginPage.css';
import {postLogin} from "../../api/server/AuthenticationAPI";
import {Link} from "react-router-dom";
import {getRandomMovieImage} from "../../api/tmdb/MovieAPI";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [backgroundImage, setBackgroundImage] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await postLogin(email, password);
            if (response) {
                toast.success('You are successfully logged in)', {
                    position: toast.POSITION.TOP_CENTER,
                });
                window.location.href = '/'
            } else {
                console.log(response)
                toast.error('Ups... Seems like you provided wrong password or email. \n Please try again:)', {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        } catch (error) {
            console.log(error);
        }

    };

    useEffect(() => {
        getRandomMovieImage().then((response) => {
            setBackgroundImage(response);
        });
    }, []);


    return (
        <div className="image-container" style={{backgroundImage: `url(${backgroundImage})`}}>
            <div className="login-form-container">
                <h1 className="head">Sign in</h1>
                <h2 className="description">Sign in to continue</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            className="login-input"
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
                            className="login-input"
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="link-recovery-container">
                        <Link to="/forgotPassword" className="link-recovery">Forgot your password?</Link>
                    </div>
                    <button className="submit-btn" type="submit">
                        Sign in
                    </button>
                    <div className="signup-msg">Don't have an account?
                        <Link to="/registration" className="link"> Sign up</Link>
                    </div>
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default LoginPage;
