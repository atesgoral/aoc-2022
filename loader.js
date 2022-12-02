import {fileURLToPath} from 'url';
import {dirname} from 'path';
import {readFileSync} from 'fs';

export function heredoc(s) {
  return s.join('').replace(/^\n/, '').replace(/  /g, '');
}

export function loadInput(meta) {
  const filename = `${dirname(fileURLToPath(meta.url))}/input.txt`;
  return readFileSync(filename, {encoding: 'utf-8'});
}
