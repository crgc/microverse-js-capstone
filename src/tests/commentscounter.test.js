/**
 * @jest-environment jsdom
 */

import { beforeEach } from '@jest/globals';
import jsdom from 'jsdom';
import iconv from 'iconv-lite';
import encodings from 'iconv-lite/encodings'; /* eslint-disable-line */
import { display } from '../items.js';
import { setDocument, getElementById } from '../util.js';

iconv.encodings = encodings;

describe('Items counter', () => {
  const items = [
    {
      pokemon: 'Pikachu',
      image_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/254.png',
      comments: [],
      likes: 5,
      liked: true,
    }
  ];

  beforeEach(async () => {
    const { JSDOM } = jsdom;
    const filename = __dirname.substring(0, __dirname.length - 'tests'.length).concat('index.html');
    const doc = await JSDOM.fromFile(filename, {}).then((dom) => dom.window.document);

    setDocument(doc);
  });

  test('Comments counter and Comments array length should be equal', () => {
    display(items);

    const item = items[0];
    const commentsArrSize = item.comments.length;
    const commentsCounter = getElementById(`comments-${item.pokemon}`);
    
    const commentsCount = commentsCounter.textContent
      .substring('Comments ('.length)
      .substring(0, 1);

    expect(parseInt(commentsCount, 10)).toBe(commentsArrSize);
  });
});