import { combineReducers } from 'redux';
import pokemonLineups from './pokemonLineups';
import pokemon from './pokemon';
import previewPokemon from './previewPokemon';

export default combineReducers({
	pokemonLineups,
	pokemon,
	previewPokemon
});
