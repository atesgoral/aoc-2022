import test from 'node:test';
import assert from 'node:assert/strict';

import {heredoc, lines, loadInput, splitAt} from '../utils.js';

function priorityOf(item) {
  const charCode = item.charCodeAt(0);

  if (charCode & 32) {
    return charCode - 96;
  } else {
    return charCode - 38;
  }
}

const part1 = (i) =>
  lines(i)
    .map((line) => {
      const [comp1, comp2] = splitAt(line, line.length / 2)
        .map((compartment) => new Set([...compartment]));
      const common = [...comp1.values()].find((item) => comp2.has(item));
      return common ? priorityOf(common) : 0;
    })
    .reduce((sum, priority) => sum + priority);

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
  // const output2 = part2(input);

  assert.strictEqual(output1, 157);
  // assert.strictEqual(output2, 300);
});

test('official', () => {
  const input = loadInput(import.meta);
  const output1 = part1(input);
  // const output2 = part2(input);

  assert.strictEqual(output1, 7568);
  // assert.strictEqual(output2, 10);
});
