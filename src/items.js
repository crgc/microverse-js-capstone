import fetchPokemon from './api.js';
import {
  getElementById, createDivWithClass, createDivWithId,
  createElement, createElementWithClass, createCommentButton,
} from './util.js';

let items = [];

const getItems = () => JSON.parse(localStorage.getItem('items'));

const saveItems = (items) => localStorage.setItem('items', JSON.stringify(items));

const loadItems = async () => {
  items = getItems();

  if (!items) {
    const pkmnData = await fetchPokemon();
    items = [];

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

    saveItems(items);
  }

  return items;
};

const getLikeClassName = (item) => (item.liked ? 'fas fa-heart red' : 'far fa-heart');

const createHeartElement = (item) => {
  const heartElement = createElementWithClass('i', getLikeClassName(item));
  heartElement.addEventListener('click', () => {
    for (const i in items) { /* eslint-disable-line */
      if (items[i].pokemon === item.pokemon) {
        if (items[i].liked) {
          items[i].likes -= 1;
        } else {
          items[i].likes += 1;
        }

        items[i].liked = !items[i].liked;

        const likesElement = getElementById(`likes-${item.pokemon}`);
        likesElement.textContent = `${items[i].likes} likes`;

        heartElement.className = getLikeClassName(items[i]);

        saveItems(items);

        break;
      }
    }
  });

  return heartElement;
};

const display = async () => {
  const items = await loadItems();
  const itemsContainerElement = getElementById('items-container');

  const itemsCounterElement = getElementById('items-counter');
  itemsCounterElement.textContent = `Pokémon (${items.length})`;

  items.forEach((item) => {
    const pkmn = item.pokemon;

    const columnDiv = createDivWithClass('d-flex flex-column');
    const idDiv = createDivWithId(pkmn);
    const imageContDiv = createDivWithClass('image-cont');
    const imgElement = createElement('img');
    imgElement.setAttribute('src', item.image_url);
    imgElement.setAttribute('alt', pkmn);

    const h5Element = createElementWithClass('h5', 'mt-3');
    h5Element.textContent = `${pkmn} `;

    const spanElement = createElement('span');
    const heartElement = createHeartElement(item);

    spanElement.appendChild(heartElement);
    h5Element.appendChild(spanElement);

    const pElement = createElement('p');
    pElement.id = `likes-${pkmn}`;
    pElement.textContent = `${item.likes} likes`;

    const commentButton = createCommentButton();
    commentButton.addEventListener('click', () => {
      
    })

    imageContDiv.appendChild(imgElement);

    idDiv.appendChild(imageContDiv);
    idDiv.appendChild(h5Element);
    idDiv.appendChild(pElement);
    idDiv.appendChild(commentButton);

    columnDiv.appendChild(idDiv);

    itemsContainerElement.appendChild(columnDiv);
  });
};

export default display;