import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import {
	selectPokemon,
	removeSelectedPokemon,
	removePokemon,
	addPreview,
	removePreview
} from '../../actions';

const createDummyLineup = num => Array(num).fill({ name: 'Pokemon' });

const PokemonLineup = props => {
	const [lineup, setLineup] = useState([]);

	useEffect(() => {
		setLineup(createDummyLineup(6));
	}, []);

	useEffect(() => {
		if (props.pokemons) {
			const currentLineupCount = props.pokemons.length;
			let newLineups = [...props.pokemons];
			if (currentLineupCount < 6) {
				newLineups = [
					...props.pokemons,
					...createDummyLineup(Math.abs(currentLineupCount - 6))
				];
			}
			setLineup(newLineups);
		}
	}, [props]);

	const toggleSelect = (pokemon, isSelected) => {
		if (isSelected) {
			props.dispatch(selectPokemon(pokemon));
			props.dispatch(addPreview(pokemon));
		}

		if (pokemon.id !== props.pokemon.id) return;
		props.dispatch(removeSelectedPokemon());
		props.dispatch(removePreview());
	};

	const handleRemove = id => {
		if (props.pokemon.id === id) {
			props.dispatch(removeSelectedPokemon());
			props.dispatch(removePreview());
		}
		props.dispatch(removePokemon(id));
	};

	return (
		<div className="w-full flex flex-wrap border rounded-lg">
			{lineup.map((item, index) => (
				<Card
					{...item}
					toggleSelect={toggleSelect}
					onRemove={handleRemove}
					key={item.id || index}
				/>
			))}
		</div>
	);
};

const mapStateToProps = state => ({
	pokemons: state.pokemonLineups,
	pokemon: state.pokemon
});

export default connect(mapStateToProps)(PokemonLineup);
