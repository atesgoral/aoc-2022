import test from 'node:test';
import assert from 'node:assert/strict';

import {heredoc, loadInput} from '../utils.js';

const part1 = (i) =>
i.length

const part2 = (i) =>
i.length*2

test('dev', () => {
  const input = heredoc`
    vJrwpWtwJgWrhcsFMMfFFhFp
    jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
    PmmdzqPrVvPwwTWBwg
    wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
    ttgJtRGJQctTZtZT
    CrZsJsPPZsGzwwsLwLmpwMDw
  `;
  const output1 = part1(input);
  const output2 = part2(input);

  assert.strictEqual(output1, 157);
  assert.strictEqual(output2, 8);
});

test('official', () => {
  const input = loadInput(import.meta);
  const output1 = part1(input);
  const output2 = part2(input);

  assert.strictEqual(output1, 5);
  assert.strictEqual(output2, 10);
});
