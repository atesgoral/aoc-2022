import test from 'node:test';
import assert from 'node:assert/strict';

import {heredoc, loadInput} from '../utils.js';

function parseMonkeys(input) {
  const monkeyRe = new RegExp(heredoc`
    Monkey (\\d+):
      Starting items: ([\\d, ]+)
      Operation: new = (old [*+] (?:old|\\d+))
      Test: divisible by (\\d+)
        If true: throw to monkey (\\d+)
        If false: throw to monkey (\\d+)
  `, 'gm');

  const monkeys = {};

  while (true) {
    const matches = monkeyRe.exec(input);

    if (!matches) {
      break;
    }

    const [_, id, itemsStr, exprStr, testStr, passId, failId] = matches;

    const monkey = {
      items: itemsStr.split(', ').map(Number),
      operation: new Function('old', `return ${exprStr};`),
      test: Number(testStr),
      passId,
      failId,
      inspectionCount: 0,
    };

    monkeys[id] = monkey;
  }

  return monkeys;
}

function playRound(monkeys) {
  for (const monkey of Object.values(monkeys)) {
    const {items, operation, test, passId, failId} = monkey;

    while (items.length) {
      const worry = items.shift();

      monkey.inspectionCount++;

      const newWorry = operation(worry) / 3 | 0;
      const targetId = newWorry % test === 0 ? passId : failId;

      monkeys[targetId].items.push(newWorry);
    }
  }
}

const part1 = (input) => {
  const monkeys = parseMonkeys(input);

  for (let round = 0; round < 20; round++) {
    playRound(monkeys);
  }

  const mostInspections = Object.values(monkeys)
    .map(({inspectionCount}) => inspectionCount)
    .sort((a, b) => b - a)
    .slice(0, 2);

  return mostInspections.reduce(Math.imul);
}

const part2 = (i) =>
i.length*2

test('dev', () => {
  const input = heredoc`
    Monkey 0:
      Starting items: 79, 98
      Operation: new = old * 19
      Test: divisible by 23
        If true: throw to monkey 2
        If false: throw to monkey 3

    Monkey 1:
      Starting items: 54, 65, 75, 74
      Operation: new = old + 6
      Test: divisible by 19
        If true: throw to monkey 2
        If false: throw to monkey 0

    Monkey 2:
      Starting items: 79, 60, 97
      Operation: new = old * old
      Test: divisible by 13
        If true: throw to monkey 1
        If false: throw to monkey 3

    Monkey 3:
      Starting items: 74
      Operation: new = old + 3
      Test: divisible by 17
        If true: throw to monkey 0
        If false: throw to monkey 1
  `;
  const output1 = part1(input);
  // const output2 = part2(input);

  assert.strictEqual(output1, 10605);
  // assert.strictEqual(output2, 8);
});

test('official', () => {
  const input = loadInput(import.meta);
  const output1 = part1(input);
  // const output2 = part2(input);

  assert.strictEqual(output1, 110885);
  // assert.strictEqual(output2, 10);
});
