# twitter-search-query-parser

**WIP** parser for Twitter search queries.

## Use

`parse` turns a search query into a data structure:

```js
parse('@jack from:twitter') === [
   'And',
   [
      ['Including', ['Text', '@jack']],
      ['Including', ['Pair', 'from', 'twitter']
   ]
]
```

`stringify` turns a data structure back into a query:

```js
stringify([
   'And',
   [
      ['Including', ['Text', '@jack']],
      ['Including', ['Pair', 'from', 'twitter']]
   ]
]) === '@jack from:twitter'
```

## Development

```
$ npm install
$ npm run gen
$ npm run try "some -search from:twitter @jack #tagged OR \"exactly this\""
```

