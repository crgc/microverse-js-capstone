import { v4 as uuidv4 } from 'uuid';
import fetchPokemon from './api.js';
import {
  getElementById, createDivWithClass, createDivWithId,
  createElement, createElementWithClass, createCommentButton, formatDate,
} from './util.js';

let items = null;

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
        id: uuidv4(),
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

const addComment = (event) => {
  event.preventDefault();
  const { parentElement } = event.target;
  const nameInput = parentElement.querySelector('input');
  const commentInput = parentElement.querySelector('textarea');
  const name = nameInput.value;
  const comment = commentInput.value;
  const id = event.target.id.split('add-comment-')[1];

  for (const i in items) { /* eslint-disable-line */
    if (items[i].pokemon === id) {
      const newComment = {
        name: name,
        date: formatDate(new Date()),
        comment: comment
      };
      items[i].comments = items[i].comments.concat(newComment);

      const commentsDiv = getElementById(`comments-${id}`)
      const commentDiv = createDivWithClass('d-flex flex-column mb-1 py-1 border-bottom container');

      const h4Element = createElementWithClass('h4', 'font-medium-1');
      h4Element.textContent = newComment.name;

      const h5Element = createElementWithClass('h5', 'font-small-2');
      h5Element.textContent = newComment.date;

      const pElement = createElementWithClass('p', 'font-small-3');
      pElement.textContent = newComment.comment;

      commentDiv.appendChild(h4Element);
      commentDiv.appendChild(h5Element);
      commentDiv.appendChild(pElement);

      commentsDiv.appendChild(commentDiv);

      const commentsCounter = getElementById(`comments-counter-${id}`);
      commentsCounter.textContent = `Comments (${items[i].comments.length})`;

      saveItems(items);

      break;
    }
  }
  
  nameInput.value = '';
  commentInput.value = '';
};

const displayItems = async () => {
  items = items || await loadItems();
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

    const commentModal = createDivWithClass('modal');
    commentModal.innerHTML = `           
      <div class="modal-content">
        <span class="close">&times;</span>
        <img src="${item.image_url}" class="w-25 container border border-dark mb-3"></img>
        <h3 class="text-center mb-3">${pkmn}</h3>
        <h3 id="comments-counter-${pkmn}" class="text-center mb-3 commentsection">Comments (${item.comments.length})</h3>
        <div id="comments-${pkmn}">
          ${item.comments.map((comment) => `
            <div class="d-flex flex-column mb-1 py-1 border-bottom container">
              <h4 class="font-medium-1">${comment.name}<h4/>
              <h5 class="font-small-2">${comment.date}</h5>
              <p class="font-small-3">${comment.comment}</p>
            </div>`)}
        </div>
        <forms class="form-group w-50 container" id="comment-form">
          <h6 class="text-center mb-3">Add a comment</h6>
          <input type="text" placeholder="Your name" class="form-control mb-3" id="name-field">
          <textarea placeholder="Your insights" class="form-control mb-3" id="insightfield"></textarea>
          <button id="add-comment-${pkmn}">Comment</button>
        </form>
      </div>`;
    commentModal.querySelector('#comment-form').dataset.itemId = item.id;
    commentModal.querySelector(`#add-comment-${pkmn}`).addEventListener('click', addComment);  

    columnDiv.appendChild(commentModal);

    const commentButton = createCommentButton();
    commentButton.addEventListener('click', () => {
      commentModal.style.display = 'block';
    });

    const span = commentModal.querySelector('.close');
    span.addEventListener('click', () => {
      commentModal.style.display = 'none';
    });

    window.onclick = (event) => {
      if (event.target === commentModal) {
        commentModal.style.display = 'none';
      }
    };

    imageContDiv.appendChild(imgElement);

    idDiv.appendChild(imageContDiv);
    idDiv.appendChild(h5Element);
    idDiv.appendChild(pElement);
    idDiv.appendChild(commentButton);

    columnDiv.appendChild(idDiv);

    itemsContainerElement.appendChild(columnDiv);
  });
};

const display = (_items_) => {
  if (_items_) {
    items = _items_;
  }

  displayItems();
};

export {
  getItems,
  display,
};