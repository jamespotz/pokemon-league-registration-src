import React, { useState, useEffect } from 'react';
import Input from './Input';

const PokemonAbility = ({ index, ...rests }) => {
	const [ability, setAbility] = useState({});

	useEffect(() => {
		if (!rests.ability) return;
		setAbility(rests.ability);
	}, [rests.ability]);

	const handleChange = e => {
		const { name, value } = e.target;
		switch (name) {
			case 'name':
				if (typeof rests.onChange === 'function')
					rests.onChange(index, name, value);
				return setAbility({
					...ability,
					ability: { ...ability.ability, name: value }
				});
			case 'is_hidden':
				if (typeof rests.onChange === 'function')
					rests.onChange(index, name, value === 'true');
				return setAbility({ ...ability, is_hidden: value === 'true' });
			default:
				return false;
		}
	};

	const handleRemove = () => {
		if (!ability.uniqId) return;
		if (typeof rests.onRemove === 'function')
			rests.onRemove.call(null, ability.uniqId);
	};

	return (
		Object.keys(ability).length > 1 && (
			<div className="mt-2">
				<div className="flex justify-between relative">
					<div className="w-1/2 pr-4">
						<Input
							label="name"
							name="name"
							value={ability.ability.name}
							onChange={handleChange}
							helperText="Ability name"
						/>
					</div>
					<div className="w-1/2 flex flex-col">
						<label
							htmlFor={`ability-${index}-is_hidden`}
							className="text-gray-600 font-bold uppercase text-base"
						>
							Is Hidden?
						</label>
						<small className="text-gray-400 text-sm leading-normal">
							Is the ability hidden?
						</small>
						<select
							value={ability.is_hidden}
							onChange={handleChange}
							id={`ability-${index}-is_hidden`}
							name="is_hidden"
							className="transition focus:outline-none focus:bg-white focus:border-gray-200 bg-gray-200 border border-transparent rounded w-full p-2 leading-normal appearance-none"
						>
							<option value="true">True</option>
							<option value="false">False</option>
						</select>
					</div>
					{!!ability.uniqId && (
						<button
							onClick={handleRemove}
							className="appearance-none absolute top-0 right-0 hover:text-red-400"
						>
							<i className="material-icons">cancel</i>
						</button>
					)}
				</div>
			</div>
		)
	);
};

export default PokemonAbility;
