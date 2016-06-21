const types = {
  Container: {
    reduce: function () {
      return this.value.reduce();
    }
  },
  Query: {
    reduce: function () {
      return [
        'Query',
        this.elements.map(elem => elem.operator.reduce())
      ];
    }
  },
  Or: {
    reduce: function () {
      console.log('OR', this);
      return [
        'Or',
        this.left.reduce(),
        this.right.reduce()
      ];
    }
  },
  Including: {
    reduce: function () {
      return [
        'Including',
        this.text
      ];
    }
  },
  Excluding: {
    reduce: function () {
      return [
        'Excluding',
        this.word.text
      ];
    }
  },
  KV: {
    reduce: function () {
      return [
        'KV',
        this.k.text,
        this.v.text
      ];
    }
  },
  IsQuestion: {
    reduce: function () {
      return [
        'IsQuestion',
        true
      ];
    }
  }
};
const tree = require('./query').parse(process.argv[2], { types });

console.log(
  require('util').inspect(
    tree,
    { depth: null, colors: true }
  )
);

console.log();

console.log(
  require('util').inspect(
    tree.reduce(),
    { depth: null, colors: true }
  )
);
