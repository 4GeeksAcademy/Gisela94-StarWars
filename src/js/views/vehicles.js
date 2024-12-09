import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import "../../styles/vehicles.css";

const Vehicles = () => {
    const { store, actions } = useContext(Context);

    // Estado que determina si el vehículo es favorito
    const [favorites, setFavorites] = useState({});

    // Función para manejar el clic en el ícono de favoritos
    const handleFavoriteToggle = (vehicle) => {
        setFavorites((prevState) => {
            const newState = { ...prevState };
            if (newState[vehicle.uid]) {
                delete newState[vehicle.uid]; // Si ya está en favoritos, lo eliminamos
            } else {
                newState[vehicle.uid] = vehicle.name; // Si no está, lo agregamos con el nombre
            }
            return newState;
        });

        // Llamamos a la acción para agregar a favoritos
        actions.addFavorites(vehicle.name);
    };

    useEffect(() => {
        actions.getAllVehicles(); // Cargar todos los vehículos
    }, []);

    return (
        <div className="databank-vehicles-container">
            <h1 className="databank-title">VEHICLES</h1>
            <div className="vehicle-grid">
                {store.vehicles.map((vehicle, index) => (
                    <div className="vehicle-card" key={index}>
                        <div className="vehicle-image">
                            <img 
                                src={`https://starwars-visualguide.com/assets/img/vehicles/${vehicle.uid}.jpg`}
                                alt={vehicle.name}
                                onError={(error) => {
                                    error.target.onerror = null; // Evitar bucle infinito si la imagen alternativa falla también
                                    error.target.src = "https://i.etsystatic.com/23313394/r/il/42204a/2316127314/il_fullxfull.2316127314_93m1.jpg"; // Imagen alternativa
                                }}
                            />
                        </div>
                        <div className="vehicle-info">
                            <h2 className="vehicle-name">{vehicle.name}
                                <FaRegHeart
                                    className="favorite-icon"
                                    style={{
                                        color: favorites[vehicle.uid] ? 'red' : 'yellow' // Si el vehículo está en favoritos, se pone rojo
                                    }}
                                    onClick={() => handleFavoriteToggle(vehicle)} 
                                />
                            </h2>
                            
                            <div className="vehicle-actions">
                                <Link
                                    to={`/vehicleSingle/${vehicle.uid}`}
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

export { Vehicles };