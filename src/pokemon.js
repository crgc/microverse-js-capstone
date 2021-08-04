const loadPokemon = () => localStorage.getItem('pokemon');

const savePokemon = (pokemon) => localStorage.setItem('pokemon', pokemon);

export {
  loadPokemon,
  savePokemon
};