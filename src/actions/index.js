export const addPokemon = pokemon => ({
	type: 'ADD_POKEMON',
	pokemon
});

export const removePokemon = id => ({
	type: 'REMOVE_POKEMON',
	id
});

export const updatePokemon = pokemon => ({
	type: 'UPDATE_POKEMON',
	pokemon
});

export const selectPokemon = pokemon => ({
	type: 'SELECT_POKEMON',
	pokemon
});

export const removeSelectedPokemon = () => ({
	type: 'REMOVE_SELECTED_POKEMON'
});

export const addPreview = pokemon => ({
	type: 'ADD_PREVIEW',
	pokemon
});

export const removePreview = () => ({
	type: 'REMOVE_PREVIEW'
});

export const updatePreview = pokemon => ({
	type: 'UPDATE_PREVIEW',
	pokemon
});
