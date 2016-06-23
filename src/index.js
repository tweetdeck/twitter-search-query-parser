import Query from '../grammar/query';
import types from './types';

export function stringToTree(query) {
  if (typeof query !== 'string') {
    throw new Error('Query must be a string');
  }
  return Query.parse(query, {types});
}

export function reduce(tree) {
  if (!tree || typeof tree.reduce !== 'function') {
    throw new Error('Tree must be a parsed AST');
  }
  return tree.reduce();
}

export function parse(query) {
  if (typeof query !== 'string') {
    throw new Error('Query must be a string');
  }
  return reduce(stringToTree(query));
}

export function stringify(parsed) {
  return types.Value.stringify(parsed);
}

export function simplify(parsed, opts = {}) {
  return types.Value.simplify(parsed, opts);
}
