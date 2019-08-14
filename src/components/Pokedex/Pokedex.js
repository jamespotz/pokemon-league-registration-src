import React, { useState } from 'react';
import Axios from 'axios';
import PokemonInfo from './PokemonInfo';
import { connect } from 'react-redux';
import { addPokemon } from '../../actions/index';
import PreviewPokemonData from './PreviewPokemonData';

const Pokedex = ({ dispatch, ...rests }) => {
	const [term, setTerm] = useState('');
	const [results, setResults] = useState(null);
	const [loading, setLoading] = useState(false);

	const fetchApi = async () => {
		if (!term) return setLoading(false);
		try {
			const { data } = await Axios.get(
				`https://pokeapi.co/api/v2/pokemon/${term.toLowerCase()}`
			);
			setResults(data);
			setLoading(false);
		} catch (e) {
			setResults(null);
			setLoading(false);
		}
	};

	const handleInput = e => setTerm(e.target.value);

	const handleSearch = e => {
		if (e.key !== 'Enter') return;
		setLoading(true);
		setResults(null);
		fetchApi();
	};

	const handleAdd = pokemon => {
		dispatch(addPokemon(pokemon));
		setTerm('');
		setResults(null);
	};

	return (
		<div className="mt-2">
			<input
				type="text"
				value={term}
				onKeyDown={handleSearch}
				onChange={handleInput}
				className="transition focus:outline-none focus:bg-white focus:border-gray-200 bg-gray-200 border border-transparent rounded w-full p-2 leading-normal appearance-none"
				placeholder="Enter the name/id of your pokémon"
			/>
			{loading && <p>Loading...</p>}
			{results && <PokemonInfo {...results} onClick={handleAdd} />}
			{Object.keys(rests.preview).length > 1 && (
				<PreviewPokemonData {...rests.preview} />
			)}
		</div>
	);
};

const mapStateToProps = state => ({
	preview: state.previewPokemon
});

export default connect(mapStateToProps)(Pokedex);
