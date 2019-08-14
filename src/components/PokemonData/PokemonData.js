import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Input from './Input';
import PokemonStats from './PokemonStats';
import { updatePreview, updatePokemon } from '../../actions';
import PokemonAbility from './PokemonAbility';
import uniqId from 'uniqid';

const PokemonData = props => {
	const [data, setData] = useState({});

	useEffect(() => {
		if (props.pokemon) setData(props.pokemon);
	}, [props.pokemon]);

	useEffect(() => {
		if (Object.keys(data).length <= 0) return;
		props.dispatch(updatePreview(data));
	}, [data, props]);

	const handleChange = e => {
		const { name, value } = e.target;
		switch (name) {
			case 'name':
				return setData({ ...data, name: value });
			case 'weight':
				return setData({ ...data, weight: value });
			case 'height':
				return setData({ ...data, height: value });
			default:
				return false;
		}
	};

	const handleStats = (index, name, value) => {
		const newStats = [...data.stats];
		if (!newStats[index]) return;
		newStats[index][name] = value;
		setData({ ...data, stats: newStats });
	};

	const handleAbilities = (index, name, value) => {
		const newAbilities = [...data.abilities];
		if (!newAbilities[index]) return;
		switch (name) {
			case 'name':
				newAbilities[index].ability.name = value;
				return setData({ ...data, abilities: newAbilities });
			case 'is_hidden':
				newAbilities[index].is_hidden = value;
				return setData({ ...data, abilities: newAbilities });
			default:
				return false;
		}
	};

	const removeAbility = id => {
		const newAbilities = [...data.abilities].filter(i => i.uniqId !== id);
		setData({ ...data, abilities: newAbilities });
	};

	const addNewAbility = () => {
		const newAbilities = [...data.abilities];
		const cloned = { ...data.abilities[0] };

		newAbilities.push({
			...cloned,
			ability: { ...cloned.ability, name: '' },
			is_hidden: true,
			uniqId: uniqId()
		});

		setData({ ...data, abilities: newAbilities });
	};

	const reset = () => setData(props.pokemon);
	const update = () => {
		props.dispatch(updatePokemon(data));
	};

	return (
		<div className="w-full border rounded-lg pokemon-data-container p-3 overflow-y-auto">
			{Object.keys(data).length > 1 && (
				<React.Fragment>
					<h1 className="text-gray-400 text-xl font-bold leading-normal">
						Dex Id: #{data.id}
					</h1>
					<div className="flex justify-between">
						<div className="w-1/3 pr-4">
							<Input
								value={data.name}
								onChange={handleChange}
								label="name"
								name="name"
								helperText="Rename your pokemon"
							/>
						</div>
						<div className="w-1/3 pr-4">
							<Input
								value={data.weight}
								onChange={handleChange}
								label="weight"
								name="weight"
								type="number"
								helperText="weight in hectometers"
								min="1"
								max="999"
							/>
						</div>
						<div className="w-1/3">
							<Input
								value={data.height}
								onChange={handleChange}
								label="height"
								name="height"
								type="number"
								helperText="height in decimeter"
								min="1"
								max="999"
							/>
						</div>
					</div>
					<div className="mt-4">
						<h1 className="text-2xl font-bold text-black leading-normal tracking-wide">
							Stats
						</h1>
						<small className="text-gray-400 text-sm leading-normal">
							Customize your stat here
						</small>
						{data.stats.map((stat, index) => (
							<PokemonStats
								stat={stat}
								key={stat.stat.name}
								index={index}
								onChange={handleStats}
							/>
						))}
					</div>
					<div className="mt-4">
						<h1 className="text-2xl font-bold text-black leading-normal tracking-wide">
							Abilities
						</h1>
						<small className="text-gray-400 text-sm leading-normal">
							Customize your abilities or add new ability
						</small>
						{data.abilities.map((ability, index) => (
							<PokemonAbility
								ability={ability}
								index={index}
								key={`ability-${index}`}
								onChange={handleAbilities}
								onRemove={removeAbility}
							/>
						))}
						<button
							onClick={addNewAbility}
							className="mt-2 p-2 flex items-center border apperance-none focus:outline-none rounded hover:shadow hover:bg-blue-500 hover:text-white"
						>
							<i className="material-icons">add</i> Ability
						</button>
					</div>
					<div className="flex">
						<button
							onClick={reset}
							className="mt-2 p-2 flex items-center border apperance-none focus:outline-none rounded hover:shadow rounded-lg reset-btn"
						>
							<i className="material-icons">refresh</i> Reset
						</button>
						<button
							onClick={update}
							className="mt-2 ml-3 text-gray-300 hover:text-gray-100 p-2 flex items-center border apperance-none focus:outline-none rounded hover:shadow rounded-lg text-white save-btn"
						>
							<i className="material-icons">save</i> Save
						</button>
					</div>
				</React.Fragment>
			)}
		</div>
	);
};

const mapStateToProps = state => ({
	pokemon: state.pokemon
});

export default connect(mapStateToProps)(PokemonData);
