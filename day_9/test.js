import test from 'node:test';
import assert from 'node:assert/strict';

import {heredoc, loadInput, lines, vecAdd, vecSub, vecMag, vecToStr} from '../utils.js';

// function print() {
//   const map = Array(5).fill().map((_) => Array(6).fill('.'));
//   map[4 - tail.y][tail.x] = 'T';
//   map[4 - head.y][head.x] = 'H';
//   const output = map.map((row) => row.join('')).join('\n');
//   console.log(`\n${output}\n`);
// }

// function vecFromStr(str) {
//   const [_, x, y] = /^\((\d+),(\d+)\)$/.exec(str).map(Number);
//   return {x, y};
// }

const DIRECTIONS = {
  R: {x: 1, y: 0},
  U: {x: 0, y: 1},
  L: {x: -1, y: 0},
  D: {x: 0, y: -1},
};

function parseMotion(line) {
  const [dir, count] = line.split(' ');
  const vec = DIRECTIONS[dir];
  return {vec, count};
}

const part1 = (input) => {
  const motions = lines(input).map(parseMotion);
  const visits = new Set();

  let head = {x: 0, y: 0};
  let tail = {x: 0, y: 0};

  for (const {vec, count} of motions) {
    for (let i = 0; i < count; i++) {
      const prevHead = head;
      const prevDist = vecMag(vecSub(head, tail));

      head = vecAdd(head, vec);

      const dist = vecMag(vecSub(head, tail));

      if (dist !== Math.SQRT2 && dist > prevDist) {
        tail = prevHead;
      }

      visits.add(vecToStr(tail));
    }
  }

  return visits.size;
}

const part2 = (i) =>
i.length*2

test('dev', () => {
  const input = heredoc`
    R 4
    U 4
    L 3
    D 1
    R 4
    D 1
    L 5
    R 2
  `;
  const output1 = part1(input);
  // const output2 = part2(input);

  assert.strictEqual(output1, 13);
  // assert.strictEqual(output2, 8);
});

test('official', () => {
  const input = loadInput(import.meta);
  const output1 = part1(input);
  // const output2 = part2(input);

  assert.strictEqual(output1, 6098);
  // assert.strictEqual(output2, 10);
});
