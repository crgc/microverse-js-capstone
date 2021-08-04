import pokedex from './pokedex.js';

const fetchSinglePokemon = async (pokemon) => fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then((response) => response.json());

const fetchPokemon = async () => {
  const fetchAll = pokedex.map(async (pokemon) => fetchSinglePokemon(pokemon));

  const result = (await Promise.all(fetchAll)).map((pkmn) => ({
    name: pkmn.name,
    image_url: pkmn.sprites.other['official-artwork'].front_default,
  }));

  return result;
};

export default fetchPokemon;