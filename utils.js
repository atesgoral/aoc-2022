import {fileURLToPath} from 'url';
import {dirname} from 'path';
import {readFileSync} from 'fs';

export function heredoc(s) {
  return s.join('').replace(/^\n/, '').replace(/  /g, '');
}

export function loadInput(meta) {
  const filename = `${dirname(fileURLToPath(meta.url))}/input.txt`;
  return readFileSync(filename, {encoding: 'utf-8'});
}

export function lines(input) {
  return input.trim().split('\n');
}

export function splitAt(s, idx) {
  return [s.slice(0, idx), s.slice(idx)];
}

export function chunk(array, size) {
  const chunks = [];

  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }

  return chunks;
}

export function add(a, b) {
  return a + b;
}

export function arrayIntersect(...arrays) {
  return arrays.reduce(
    (intersection, array) =>
      intersection.filter((value) => array.includes(value))
	);
}
