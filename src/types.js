const types = {
  Text: {
    reduce() {
      return [
        'Text',
        this.text
      ];
    },
    stringify([, v]) {
      return v;
    }
  },
  Value: {
    reduce() {
      return this.value.reduce();
    },
    stringify(value) {
      const [type] = value;
      return types[type].stringify(value);
    }
  },
  Values: {
    reduce() {
      return this.elements.map(elem => types.Value.reduce.call(elem));
    },
    stringify(values) {
      return values.map(value => types.Value.stringify(value)).join(' ');
    }
  },
  Pair: {
    reduce() {
      return [
        'Pair',
        this.k.text.toLowerCase(),
        this.v.text
      ];
    },
    stringify([, k, v]) {
      return `${k}:${v}`;
    }
  },
  Group: {
    reduce() {
      return [
        'Group',
        this.root.reduce()
      ];
    },
    stringify([, v]) {
      return `(${types.Value.stringify(v)})`;
    }
  },
  And: {
    reduce() {
      return [
        'And',
        types.Values.reduce.call(this)
      ];
    },
    stringify([, values]) {
      return types.Values.stringify(values);
    }
  },
  Or: {
    reduce() {
      return [
        'Or',
        [this.orable.reduce()].concat(
          this.or_groups.reduce()
        )
      ];
    },
    stringify([, orables]) {
      return orables.map(
        orable => types.Value.stringify(orable)
      ).join(' OR ');
    }
  },
  Exactly: {
    reduce() {
      return [
        'Exactly',
        this.value.text
      ];
    },
    stringify([, value]) {
      return `"${value}"`;
    }
  },
  Including: {
    reduce() {
      return [
        'Including',
        this.value.reduce()
      ];
    },
    stringify([, v]) {
      return types.Value.stringify(v);
    }
  },
  Excluding: {
    reduce() {
      return [
        'Excluding',
        this.value.reduce()
      ];
    },
    stringify([, v]) {
      return `-${types.Value.stringify(v)}`;
    }
  },
  List: {
    reduce() {
      return [
        'List',
        this.list_name.screen_name.text,
        this.list_name.list_slug.text
      ];
    },
    stringify([, screenName, slug]) {
      return `list:${screenName}/${slug}`;
    }
  },
  IsQuestion: {
    reduce() {
      return [
        'IsQuestion',
        true
      ];
    },
    stringify() {
      return '?';
    }
  }
};

export default types;
