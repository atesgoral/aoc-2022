import test from 'node:test';
import assert from 'node:assert/strict';

function solution(i) {
  return 42;
}

test('Day 1', () => {
  const input = 1;
  const output = solution(input);

  assert.strictEqual(output, 42);
});
