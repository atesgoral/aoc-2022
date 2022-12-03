import test from 'node:test';
import assert from 'node:assert/strict';

import {heredoc, loadInput} from '../utils.js';

const part1 = (i) =>
i.split`\n`.map(p=>p.split` `.map(c=>parseInt(c,36)%10)).map(([t,u])=>(u-t+4)%3*3+u-2|0).reduce((s,n)=>s+n)

const part2 = (i) =>
i.split`\n`.map(p=>p.split` `.map(c=>parseInt(c,36)%10)).map(([t,o])=>(o-3)*3+(o+t+2)%3+1|0).reduce((s,n)=>s+n)

test('dev', () => {
  const input = heredoc`
    A Y
    B X
    C Z
  `;
  const output1 = part1(input);
  const output2 = part2(input);

  assert.strictEqual(output1, 15);
  assert.strictEqual(output2, 12);
});

test('official', () => {
  const input = loadInput(import.meta);
  const output1 = part1(input);
  const output2 = part2(input);

  assert.strictEqual(output1, 12535);
  assert.strictEqual(output2, 15457);
});

