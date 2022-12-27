import test from 'node:test';
import assert from 'node:assert/strict';

import {heredoc, loadInput, cells, hscanCells, vscanCells, scanCells} from '../utils.js';

function hHeights(trees, x, y, dir) {
  return [...hscanCells(trees, x, y, dir)].map(({cell: height}) => height);
}

function vHeights(trees, x, y, dir) {
  return [...vscanCells(trees, x, y, dir)].map(({cell: height}) => height);
}

function isOccluded(value, others) {
  return others.length && Math.max(...others) >= value;
}

function countVisible(trees) {
  let cnt = 0;

  for (const {cell: height, x, y} of scanCells(trees)) {
    if (
      !isOccluded(height, hHeights(trees, x, y, -1))
      || !isOccluded(height, hHeights(trees, x, y, 1))
      || !isOccluded(height, vHeights(trees, x, y, -1))
      || !isOccluded(height, vHeights(trees, x, y, 1))
    ) {
      cnt++;
    }
  }

  return cnt;
}

const part1 = (input) => {
  const trees = cells(input, Number);
  return countVisible(trees);
}

const part2 = (i) =>
i.length*2

test('dev', () => {
  const input = heredoc`
    30373
    25512
    65332
    33549
    35390
  `;
  const output1 = part1(input);
  // const output2 = part2(input);

  assert.strictEqual(output1, 21);
  // assert.strictEqual(output2, 8);
});

test('official', () => {
  const input = loadInput(import.meta);
  const output1 = part1(input);
  // const output2 = part2(input);

  assert.strictEqual(output1, 1782);
  // assert.strictEqual(output2, 10);
});
