import pokedex from './pokedex';

const fetchSinglePokemon = async (pokemon) => {
  return await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then(response => response.json());
};

const fetchPokemon = async() => {
  const fetchAll = pokedex.map(async pokemon => {
    return await fetchSinglePokemon(pokemon);
  });

  const result = (await Promise.all(fetchAll)).map(pkmn => ({
    name: pkmn.name,
    image: pkmn.sprites['other']['official-artwork']['front_default']
  }));

  return result;
};

export default fetchPokemon;