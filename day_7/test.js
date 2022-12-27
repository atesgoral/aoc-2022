import test from 'node:test';
import assert from 'node:assert/strict';

import {heredoc, loadInput, lines} from '../utils.js';

function parseCmd(s) {
  const [cmd, arg] = s.split(' ');

  return {
    cmd,
    arg,
    output: [],
  };
}

function parse(s) {
  const cmds = [];
  let cmd = null;

  lines(s).forEach((line) => {
    if (line.startsWith('$ ')) {
      if (cmd) {
        cmds.push(cmd);
      }
      cmd = parseCmd(line.slice(2));
    } else {
      cmd.output.push(line);
    }
  });

  if (cmd) {
    cmds.push(cmd);
  }

  return cmds;
}

function parseChild(cwd, line) {
  const [attr, name] = line.split(' ');
  return attr === 'dir'
    ? {dir: true, name, parent: cwd}
    : {size: parseInt(attr, 10), name};
}

function replay(cmds) {
  const root = {dir: true};
  let cwd = null;

  cmds.forEach(({cmd, arg, output}) => {
    switch (cmd) {
      case 'cd':
        switch (arg) {
          case '/':
            cwd = root;
            break;
          case '..':
            cwd = cwd.parent;
            break;
          default:
            cwd = cwd.children.find((child) => child.dir && child.name === arg);
            break;
        }
        break;
      case 'ls':
        cwd.children = output.map((line) => parseChild(cwd, line));
        break;
    }
  });

  return root;
}

function totalSize(child) {
  return child.dir
    ? child.children.reduce((sum, child) => sum + totalSize(child), 0)
    : child.size;
}

function traverse(dir, cb) {
  dir.children.forEach((child) => {
    if (child.dir) {
      traverse(child, cb);
    }
    cb(child);
  });
}

const part1 = (input) => {
  const cmds = parse(input);
  const root = replay(cmds);

  const totalSizes = [];

  traverse(root, (child) => {
    if (child.dir) {
      totalSizes.push(totalSize(child));
    }
  });

  return totalSizes
    .filter((size) => size <= 100_000)
    .reduce((sum, size) => sum + size);
}

const part2 = (i) =>
i.length*2

test('dev', () => {
  const input = heredoc`
    $ cd /
    $ ls
    dir a
    14848514 b.txt
    8504156 c.dat
    dir d
    $ cd a
    $ ls
    dir e
    29116 f
    2557 g
    62596 h.lst
    $ cd e
    $ ls
    584 i
    $ cd ..
    $ cd ..
    $ cd d
    $ ls
    4060174 j
    8033020 d.log
    5626152 d.ext
    7214296 k
  `;
  const output1 = part1(input);
  // const output2 = part2(input);

  assert.strictEqual(output1, 95437);
  // assert.strictEqual(output2, 8);
});

test('official', () => {
  const input = loadInput(import.meta);
  const output1 = part1(input);
  // const output2 = part2(input);

  assert.strictEqual(output1, 1334506);
  // assert.strictEqual(output2, 10);
});
