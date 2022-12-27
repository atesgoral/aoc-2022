import test from 'node:test';
import assert from 'node:assert/strict';

import {heredoc, loadInput, lines} from '../utils.js';

function parseInstruction(line) {
  const [opcode, operand] = line.split(' ');
  return {opcode, operand: Number(operand)};
}

class CPU {
  clockCycle = 0;
  x = 1;

  constructor(onTick) {
    this.onTick = onTick;
  }

  tick() {
    this.clockCycle++;
    this.onTick(this);
  }

  execute({opcode, operand}) {
    switch (opcode) {
      case 'noop':
        this.tick();
        break;
      case 'addx':
        this.tick();
        this.tick();
        this.x += operand;
        break;
    }
  }
}

const part1 = (input) => {
  const instructions = lines(input).map(parseInstruction);
  const signalStrengths = [];
  const cpu = new CPU(({clockCycle, x}) => {
    const offset = clockCycle - 20;

    if (offset % 40 === 0 && offset / 40 | 0 < 6) {
      signalStrengths.push(clockCycle * x);
    }
  });

  for (const instruction of instructions) {
    cpu.execute(instruction);
  }

  return signalStrengths.reduce((sum, strength) => sum + strength);
}

const part2 = (i) =>
i.length*2

test('dev', () => {
  const input = heredoc`
    addx 15
    addx -11
    addx 6
    addx -3
    addx 5
    addx -1
    addx -8
    addx 13
    addx 4
    noop
    addx -1
    addx 5
    addx -1
    addx 5
    addx -1
    addx 5
    addx -1
    addx 5
    addx -1
    addx -35
    addx 1
    addx 24
    addx -19
    addx 1
    addx 16
    addx -11
    noop
    noop
    addx 21
    addx -15
    noop
    noop
    addx -3
    addx 9
    addx 1
    addx -3
    addx 8
    addx 1
    addx 5
    noop
    noop
    noop
    noop
    noop
    addx -36
    noop
    addx 1
    addx 7
    noop
    noop
    noop
    addx 2
    addx 6
    noop
    noop
    noop
    noop
    noop
    addx 1
    noop
    noop
    addx 7
    addx 1
    noop
    addx -13
    addx 13
    addx 7
    noop
    addx 1
    addx -33
    noop
    noop
    noop
    addx 2
    noop
    noop
    noop
    addx 8
    noop
    addx -1
    addx 2
    addx 1
    noop
    addx 17
    addx -9
    addx 1
    addx 1
    addx -3
    addx 11
    noop
    noop
    addx 1
    noop
    addx 1
    noop
    noop
    addx -13
    addx -19
    addx 1
    addx 3
    addx 26
    addx -30
    addx 12
    addx -1
    addx 3
    addx 1
    noop
    noop
    noop
    addx -9
    addx 18
    addx 1
    addx 2
    noop
    noop
    addx 9
    noop
    noop
    noop
    addx -1
    addx 2
    addx -37
    addx 1
    addx 3
    noop
    addx 15
    addx -21
    addx 22
    addx -6
    addx 1
    noop
    addx 2
    addx 1
    noop
    addx -10
    noop
    noop
    addx 20
    addx 1
    addx 2
    addx 2
    addx -6
    addx -11
    noop
    noop
    noop
  `;
  const output1 = part1(input);
  // const output2 = part2(input);

  assert.strictEqual(output1, 13140);
  // assert.strictEqual(output2, 8);
});

test('official', () => {
  const input = loadInput(import.meta);
  const output1 = part1(input);
  // const output2 = part2(input);

  assert.strictEqual(output1, 13820);
  // assert.strictEqual(output2, 10);
});
