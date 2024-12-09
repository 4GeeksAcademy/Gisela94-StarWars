import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { FaRegHeart } from "react-icons/fa";
import "../../styles/characters.css";

const Characters = () => {
    const { store, actions } = useContext(Context);
    const { characterId } = useParams();
        
    // Estado que determina si el personaje es favorito
    const [favorites, setFavorites] = useState({});

    // Función para manejar el clic en el ícono
    const handleFavoriteToggle = (character) => {
        setFavorites((prevState) => {
            const newState = { ...prevState };
            if (newState[character.uid]) {
                delete newState[character.uid]; // Si ya está en favoritos, lo eliminamos
            } else {
                newState[character.uid] = character.name; // Si no está, lo agregamos con el nombre
            }
            return newState;
        });

        // Llamamos a la acción para agregar a favoritos
        actions.addFavorites(character.name);
    };
    

    useEffect(() => {
        actions.getAllCharacters();
        actions.getCharactersProperties(characterId);
    }, []);

    return (
        <div className="databank-charac-container">
            <h1 className="databank-title">CHARACTERS</h1>
            <div className="character-grid">
                {store.characters.map((character, index) => (
                    <div className="character-card" key={index}>
                        <div className="character-image">
                            <img 
                                src={`https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`}
                                alt={character.name}
                                
                            />
                        </div>
                        <div className="character-info">
                            <h2 className="character-name">{character.name}
                                <FaRegHeart
                                    className="favorite-icon"
                                    style={{
                                        color: favorites[character.uid] ? 'red' : 'yellow' // Si el personaje está en favoritos, se pone rojo
                                    }}
                                    onClick={() => handleFavoriteToggle(character)} 
                                />
                            </h2>
                            
                            <div className="character-actions">
                                
                                <Link
                                    to={`/characterSingle/${character.uid}`}
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

export { Characters };