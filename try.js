const typ = type => value => ({ type, value });
const actions = {
  make_word: typ('word', input => input)
};

console.log(
  require('util').inspect(
    require('./query').parse(process.argv[2], { actions }),
    { depth: null, colors: true }
  )
);
