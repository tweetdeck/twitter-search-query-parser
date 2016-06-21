import { parse, reduce } from "./src";

const tree = parse(process.argv[2]);
console.log(
  require('util').inspect(
    tree,
    { depth: null, colors: true }
  )
);

console.log();

console.log(
  process.argv[2]
);
console.log(
  require('util').inspect(
    reduce(tree),
    { depth: null, colors: true }
  )
);
