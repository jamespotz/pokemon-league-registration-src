const initialState = {};

const pokemon = (state = initialState, actions) => {
	switch (actions.type) {
		case 'SELECT_POKEMON':
			return { ...actions.pokemon };
		case 'REMOVE_SELECTED_POKEMON':
			return initialState;
		default:
			return state;
	}
};

export default pokemon;
