import test from 'node:test';
import assert from 'node:assert/strict';

import {loadInput} from '../utils.js';

function unique(s, len) {
  for (let i = 0; i < len - 1; i++) {
    if (s.includes(s.charAt(i), i + 1)) {
      return false;
    }
  }

  return true;
}

function marker(input, len) {
  for (let idx = len; idx < input.length; idx++) {
    if (unique(input.slice(idx - len, idx), len)) {
      return idx;
    }
  }

  return -1;
}

const part1 = (i) => marker(i, 4);
const part2 = (i) => marker(i, 14);

test('dev', () => {
  const inputs = [
    {input: 'mjqjpqmgbljsphdztnvjfqwrcgsmlb', expected1: 7, expected2: 19},
    {input: 'bvwbjplbgvbhsrlpgdmjqwftvncz', expected1: 5, expected2: 23},
    {input: 'nppdvjthqldpwncqszvftbrmjlhg', expected1: 6, expected2: 23},
    {input: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', expected1: 10, expected2: 29},
    {input: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', expected1: 11, expected2: 26},
  ];

  for (let {input, expected1, expected2} of inputs) {
    const output1 = part1(input);
    const output2 = part2(input);

    assert.strictEqual(output1, expected1);
    assert.strictEqual(output2, expected2);
  }
});

test('official', () => {
  const input = loadInput(import.meta);
  const output1 = part1(input);
  const output2 = part2(input);

  assert.strictEqual(output1, 1850);
  assert.strictEqual(output2, 10);
});
