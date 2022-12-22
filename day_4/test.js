import test from 'node:test';
import assert from 'node:assert/strict';

import {heredoc, lines, loadInput, rangeContains, rangeOverlap} from '../utils.js';

const part1 = (i) =>
  lines(i)
    .map(
      (line) =>
        line.split(',')
          .map((range) =>
            range.split('-')
              .map(Number)
          )
    )
    .filter(([range1, range2]) =>
      rangeContains(range1, range2) || rangeContains(range2, range1)
    )
    .length;

const part2 = (i) =>
  lines(i)
    .map(
      (line) =>
        line.split(',')
          .map((range) =>
            range.split('-')
              .map(Number)
          )
    )
    .filter(([range1, range2]) => rangeOverlap(range1, range2).length)
    .length;

test('dev', () => {
  const input = heredoc`
    2-4,6-8
    2-3,4-5
    5-7,7-9
    2-8,3-7
    6-6,4-6
    2-6,4-8
  `;
  const output1 = part1(input);
  const output2 = part2(input);

  assert.strictEqual(output1, 2);
  assert.strictEqual(output2, 4);
});

test('official', () => {
  const input = loadInput(import.meta);
  const output1 = part1(input);
  const output2 = part2(input);

  assert.strictEqual(output1, 571);
  assert.strictEqual(output2, 917);
});
