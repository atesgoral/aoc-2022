import test from 'node:test';
import assert from 'node:assert/strict';

import {heredoc, loadInput} from '../utils.js';

// Predefine vars to overcome strict mode
let b, l, m;

const part1 = (i) =>
// i.split`\n`.map(
//   k=>Math.log2(
//     Number(
//       (
//         m=(k,c)=>[...k.substring(b=(l=k.length/2)*c,b+l)]
//           .map(c=>c.charCodeAt()^64)
//           .map(c=>(c^32)-(c>>5^1)*6-1)
//           .reduce((n,b)=>n|1n<<BigInt(b),0n)
//       )(k,0)
//       &
//       m(k,1)))+1|0).reduce((a,b)=>a+b)
i.split`\n`.map(k=>Math.log2(Number((m=(k,c)=>[...k.substring(b=(l=k.length/2)*c,b+l)].map(c=>c.charCodeAt()^64).map(c=>(c^32)-(c>>5^1)*6-1).reduce((n,b)=>n|1n<<BigInt(b),0n))(k,0)&m(k,1)))+1|0).reduce((a,b)=>a+b)

const part2 = (i) =>
i.split`\n`.map(
  k=>[...k]
    .map(c=>c.charCodeAt()^64)
    .map(c=>(c^32)-(c>>5^1)*6-1)
    .reduce((n,b)=>n|1n<<BigInt(b),0n)
).reduce((a,k,i)=>{
  if (!i%3) {
    a.s+=Math.log2(Number(a.b)+1)
    a.b=0n
  }
  a.b&=k
  return a
},{s:0,b:0n})

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
  assert.strictEqual(output2, 300);
});

test('official', () => {
  const input = loadInput(import.meta);
  const output1 = part1(input);
  const output2 = part2(input);

  assert.strictEqual(output1, 7568);
  assert.strictEqual(output2, 10);
});
