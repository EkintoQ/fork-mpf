import { Outlet } from 'react-router-dom';

import React from 'react'
import Navbar from "./navbar/navBar/Navbar";
import styles from './Layout.module.css';
import variables from '../styles/styles.module.css'; // DON'T DELETE

const Layout = () => {
    return(
        <div className={styles.default}>
            <Navbar/>
            <div className={styles.Layout}>
                <Outlet/>
            </div>
        </div>
    )
}

export default Layout