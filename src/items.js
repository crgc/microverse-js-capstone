import fetchPokemon from './api';
import {
  createDivWithClass, createDivWithId, createElement, createElementWithClass, createCommentButton,
} from './util';

const getItems = () => JSON.parse(localStorage.getItem('items'));

const saveItems = (items) => localStorage.setItem('items', JSON.stringify(items));

const loadItems = () => {
  let items = getItems();

  if (!items) {
    const pkmnData = fetchPokemon();
    items = [];

    pkmnData.forEach((pkmn) => {
      const pkmnName = pkmn.name;
      pkmnName = pkmnName.charAt(0).toUpperCase() + pkmnName.slice(1);

      items = items.concat({
        pokemon: pkmnName,
        image_url: pkmn.image_url,
        comments: [],
        likes: 0,
      });
    });

    saveItems(items);
  }

  return items;
};

const display = async () => {
  const itemsContainerElement = document.getElementById('items-container');
  (await loadItems()).forEach((item) => {
    const pkmn = item.pokemon;

    const columnDiv = createDivWithClass('d-flex flex-column');
    const idDiv = createDivWithId(pkmn);
    const imageContDiv = createDivWithClass('image-cont');

    const imgElement = createElement('img');
    imgElement.setAttribute('src', item.image_url);
    imgElement.setAttribute('alt', pkmn);

    const h5Element = createElementWithClass('h5', 'mt-3');
    h5Element.innerHTML = `${pkmn} <span><i class="far fa-heart"></i></span>`;

    const pElement = createElement('p');
    pElement.textContent = `${item.likes} likes`;

    const commentButton = createCommentButton();

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