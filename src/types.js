function contains(arr, v) {
  return arr.some(w => v === w);
}

const types = {
  Value: {
    reduce() {
      return this.value.reduce();
    },
    stringify(value) {
      const [type] = value;
      return types[type].stringify(value);
    },
    simplify(parsed, opts) {
      const {disallowed = []} = opts;
      const [type] = parsed;
      if (contains(disallowed, type)) {
        return ['Text', types.Value.stringify(parsed)];
      }
      if (typeof types[type].simplify === 'function') {
        return [type, types[type].simplify(parsed, opts)];
      }
      return parsed;
    }
  },
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
  Values: {
    reduce() {
      return this.elements.map(elem => types.Value.reduce.call(elem));
    },
    stringify(values) {
      return values.map(value => types.Value.stringify(value)).join(' ');
    },
    simplify(values, opts) {
      return values.map(value => types.Value.simplify(value, opts));
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
    },
    simplify([, values], opts) {
      return types.Values.simplify(values, opts);
    }
  },
  Or: {
    reduce() {
      return [
        'Or',
        [this.value.reduce()].concat(
          this.or_groups.reduce()
        )
      ];
    },
    stringify([, values]) {
      return values.map(
        value => types.Value.stringify(value)
      ).join(' OR ');
    },
    simplify([, values], opts) {
      return types.Values.simplify(values, opts);
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
    },
    simplify([, v], opts) {
      return types.Value.simplify(v, opts);
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
    },
    simplify([, v], opts) {
      return types.Value.simplify(v, opts);
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
