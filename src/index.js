import types from "./types";
const Query = require('./query');

export function stringToTree(query) {
  if (typeof query !== "string") {
    throw new Error("Query must be a string");
  }
  return Query.parse(query, { types });
}

export function reduce(tree) {
  if (!tree || typeof tree.reduce !== "function") {
    throw new Error("Tree must be a parsed AST");
  return tree.reduce();
}

export function parse(query) {
  if (typeof query !== "string") {
    throw new Error("Query must be a string");
  }
  return reduce(stringToTree(query));
}
