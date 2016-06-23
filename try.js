import util from 'util';
import {parse, stringify, simplify} from './src';

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

const simplified = simplify(parsed, {
  disallow: ['Group', 'Or']
});
console.log(
  util.inspect(
    simplified,
    {depth: null, colors: true}
  )
);

const simplifiedQuery = stringify(simplified);
console.log(simplifiedQuery);
