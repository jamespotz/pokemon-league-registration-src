import React, { useState, useEffect } from 'react';
import Input from './Input';

const PokemonStats = props => {
	const [stat, setStat] = useState({});

	useEffect(() => {
		if (props.stat) {
			setStat(props.stat);
		}
	}, [props.stat]);

	const handleChange = e => {
		const { name, value } = e.target;
		switch (name) {
			case 'effort':
				if (typeof props.onChange === 'function')
					props.onChange(props.index, name, value);
				return setStat({ ...stat, effort: value });
			case 'base_stat':
				if (typeof props.onChange === 'function')
					props.onChange(props.index, name, value);
				return setStat({ ...stat, base_stat: value });
			default:
				return false;
		}
	};

	return (
		<div className="mt-2">
			<h2 className="text-gray-600 font-bold uppercase text-xl">
				{stat.stat ? stat.stat.name : ''}
			</h2>
			<div className="flex justify-between">
				<div className="w-1/2 pr-4">
					<Input
						label="base_stat"
						name="base_stat"
						value={stat.base_stat}
						onChange={handleChange}
						type="number"
						min="0"
						max="255"
						helperText="The base value of the stat."
					/>
				</div>
				<div className="w-1/2">
					<Input
						label="effort"
						name="effort"
						value={stat.effort}
						onChange={handleChange}
						type="number"
						min="0"
						max="255"
						helperText="
            The effort points (EV) the Pokémon"
					/>
				</div>
			</div>
		</div>
	);
};

export default PokemonStats;
