import { stringToTree, parse } from "./src";

console.log(
  process.argv[2]
);
console.log(
  require('util').inspect(
    parse(process.argv[2]),
    { depth: null, colors: true }
  )
);
