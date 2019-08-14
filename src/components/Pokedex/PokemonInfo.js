import React from 'react';
import upperFirst from 'lodash/upperFirst';

const PokemonInfo = ({ onClick, ...rest }) => {
	const stats = rest.stats
		? rest.stats.reduce((acc, item) => {
				acc[item.stat.name] = item.base_stat;
				return acc;
		  }, {})
		: {};

	const getAbilities = () => {
		return rest.abilities
			.filter(a => !a.is_hidden)
			.map(a => upperFirst(a.ability.name))
			.join(', ');
	};

	const getWeight = () => {
		const hectograms = rest.weight;
		const lbs = 4.536;

		const pounds = (hectograms / lbs).toFixed(1);
		return `${pounds} lbs`;
	};

	const getHeight = () => {
		const decimeters = rest.height;
		const feet = 3.048;
		const inch = 12;

		const heightWithDecimal = decimeters / feet;
		const heightInFeet = Math.floor(decimeters / feet);
		const heightInInch = Math.ceil((heightWithDecimal - heightInFeet) * inch);

		return `${heightInFeet}' ${heightInInch}''`;
	};

	const addToLineup = () => {
		const pokemon = { ...rest };
		if (typeof onClick === 'function') onClick.call(null, pokemon);
	};

	return (
		<button
			className="border rounded hover:shadow-md items-center pokedex-card overflow-hidden appearance-none w-full mt-4"
			onClick={addToLineup}
		>
			<div>
				<div className="flex px-6 pt-6 items-center">
					<div className="w-32">
						<div
							alt={rest.name}
							className="w-32 h-32 border bg-gray-300 border-transparent rounded-full bg-cover bg-center"
							style={{
								backgroundImage: `url(${rest.sprites.front_default})`
							}}
						/>
						<span className="text-sm text-gray-400">#{rest.id}</span>
					</div>
					<div className="ml-6 flex w-full text-left">
						<div className="inline-flex flex-col text-left w-1/2">
							<div className="flex flex-col">
								<strong className="leading-normal text-md">Name:</strong>
								<span className="text-gray-700">{upperFirst(rest.name)}</span>
							</div>
							<div className="flex flex-col">
								<strong className="leading-normal text-md">Type:</strong>
								<span className="text-gray-700">
									{rest.types.map(i => upperFirst(i.type.name)).join(', ')}
								</span>
							</div>
							<div className="flex flex-col">
								<strong className="leading-normal text-md">Abilities:</strong>
								<span className="text-gray-700">{getAbilities()}</span>
							</div>
						</div>
						<div className="inline-flex flex-col text-left w-1/2">
							<div className="flex flex-col">
								<strong className="leading-normal text-md">Height:</strong>
								<span className="text-gray-700">{getHeight()}</span>
							</div>
							<div className="flex flex-col">
								<strong className="leading-normal text-md">Weight:</strong>
								<span className="text-gray-700">{getWeight()}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col mt-2 px-6 pb-6 text-left">
				<h2>Stats</h2>
				<table className="w-full border">
					<thead className="border">
						<tr>
							<td className="border px-1 text-left">HP</td>
							<td className="border px-1 text-left">Atk</td>
							<td className="border px-1 text-left">Def</td>
							<td className="border px-1 text-left">Sp. Atk</td>
							<td className="border px-1 text-left">Sp. Def</td>
							<td className="border px-1 text-left">Speed</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="border px-1 text-left">{stats['hp']}</td>
							<td className="border px-1 text-left">{stats['attack']}</td>
							<td className="border px-1 text-left">{stats['defense']}</td>
							<td className="border px-1 text-left">
								{stats['special-attack']}
							</td>
							<td className="border px-1 text-left">
								{stats['special-defense']}
							</td>
							<td className="border px-1 text-left">{stats['speed']}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</button>
	);
};

export default PokemonInfo;
