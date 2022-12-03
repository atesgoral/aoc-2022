import test from 'node:test';
import assert from 'node:assert/strict';

import {heredoc, loadInput} from '../utils.js';

const part1 = (i) =>
Math.max(...(i+0).split`\n\n`.map(e=>eval(e.split`\n`.join`+`)))

const part2 = (i) =>
(i+0).split`\n\n`.map(e=>eval(e.split`\n`.join`+`)).sort((a,b)=>a-b).slice(-3).reduce((a,c)=>a+c)

test('dev', () => {
  const input = heredoc`
    1000
    2000
    3000

    4000

    5000
    6000

    7000
    8000
    9000

    10000
  `;
  const output1 = part1(input);
  const output2 = part2(input);

  assert.strictEqual(output1, 24000);
  assert.strictEqual(output2, 45000);
});

test('official', () => {
  const input = loadInput(import.meta);
  const output1 = part1(input);
  const output2 = part2(input);

  assert.strictEqual(output1, 72478);
  assert.strictEqual(output2, 210367);
});
