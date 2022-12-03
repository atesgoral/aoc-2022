import test from 'node:test';
import assert from 'node:assert/strict';

import {heredoc, loadInput} from '../utils.js';

const solution = (i) =>
i.split`\n`.map(p=>p.split` `.map(c=>parseInt(c,36)%10)).map(([t,u])=>(u-t+4)%3*3+u-2|0).reduce((s,n)=>s+n)

test('dev', () => {
  const input = heredoc`
    A Y
    B X
    C Z
  `;
  const output = solution(input);

  assert.strictEqual(output, 15);
});

test('official', () => {
  const input = loadInput(import.meta);
  const output = solution(input);

  assert.strictEqual(output, 12535);
});

