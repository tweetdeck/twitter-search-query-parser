const types = {};
const tree = require('./query').parse(process.argv[2], { types });

console.log(
  require('util').inspect(
    tree,
    { depth: null, colors: true }
  )
);
