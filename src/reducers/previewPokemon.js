const initialState = {};

const updatePreview = (state, pokemon) => {
	if (Object.keys(state).length > 1) return { ...pokemon };
	return state;
};

const previewPokemon = (state = initialState, actions) => {
	switch (actions.type) {
		case 'ADD_PREVIEW':
			return { ...actions.pokemon };
		case 'REMOVE_PREVIEW':
			return initialState;
		case 'UPDATE_PREVIEW':
			return updatePreview(state, actions.pokemon);
		default:
			return state;
	}
};

export default previewPokemon;
