const types = {
  // General Purpose
  Value: {
    reduce: function () {
      return this.value.reduce();
    }
  },
  Values: {
    reduce: function () {
      return this.elements.map(elem => types.Value.reduce.call(elem));
    }
  },
  KV: {
    reduce: function () {
      return [
        this.k.text.toUpperCase(),
        this.v.text
      ];
    }
  },

  // Operators
  Or: {
    reduce: function () {
      return [
        'OR',
        [this.orable.reduce()].concat(
          this.or_groups.reduce()
        )
      ];
    }
  },
  Including: {
    reduce: function () {
      return [
        'INCLUDING',
        this.text
      ];
    }
  },
  Excluding: {
    reduce: function () {
      return [
        'EXCLUDING',
        this.word.text
      ];
    }
  },
  List: {
    reduce: function () {
      return [
        'LIST',
        this.list_name.screen_name.text,
        this.list_name.list_slug.text
      ];
    }
  },
  IsQuestion: {
    reduce: function () {
      return [
        'QUESTION',
        true
      ];
    }
  }
};

export default types;
