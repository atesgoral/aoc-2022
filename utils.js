import {fileURLToPath} from 'url';
import {dirname} from 'path';
import {readFileSync} from 'fs';

export function heredoc(s) {
  return s.join('').replace(/^\n/, '').replace(/^    /gm, '');
}

export function loadInput(meta) {
  const filename = `${dirname(fileURLToPath(meta.url))}/input.txt`;
  return readFileSync(filename, {encoding: 'utf-8'});
}

export function lines(input) {
  return input.trimEnd().split('\n');
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

export function rangeCompare(range1, range2) {
  if (range1[1] < range2[0]) {
    return -1;
  } else if (range2[1] < range1[0]) {
    return 1;
  } else {
    return 0;
  }
}

export function rangeEquals(range1, range2) {
  return range1[0] === range2[0] && range1[1] === range2[1];
}

export function rangeOverlap(range1, range2) {
  if (rangeCompare(range1, range2)) {
    return [];
  } else {
    return [Math.max(range1[0], range2[0]), Math.min(range1[1], range2[1])];
  }
}

export function rangeContains(haystack, needle) {
  return rangeEquals(rangeOverlap(haystack, needle), needle);
}
