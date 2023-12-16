import React from "react";
import {Link} from "react-router-dom";
import "./Poster.css";


const NO_IMAGE = process.env.REACT_APP_NO_IMAGE

const Poster = ({ path, link }) => {
    const imagePath = path.endsWith('.jpg') ? path : NO_IMAGE;
    return (
        <div>
            <Link to={link}>
                <div style={{position: 'relative', display: 'inline-block'}}>
                        <img
                        src={imagePath}
                        className="poster"
                        alt="poster"
                        />
                </div>
            </Link>
        </div>
    )
}

export default Poster;
