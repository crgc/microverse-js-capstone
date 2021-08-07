import { like, postComment, fetchItems } from './api.js';
import {
  getElementById, createDivWithClass, createDivWithId,
  createElement, createElementWithClass, createCommentButton,
} from './util.js';

let items = null;

const getLikeClassName = (item) => (item.liked ? 'fas fa-heart red' : 'far fa-heart like');

const createHeartElement = (item) => {
  const heartElement = createElementWithClass('i', getLikeClassName(item));
  heartElement.addEventListener('click', async () => {
    for (const i in items) { /* eslint-disable-line */
      const pkmn = item.pokemon;

      if (items[i].pokemon === pkmn) {
        if (!items[i].liked) {
          like(pkmn).then((liked) => { /* eslint-disable-line no-loop-func */
            if (liked) {
              items[i].liked = true;
              items[i].likes += 1;

              const likesElement = getElementById(`likes-${pkmn}`);
              likesElement.textContent = `${items[i].likes} likes`;
              heartElement.className = 'fas fa-heart red';
            }
          });
        }

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
  const username = nameInput.value;
  const comment = commentInput.value;
  const id = event.target.id.split('add-comment-')[1];

  if ((username === null || username.length === 0)
      || (comment === null || comment.length === 0)) {
    return;
  }

  const formatDate = (date) => date.toISOString().split('T')[0];

  for (const i in items) { /* eslint-disable-line */
    const { pokemon } = items[i];

    if (pokemon === id) {
      postComment(pokemon, username, comment)
        .then((created) => { /* eslint-disable-line no-loop-func */
          if (created) {
            const newComment = {
              username,
              comment,
              creation_date: formatDate(new Date()),
            };
            items[i].comments = items[i].comments.concat(newComment);

            const commentsDiv = getElementById(`comments-${id}`);
            const commentDiv = createDivWithClass('d-flex flex-column mb-1 py-1 border-bottom container');

            const h4Element = createElementWithClass('h4', 'font-medium-1');
            h4Element.textContent = newComment.username;

            const h5Element = createElementWithClass('h5', 'font-small-2');
            h5Element.textContent = newComment.creation_date;

            const pElement = createElementWithClass('p', 'font-small-3');
            pElement.textContent = newComment.comment;

            commentDiv.appendChild(h4Element);
            commentDiv.appendChild(h5Element);
            commentDiv.appendChild(pElement);

            commentsDiv.appendChild(commentDiv);

            const commentsCounter = getElementById(`comments-counter-${id}`);
            commentsCounter.textContent = `Comments (${items[i].comments.length})`;
          }
        });

      break;
    }
  }

  nameInput.value = '';
  commentInput.value = '';
};

const displayItems = async () => {
  items = items || await fetchItems();
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
              <h4 class="font-medium-1">${comment.username}<h4/>
              <h5 class="font-small-2">${comment.creation_date}</h5>
              <p class="font-small-3">${comment.comment}</p>
            </div>`)}
        </div>
        <forms class="form-group w-50 container" id="comment-form">
          <h6 class="text-center mb-3">Add a comment</h6>
          <input type="text" placeholder="Your name" class="form-control mb-3">
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

export default display;