import { Outlet } from 'react-router-dom';

import React from 'react'
import Navbar from "./navbar/navBar/NavBar";
import styles from './Layout.module.css';
import variables from '../styles/styles.module.css'; // DON'T DELETE

const Layout = () => {
    return(
        <div className={styles.Layout}>
            <Navbar/>
            <Outlet/>
        </div>
    )
}

export default Layout