import test from 'node:test';
import assert from 'node:assert/strict';

import {heredoc, loadInput} from '../loader.js';

const solution = (i) =>
Math.max(...i.split`\n\n`.map(e=>e.split`\n`.map(Number).reduce((a,c)=>a+c)))

test('dev', () => {
  const input = heredoc`
    2003
    5358
    1410
    5380

    3094
    11126
    10227
    7659
    2491
    8200

    14804
    12807
  `;
  const output = solution(input);

  assert.strictEqual(output, 42797);
});

test('official', () => {
  const input = loadInput(import.meta);
  const output = solution(input);

  assert.strictEqual(output, 72478);
});
