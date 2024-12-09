import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import "../../styles/planets.css"; 

const Planets = () => {
    const { store, actions } = useContext(Context);
    const [favorites, setFavorites] = useState({});

    const handleFavoriteToggle = (planet) => {
        setFavorites((prevState) => {
            const newState = { ...prevState };
            if (newState[planet.uid]) {
                delete newState[planet.uid];
            } else {
                newState[planet.uid] = planet.name;
            }
            return newState;
        });

        actions.addFavorites(planet.name);
    };

    useEffect(() => {
        actions.getAllPlanets();
    }, []);

    return (
        
        <div className="databank-planets-container">
            <h1 className="databank-title">PLANETS</h1>
            <div className="planet-grid">
                {store.planets.map((planet, index) => (
                    <div className="planet-card" key={index}>
                        <div className="planet-image">
                            <img 
                                src={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`}
                                
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://i.etsystatic.com/23313394/r/il/42204a/2316127314/il_fullxfull.2316127314_93m1.jpg";
                                }}
                            />
                        </div>
                        <div className="planet-info">
                            <h2 className="planet-name">{planet.name}
                            <FaRegHeart
                                    className="favorite-icon"
                                    style={{
                                        color: favorites[planet.uid] ? 'red' : 'yellow'
                                    }}
                                    onClick={() => handleFavoriteToggle(planet)} 
                                />
                            </h2>
                            <div className="planet-actions">
                                
                                <Link
                                    to={`/planetSingle/${planet.uid}`}
                                    className="details-link"
                                >
                                    READ MORE
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export { Planets };