import './styles/reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout';
import {Navigate, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import {FilmPage} from './pages/filmPage/FilmPage';
import RegistrationPage from './pages/registrationPage/RegistrationPage';
import SettingsPage from "./pages/settingsPage/SettingsPage";
import FilmsBrowsingPage from "./pages/filmsBrowsingPage/FilmsBrowsingPage";
import LoginPage from "./pages/loginPage/LoginPage";
import LostPasswordPage from "./pages/lostPasswordPage/LostPasswordPage"
import {createContext, useEffect, useState} from "react";
import {checkAuth, getUserDtoByAuth} from "./api/server/UserAPI";
import UserPage from "./pages/userPage/UserPage";
import NewPasswordPage from "./pages/newPasswordPage/NewPasswordPage";
import ActivateUserPage from "./pages/activateUserPage/ActivateUserPage";
import AboutUsPage from "./pages/aboutUsPage/AboutUsPage";


import {ToastContainer} from "react-bootstrap";
import {ActorPage} from "./pages/actorPage/ActorPage";

export const AuthContext = createContext(null)
export const UserContext = createContext(null)
const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [user, setUser] = useState([]);

    const authenticate = async () => {
        const isAuthenticated = await checkAuth();
        setIsLoggedIn(isAuthenticated);
        const user = await getUserDtoByAuth();
        setUser(user);
    };

    useEffect(() => {
        authenticate().then();
    }, []);

    if (isLoggedIn === null) {
        // Display loading state or a spinner while checking authentication
        return <div></div>;
    }

    return (
        <div className="App">
            <AuthContext.Provider value={isLoggedIn}>
                <UserContext.Provider value={user}>
                    <Routes>
                        <Route path='/' element={<Layout isLogged={isLoggedIn}/>}>
                            <Route index element={<Home/>}></Route>
                            <Route path='person/:id' element={<ActorPage/>}></Route>
                            {/* For not logged in */}
                            <Route
                                path='/registration'
                                element={
                                    isLoggedIn ?
                                        (<Navigate to="/" replace/>)
                                        :
                                        (<RegistrationPage/>)
                                }
                            />
                            <Route
                                path='/login'
                                element={
                                    isLoggedIn ?
                                        (<Navigate to="/" replace/>)
                                        :
                                        (<LoginPage/>)
                                }
                            />
                            {/* For logged in */}
                            <Route
                                path='/forgotPassword'
                                element={
                                    <LostPasswordPage/>
                                }
                            />
                            <Route
                                path='/newPassword'
                                element={
                                    <NewPasswordPage/>
                                }
                            />
                            <Route
                                path='/activateUser'
                                element={
                                    <ActivateUserPage/>
                                }
                            />
                            <Route
                                path='/settings'
                                element={
                                    !isLoggedIn ?
                                        (<Navigate to="/" replace/>)
                                        :
                                        (<SettingsPage/>)
                                }
                            />
                            {/* For everyone */}
                            <Route
                                path='films/:currentPage'
                                element={<FilmsBrowsingPage/>}
                            />
                            <Route
                                path='/aboutUs'
                                element={<AboutUsPage/>}
                            />
                            <Route
                                path='film/:id'
                                element={<FilmPage/>}
                            />
                            <Route
                                path='user/:username'
                                element={<UserPage/>}
                            />
                        </Route>
                    </Routes>
                </UserContext.Provider>
            </AuthContext.Provider>
            <ToastContainer/>
        </div>
    );
}
export default App;
