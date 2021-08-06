/**
 * @jest-environment jsdom
 */

import { beforeEach } from '@jest/globals';
import { display } from '../items.js';
import { setDocument, getElementById } from '../util.js';

import iconv from 'iconv-lite';
import encodings from 'iconv-lite/encodings';
iconv.encodings = encodings;

describe('Items counter', () => {
  const items = [
    {
      pokemon: 'Pikachu',
      image_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/254.png',
      comments: [],
      likes: 5,
      liked: true,
    },
    {
      pokemon: 'Arcanine',
      image_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/254.png',
      comments: [],
      likes: 1,
      liked: false,
    }
  ];

  beforeEach(async () => {
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;

    const filename = __dirname.substring(0, __dirname.length - 'tests'.length)
                              .concat('index.html');
    const doc = await JSDOM.fromFile(filename, {}).then(dom => { return dom.window.document; });
    setDocument(doc);
  });

  test('Items counter and Items array length should be equal', () => {
    display(items);

    const itemsArrSize = items.length;
    const itemsCounter = getElementById('items-counter');
    const itemsCount = itemsCounter.textContent
                                   .substring('Pokémon ('.length)
                                   .substring(0, 1);

    expect(parseInt(itemsCount)).toBe(itemsArrSize);
  });
});