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

export {
  getElementById,
  createElement,
  createElementWithClass,
  createDivWithClass,
  createDivWithId,
  createCommentButton,
  setDocument,
};
