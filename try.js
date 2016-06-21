import util from 'util';
import {parse, stringify} from './src';

console.log(
  process.argv[2]
);
const parsed = parse(process.argv[2]);
console.log(
  util.inspect(
    parsed,
    {depth: null, colors: true}
  )
);
const query = stringify(parsed);
console.log(query);
