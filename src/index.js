import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css'; /* eslint-disable-line */
import { display } from './items.js';
import fetchItems from './api';

/* display(); */
fetchItems().then((items) => console.log(items));