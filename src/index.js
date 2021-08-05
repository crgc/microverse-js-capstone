import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css'; /* eslint-disable-line */
import fetchPokemon from './api.js';
import { commentModal } from './addComment.js';

fetchPokemon();
commentModal();