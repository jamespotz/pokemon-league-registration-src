import React from 'react';
import Pokedex from './components/Pokedex/Pokedex';
import PokemonLineup from './components/PokemonLineup/PokemonLineup';
import PokemonData from './components/PokemonData/PokemonData';

function App() {
	return (
		<div className="App">
			<header className="container mx-auto h-screen">
				<div className="flex w-full h-full justify-center items-center">
					<div className="w-full flex bg-white shadow-md rounded-lg overflow-hidden min-h-18 p-10">
						<div className="flex flex-col w-8/12 pr-6">
							<div className="w-full">
								<h1 className="tracking-wide text-2xl font-sans font-bold leading-normal">
									Pokémon Lineup
								</h1>
								<small className="text-gray-500 text-sm">
									Select a pokémon by checking the box. Remove pokémon by
									clicking on the 'X' symbol.
								</small>
								<PokemonLineup />
							</div>
							<div className="w-full mt-4">
								<h1 className="tracking-wide text-2xl font-sans font-bold leading-normal">
									Pokémon Data
								</h1>
								<small className="text-gray-500 text-sm">
									Select a pokémon from the top and edit your pokémon attributes
									here.
								</small>
								<PokemonData />
							</div>
						</div>
						<div className="flex flex-col w-4/12 pl-6">
							<h1 className="tracking-wide text-2xl font-sans font-bold leading-normal">
								Pokédex
							</h1>
							<small className="text-gray-500 text-sm">
								Search pokémon by name or id and press enter.
							</small>
							<Pokedex />
						</div>
					</div>
				</div>
			</header>
		</div>
	);
}

export default App;
