import React, { useState, useEffect } from 'react';
import upperFirst from 'lodash/upperFirst';
import { connect } from 'react-redux';

const Card = ({ toggleSelect, onRemove, selectedPokemon, ...rests }) => {
	const [selected, setSelected] = useState(false);

	useEffect(() => {
		if (!selectedPokemon) return;
		setSelected(selectedPokemon === rests.id);
	}, [rests.id, selectedPokemon]);

	return (
		<div className="w-1/3 relative">
			<div className="w-full h-40 p-2">
				<div className="transition w-full h-full bg-gray-200 border rounded-lg border-transparent flex flex-col items-center justify-center hover:shadow-md">
					{rests.sprites && (
						<div
							className="w-24 h-24 border rounded-full bg-gray-300 border-transparent bg-cover bg-center"
							style={{
								backgroundImage: `url(${rests.sprites.front_default})`
							}}
						/>
					)}
					{rests.name !== 'Pokemon' && <h2>{upperFirst(rests.name)}</h2>}
				</div>
			</div>
			{Object.keys(rests).length > 2 && (
				<div className="flex absolute top-0 right-0 mx-3 my-4">
					<button
						className="w-8 h-8 focus:outline-none"
						title="Select Pokemon"
						onClick={() => {
							if (typeof toggleSelect === 'function')
								toggleSelect.call(null, rests, !selected);

							setSelected(!selected);
						}}
					>
						<i className="material-icons">
							{selected ? 'check_box' : 'check_box_outline_blank'}
						</i>
					</button>
					<button
						title="Remove Pokemon"
						className="w-8 h-8 focus:outline-none"
						onClick={() => {
							if (typeof onRemove === 'function')
								return onRemove.call(null, rests.id);
						}}
					>
						<i className="material-icons">clear</i>
					</button>
				</div>
			)}
		</div>
	);
};

const mapStateToProps = state => ({
	selectedPokemon: state.pokemon.id
});

export default connect(mapStateToProps)(Card);
