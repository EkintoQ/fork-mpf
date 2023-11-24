import React, {useEffect, useState} from 'react';
import './LostPasswordPage.css';
import {getRandomMovieImage} from "../../api/tmdb/MovieAPI";
import {postLostPasswordSetMail} from "../../api/server/LostPassAPI";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Spinner} from "react-bootstrap";

const LostPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [backgroundImage, setBackgroundImage] = useState('');
    const [loading, setLoading] = useState(false);


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await postLostPasswordSetMail(email);

            if (response === false) {
                toast.error('Ups... Seems like you provided wrong email. \n Please try again:)', {
                    position: toast.POSITION.TOP_CENTER,
                });
                console.error('Error occurred while sending password reset email:', response);

            } else {
                toast.success('The confirmation link was successfully sent \n Please check your email', {
                    position: toast.POSITION.TOP_CENTER,
                });
                console.log('Password reset email sent!', response);

            }
        } catch (error) {
            console.error('Error occurred while sending password reset email:', error);
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
            <div className="lost-password-container">
                <h1 className="head">Lost password?</h1>
                <h2 className="description">We will send you an email to help with that</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            className="lost-password-input"
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <button className="submit-btn" type="submit" disabled={loading}>
                        {loading ? <Spinner></Spinner>: 'Reset password'}
                    </button>
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default LostPasswordPage;
