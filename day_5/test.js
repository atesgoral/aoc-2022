import test from 'node:test';
import assert from 'node:assert/strict';

import {heredoc, loadInput, lines} from '../utils.js';

function parseLines(lines) {
  const stackLabelsIdx = lines.findIndex((line) => /^ 1/.test(line));
  const stackCount = lines[stackLabelsIdx].split(/\s+/).length - 1;
  const stacks = [];
  const moves = [];

  for (let stackIdx = 0; stackIdx < stackCount; stackIdx++) {
    const stack = [];

    for (let row = stackLabelsIdx; row--;) {
      const crate = lines[row][stackIdx * 4 + 1];

      if (crate && crate !== ' ') {
        stack.push(crate);
      }
    }

    stacks.push(stack);
  }

  for (let moveIdx = stackLabelsIdx + 2; moveIdx < lines.length; moveIdx++) {
    const [_, count, from, to] = lines[moveIdx].split(/\D+/).map(Number);
    moves.push({count, from, to});
  }

  return {stacks, moves};
}

const part1 = (i) => {
  const {stacks, moves} = parseLines(lines(i));

  for (const {count, from, to} of moves) {
    for (let i = 0; i < count; i++) {
      stacks[to - 1].push(stacks[from - 1].pop());
    }
  }

  return stacks
    .map((stack) => stack.at(-1))
    .join('');
}

const part2 = (i) => {
  const {stacks, moves} = parseLines(lines(i));

  for (const {count, from, to} of moves) {
    stacks[to - 1].push(...stacks[from - 1].splice(-count, count));
  }

  return stacks
    .map((stack) => stack.at(-1))
    .join('');
}

test('dev', () => {
  const input = heredoc`
        [D]
    [N] [C]
    [Z] [M] [P]
     1   2   3

    move 1 from 2 to 1
    move 3 from 1 to 3
    move 2 from 2 to 1
    move 1 from 1 to 2
  `;
  const output1 = part1(input);
  const output2 = part2(input);

  assert.strictEqual(output1, 'CMZ');
  assert.strictEqual(output2, 'MCD');
});

test('official', () => {
  const input = loadInput(import.meta);
  const output1 = part1(input);
  const output2 = part2(input);

  assert.strictEqual(output1, 'VJSFHWGFT');
  assert.strictEqual(output2, 'LCTQFBVZV');
});
