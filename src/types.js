const types = {
  // General Purpose
  Value: {
    reduce() {
      return this.value.reduce();
    }
  },
  Values: {
    reduce() {
      return this.elements.map(elem => types.Value.reduce.call(elem));
    }
  },
  KV: {
    reduce() {
      return [
        this.k.text.toUpperCase(),
        this.v.text
      ];
    }
  },

  // Operators
  Or: {
    reduce() {
      return [
        'OR',
        [this.orable.reduce()].concat(
          this.or_groups.reduce()
        )
      ];
    }
  },
  Including: {
    reduce() {
      return [
        'INCLUDING',
        this.text
      ];
    }
  },
  Excluding: {
    reduce() {
      return [
        'EXCLUDING',
        this.word.text
      ];
    }
  },
  List: {
    reduce() {
      return [
        'LIST',
        this.list_name.screen_name.text,
        this.list_name.list_slug.text
      ];
    }
  },
  IsQuestion: {
    reduce() {
      return [
        'QUESTION',
        true
      ];
    }
  }
};

export default types;
