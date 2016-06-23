# twitter-search-query-parser

**WIP** parser for Twitter search queries.

## Use

`parse` turns a search query into a data structure:

```js
let parsed = parse('@jack from:twitter');
parsed === [
   ['Including', ['Text', '@jack']],
   ['Including', ['Pair', 'from', 'twitter']
]
```

`stringify` turns a data structure back into a query:

```js
let query = stringify([
   ['Including', ['Text', '@jack']],
   ['Including', ['Pair', 'from', 'twitter']
]);
query === '@jack from:twitter'
```

## Development

```
$ npm install
$ npm run gen
$ npm run try "some -search from:twitter @jack #tagged OR \"exactly this\""
```

