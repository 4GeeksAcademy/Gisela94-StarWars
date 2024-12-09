import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router";
import "../../styles/characterSingle.css";

const CharacterSingle = () => {
    const { store, actions } = useContext(Context);
    const { characterId } = useParams();

    useEffect(() => {
        actions.getCharactersDetails(characterId);
    }, [characterId]);

    return (
        <div className="character-single-container">
            {!store.charactersDetails ? (
                <h1 className="loading-text">Loading..</h1>
            ) : (
                <div className="character-single-card">
                    <div className="row single-char g-0">
                        <div className="col-md-6 character-single-img-container">
                            <img 
                                src={`https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`}
                                className="card-single-img character-single-img"
                                alt={store.charactersDetails.name}
                                
                            />
                        </div>
                        <div className="col-md-6 character-single-info">
                            <div className="card-single-body">
                                <h1 className="character-single-name">{store.charactersDetails.name}</h1>
                                <ul className="character-single-details-list">
                                    <li><strong>Birth Date:</strong> {store.charactersDetails.birth_year}</li>
                                    <li><strong>Gender:</strong> {store.charactersDetails.gender}</li>
                                    <li><strong>Eye Color:</strong> {store.charactersDetails.eye_color}</li>
                                    <li><strong>Hair Color:</strong> {store.charactersDetails.hair_color}</li>
                                    <li><strong>Height:</strong> {store.charactersDetails.height} cm</li>
                                    <li><strong>Skin Color:</strong> {store.charactersDetails.skin_color}</li>
                                    <li><strong>Mass:</strong> {store.charactersDetails.mass} kg</li>
                                    <li><strong>Homeworld:</strong> {store.charactersDetails.homeworld}</li>
                                    <li><strong>URL:</strong> {store.charactersDetails.url}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export { CharacterSingle };