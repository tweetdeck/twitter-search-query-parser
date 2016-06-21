import types from "./types";

export function parse(query) {
  return require('./query').parse(query, { types });
}
export function reduce(tree) {
  return tree.reduce();
}
