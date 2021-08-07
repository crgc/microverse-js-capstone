import _ from 'lodash'; /* eslint-disable-line */
import pokedex from './pokedex.js';

/* { "item_id": "Arcanine" } */
/* Created */
/* {
    "item_id": "Arcanine",
    "username": "Carlos",
    "comment": "Evolves from Growlithe using a Firestone!"
} */
/* [
    {
        "creation_date": "2021-08-07",
        "comment": "Evolves from Growlithe using a Firestone!",
        "username": "Carlos"
    }
] */
const involvementAPIBaseURI = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/M3HgMCFCS5htQufJBVSC';
const commentsBaseURI = `${involvementAPIBaseURI}/comments`;
const likesBaseURI = `${involvementAPIBaseURI}/likes`;

const getLocalLikes = () => JSON.parse(localStorage.getItem('localLikes')) || [];

const saveLocalLike = (pokemon) => {
  let localLikes = getLocalLikes().concat(pokemon);
  localStorage.setItem('localLikes', JSON.stringify(localLikes));
};

const fetchLikes = async () => fetch(likesBaseURI).then((response) => response.json());

const like = async (pokemon) => {
  const result = await fetch(likesBaseURI, {
    method: 'POST',
    body: JSON.stringify({
      item_id: pokemon,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then((response) => response.text());

  const created = (result === 'Created');
  if(created) {
    saveLocalLike(pokemon);
  }

  return created;
};

const fetchComments = async (pokemon) => fetch(`${commentsBaseURI}?item_id=${pokemon}`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    return [];
  });

const addComment = async (pokemon, username, comment) => {
  const result = await fetch(commentsBaseURI, {
    method: 'POST',
    body: JSON.stringify({
      item_id: pokemon,
      username,
      comment,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.text());

  return (result === 'Created');
};

const fetchSinglePokemon = async (pokemon) => fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then((response) => response.json());

const fetchPokemon = async () => {
  const fetchAll = pokedex.map(async (pokemon) => fetchSinglePokemon(pokemon));

  const result = (await Promise.all(fetchAll)).map((pkmn) => ({
    name: pkmn.name,
    image_url: pkmn.sprites.other['official-artwork'].front_default,
  }));

  return result;
};

const fetchItems = async () => {
  let items = [];

  const pkmnData = await fetchPokemon();
  pkmnData.forEach((pkmn) => {
    let pkmnName = pkmn.name;
    pkmnName = pkmnName.charAt(0).toUpperCase() + pkmnName.slice(1);

    items = items.concat({
      pokemon: pkmnName,
      image_url: pkmn.image_url,
      comments: [],
      likes: 0,
      liked: false,
    });
  });

  const localLikes = getLocalLikes();
  localLikes.forEach((pokemon) => {
    for (const i in items) { /* eslint-disable-line */
      if (items[i].pokemon === pokemon) {
        items[i].liked = true;
        break;
      }
    }
  })

  const likes = await fetchLikes();
  likes.forEach((likedItem) => {
    for (const i in items) { /* eslint-disable-line */
      if (items[i].pokemon === likedItem.item_id) {
        items[i].likes = likedItem.likes;
        break;
      }
    }
  });

  for (const i in items) { /* eslint-disable-line */
    items[i].comments = await fetchComments(items[i].pokemon);
  }

  return items;
};

export {
  like,
  fetchItems
};