import test from 'node:test';
import assert from 'node:assert/strict';

import {loadInput} from '../loader.js';

function solution(i) {
  return 42;
}

test('Day 1', () => {
  const input = loadInput(import.meta);
  const output = solution(input);

  assert.strictEqual(output, 42);
});
