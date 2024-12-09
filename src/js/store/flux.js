const getState = ({ getStore, getActions, setStore }) => {
    return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			favorites: [],
			characters: [],
			charactersDetails: null,
			charactersProperties: [],
			planets: [],
			planetDetails: null,
			vehicles: [],
			vehicleDetail: null,
		},
		actions: {
			
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},

			addFavorites: (favorite) => {
				const store = getStore();
				setStore({ favorites: [...store.favorites, favorite] });
				console.log([...store.favorites, favorite]);
			},

			deleteFavorite: (id) => {
				const store = getStore();
				const updatedFavorites = store.favorites.filter((_, index) => index !== id);
				setStore({ favorites: updatedFavorites });
			},

			getCharactersDetails: (id) => {
				fetch(`https://www.swapi.tech/api/people/${id}`)
					.then(res => res.json())
					.then(data => setStore({ charactersDetails: data.result.properties }))
					.catch(err => console.error(err));
			},

			getVehicleDetail: (id) => {
				fetch(`https://www.swapi.tech/api/vehicles/${id}`)
					.then(res => res.json())
					.then(data => setStore({ vehicleDetail: data.result.properties }))
					.catch(err => console.error(err));
			},
			
			getPlanets: () => {
				fetch("https://www.swapi.tech/api/planets?page=1&limit=150")
					.then(res => res.json())
					.then(data => setStore({ planets: data.results }))
					.catch(err => console.error(err));
			},

			getAllPlanets: () => {
				fetch("https://www.swapi.tech/api/planets?page=2&limit=150")
                    .then(res => res.json())
                    .then(data => setStore({ planets: data.results }))
                    .catch(err => console.error(err));
            },

			getPlanetDetail: (id) => { 
				fetch(`https://www.swapi.tech/api/planets/${id}`)
					.then(res => res.json())
					.then(data => setStore({ planetDetail: data.result.properties }))
					.catch(err => console.error(err))

			},

			getCharacters: () => {
				fetch("https://www.swapi.tech/api/people/")
					.then(res => res.json())
					.then(data => setStore({ characters: data.results }))
					.catch(err => console.error(err));
			},

			getCharactersProperties: (id) => {
				fetch(`https://www.swapi.tech/api/people/${id}`)
					.then(res => res.json())
					.then(data => setStore({ charactersProperties: data.result.properties }))
					.catch(err => console.error(err));
			},

			getAllCharacters: () => {
				fetch("https://www.swapi.tech/api/people?page=2&limit=50")
                    .then(res => res.json())
                    .then(data => setStore({ characters: data.results }))
                    .catch(err=> console.error(err));
            },

			getAllVehicles: () => {
				const requestOptions = {
					method: "GET",
					redirect: "follow"
				};

				fetch("https://www.swapi.tech/api/vehicles?page=2&limit=100", requestOptions)
					.then((response) => response.json())
					.then((result) => setStore({ vehicles: result.results }))
					.catch((error) => console.error(error));
			}
		}
	};
};

export default getState;
