const getElementById = (id) => document.getElementById(id);
const createElement = (name) => document.createElement(name);
const createDiv = () => createElement('div');

const createElementWithClass = (name, clazz) => {
  const element = createElement(name);
  element.className = clazz;

  return element;
};

const createDivWithClass = (clazz) => createElementWithClass('div', clazz);

const createDivWithId = (id) => {
  const element = createDiv();
  element.id = id;

  return element;
};

const createCommentButton = () => {
  const commentButton = createElementWithClass('button', 'mb-3');
  commentButton.setAttribute('type', 'button');
  commentButton.textContent = 'Comment';

  return commentButton;
};

export {
  getElementById,
  createElement,
  createElementWithClass,
  createDivWithClass,
  createDivWithId,
  createCommentButton,
};

export const formatDate = (timestamp) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const formatter = new Intl.DateTimeFormat('en-NG', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour12: true,
  }).format(date);
  return formatter;
};
