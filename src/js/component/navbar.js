import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { FaRegHeart, FaHeart } from "react-icons/fa";  
import "../../styles/navbar.css";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const [activeLink, setActiveLink] = useState(null);
    const navigate = useNavigate();

    const favsCount = store.favorites.length;

    return (
        <nav className="navbar">
            <div className="navbar-box">
                {/* Título centrado */}
                <div className="navbar-center">
                    <h1 className="star-wars-title">Star Wars</h1>
                </div>
            </div>

            {/* Links centrados de "Characters", "Planets", "Vehicles" */}
            <ul className="nav nav-underline justify-content-center nav-justified" id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                    <Link
                        to="/characters"
                        className={`nav-link ${activeLink === 'characters' ? 'active' : ''}`}
                        onClick={() => setActiveLink('characters')}
                        role="tab"
                    >
                        Characters
                    </Link>
                </li>
                <li className="nav-item" role="presentation">
                    <Link
                        to="/planets"
                        className={`nav-link ${activeLink === 'planets' ? 'active' : ''}`}
                        onClick={() => setActiveLink('planets')}
                        role="tab"
                    >
                        Planets
                    </Link>
                </li>
                <li className="nav-item" role="presentation">
                    <Link
                        to="/vehicles"
                        className={`nav-link ${activeLink === 'vehicles' ? 'active' : ''}`}
                        onClick={() => setActiveLink('vehicles')}
                        role="tab"
                    >
                        Vehicles
                    </Link>
                </li>
            </ul>

            {/* Aquí está el contador de favoritos */}
            <div className="favorites-count">
                <span>Favorites: {favsCount}</span>
            </div>
        </nav>
    );
};

export default Navbar;






