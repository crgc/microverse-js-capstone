let defaultDocument = null;

const getDocument = () => (defaultDocument || document);
const setDocument = (doc) => { defaultDocument = doc; };

const getElementById = (id) => getDocument().getElementById(id);
const createElement = (name) => getDocument().createElement(name);
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

const fixed = (number) => Number.parseFloat(number).toFixed(1);

const formatHeight = (height) => {
  const meters = height / 10;
  return `${fixed(meters)} m`;
};

const formatWeight = (weight) => {
  const kgs = weight / 10;
  const lbs = kgs * 2.2;

  return `${fixed(kgs)} kg (${fixed(lbs)} lbs)`;
};

export {
  getElementById,
  createElement,
  createElementWithClass,
  createDivWithClass,
  createDivWithId,
  createCommentButton,
  setDocument,
  formatHeight,
  formatWeight,
};
