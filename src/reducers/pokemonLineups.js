const initialState = [];

const addPokemonToLineup = (state, pokemon) => {
	if (state.length === 6) return state;
	const pokemonExist = state.filter(p => p.id === pokemon.id);
	if (pokemonExist.length > 0) return [...state];
	return [...state, pokemon];
};

const removePokemonFromLineup = (state, id) => {
	const filtered_pokemons = state.filter(i => i.id !== id);
	return [...filtered_pokemons];
};

const updatePokemonLineup = (state, pokemon) => {
	const newState = [...state];
	const index = newState.findIndex(item => item.id === pokemon.id);
	if (index >= 0) {
		newState.splice(index, 1, pokemon);
		return [...newState];
	}
	return state;
};

const pokemonsLineup = (state = initialState, actions) => {
	switch (actions.type) {
		case 'ADD_POKEMON':
			return addPokemonToLineup(state, actions.pokemon);
		case 'REMOVE_POKEMON':
			return removePokemonFromLineup(state, actions.id);
		case 'UPDATE_POKEMON':
			return updatePokemonLineup(state, actions.pokemon);
		default:
			return state;
	}
};

export default pokemonsLineup;
