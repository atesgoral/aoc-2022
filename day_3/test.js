import test from 'node:test';
import assert from 'node:assert/strict';

import {arrayIntersect, heredoc, lines, loadInput, splitAt, add, chunk} from '../utils.js';

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
      const comps = splitAt(line, line.length >> 1)
        .map((s) => [...s]);
      const common = arrayIntersect(...comps)[0];
      return common ? priorityOf(common) : 0;
    })
    .reduce(add);

const part2 = (i) =>
  chunk(lines(i).map((s) => [...s]), 3)
    .reduce(
      (intersections, rucksacks) => [...intersections, arrayIntersect(...rucksacks)],
      []
    )
    .map((intersection) => priorityOf(intersection[0]))
    .reduce(add);

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
  assert.strictEqual(output2, 70);
});

test('official', () => {
  const input = loadInput(import.meta);
  const output1 = part1(input);
  const output2 = part2(input);

  assert.strictEqual(output1, 7568);
  assert.strictEqual(output2, 2780);
});
