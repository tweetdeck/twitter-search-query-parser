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
  Pair: {
    reduce() {
      return [
        'Pair',
        this.k.text.toLowerCase(),
        this.v.text
      ];
    }
  },

  // Operators
  Or: {
    reduce() {
      return [
        'Or',
        [this.orable.reduce()].concat(
          this.or_groups.reduce()
        )
      ];
    }
  },
  Including: {
    reduce() {
      return [
        'Including',
        this.text
      ];
    }
  },
  Excluding: {
    reduce() {
      return [
        'Excluding',
        this.word.text
      ];
    }
  },
  List: {
    reduce() {
      return [
        'List',
        this.list_name.screen_name.text,
        this.list_name.list_slug.text
      ];
    }
  },
  IsQuestion: {
    reduce() {
      return [
        'IsQuestion',
        true
      ];
    }
  }
};

export default types;
