import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";


import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const params = useParams();
	const [likedCharacters, setLikedCharacters] = useState([]);
    const [likedPlanets, setLikedPlanets] = useState([]);

	const handleLikeToggle = (item, type, event) => {
        event.stopPropagation();  // evita redireccionar al hacer clic en el botón

        if (type === "character") {
            if (likedCharacters.includes(item.uid)) {
                setLikedCharacters((prev) => prev.filter((id) => id !== item.uid));
            } else {
                setLikedCharacters((prev) => [...prev, item.uid]);
                actions.addFavorites(item.name); 
            }
        } else if (type === "planet") {
            if (likedPlanets.includes(item.uid)) {
                setLikedPlanets((prev) => prev.filter((id) => id !== item.uid));
            } else {
                setLikedPlanets((prev) => [...prev, item.uid]);
                actions.addFavorites(item.name); 
            }
        }
    };


	useEffect(() => {
		actions.getPlanets()
		actions.getCharacters()
	}, [])


	useEffect(() => {
		console.log(store.characters)
	}, [store.characters])




	return (
		<div className="home-sw">
			<h1 className="home-sw-title">The force is with you</h1>
			<div className="databank-container">
				<div className="card-list-container">

					<h2 className="section-title">Characters
						<Link to="/characters" className="see-more-link">
							<button className="btn-see-more">All Characters</button>
						</Link>
					</h2>

					<div className="card-list">
						{store.characters.slice(0, 14).map((character, index) => (
							<div className="card-item" key={index} onClick={() => navigate(`/characterSingle/${character.uid}`)}>
								<img
									src={`https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`}
									className="card-img"
									
								/>
								<div className="card-content">
									<h5 className="card-title">{character.name}</h5>
									<div className="card-actions">
										<button className="like-button" onClick={(e) => handleLikeToggle(character, "character", e)} // Detiene la navegación
										>
											{likedCharacters.includes(character.uid) ? <FaHeart className="heart-cards" color="red" /> : <FaRegHeart />}
										</button>
									</div>

								</div>
								
							</div>
						))}
					</div>

				</div>

				<div className="card-list-container">

					<h2 className="section-title">Planets
						<Link to="/planets" className="see-more-link">
							<button className="btn-see-more">All Planets</button>
						</Link>
					</h2>

					<div className="card-list">
						{store.planets.slice(0, 14).map((planet, index) => (
							<div className="card-item" key={index} onClick={() => navigate(`/planets/${planet.uid}`)}>
								<img
									src={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`}
									className="card-img"
									onError={(e) => {
										e.target.onerror = null;
										e.target.src = "https://i.etsystatic.com/23313394/r/il/42204a/2316127314/il_fullxfull.2316127314_93m1.jpg";
									}}
									alt={planet.name}
								/>
								<div className="card-content">
									<h5 className="card-title">{planet.name}</h5>
									<div className="card-actions">
										<button className="like-button" onClick={(e) => handleLikeToggle(planet, "planet", e)} // Detiene la navegación
										>
											{likedPlanets.includes(planet.uid) ? <FaHeart className="heart-cards" color="red" /> : <FaRegHeart />}
										</button>
									</div>
								</div>
								

							</div>
						))}
					</div>

				</div>
			</div>
		</div>


	)
};
