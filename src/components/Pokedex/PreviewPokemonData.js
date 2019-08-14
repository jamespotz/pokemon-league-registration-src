import React from 'react';
import upperFirst from 'lodash/upperFirst';
import PokemonData from '../PokemonData/PokemonData';
import PokemonInfo from './PokemonInfo';

const PreviewPokemonData = props => (
	<div>
		<h1 className="text-xl font-bold mt-4 text-gray-700">Preview Changes</h1>
		<PokemonInfo {...props} />
	</div>
);

export default PreviewPokemonData;
