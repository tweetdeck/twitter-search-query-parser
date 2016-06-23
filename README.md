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

`simplify` squashes the data structure by turning complex types into text. This makes it easier to build an interface for the query, and it stringifies just the same.

```js
const parsed = parse('@jack OR @twitter -(@support OR @twitterdev)');

parsed ===
  [ 'And',
    [ [ 'Including',
        [ 'Or',
          [ [ 'Including', [ 'Text', '@jack' ] ],
            [ 'Including', [ 'Text', '@twitter' ] ] ] ] ],
      [ 'Excluding',
        [ 'Group',
          [ 'And',
            [ [ 'Including',
                [ 'Or',
                  [ [ 'Including', [ 'Text', '@support' ] ],
                    [ 'Including', [ 'Text', '@twitterdev' ] ] ] ] ] ] ] ] ] ] ]

const simplified = simplify(parsed, {
  disallowed: ['Group', 'Or']
});

simplified ===
  [ 'And',
    [ [ 'Including', [ 'Text', '@jack OR @twitter' ] ],
      [ 'Excluding', [ 'Text', '(@support OR @twitterdev)' ] ] ] ]
```

## Development

```
$ npm install
$ npm run gen
$ npm run try "some -search from:twitter @jack #tagged OR \"exactly this\""
```

