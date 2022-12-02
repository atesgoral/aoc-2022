import test from 'node:test';
import assert from 'node:assert/strict';

import {heredoc, loadInput} from '../utils.js';

const part1 = (i) =>
Math.max(...(i+0).split`\n\n`.map(e=>eval(e.split`\n`.join`+`)))

const part2 = (i) =>
(i+0).split`\n\n`.map(e=>eval(e.split`\n`.join`+`)).sort((a,b)=>a-b).slice(-3).reduce((a,c)=>a+c)

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
  const output1 = part1(input);
  const output2 = part2(input);

  assert.strictEqual(output1, 42797);
  assert.strictEqual(output2, 84559);
});

test('official', () => {
  const input = loadInput(import.meta);
  const output1 = part1(input);
  const output2 = part2(input);

  assert.strictEqual(output1, 72478);
  assert.strictEqual(output2, 210367);
});
