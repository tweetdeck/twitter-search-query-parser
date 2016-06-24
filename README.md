# twitter-search-query-parser

**WIP** parser for Twitter search queries.

## Use

`parse` turns a search query into a data structure:

```js
import {parse} from 'twitter-search-query-parser';

parse('@jack from:twitter') ===
  [ 'And',
    [ [ 'Including', [ 'Text', '@jack' ] ],
      [ 'Including', [ 'Pair', 'from', 'twitter' ] ] ] ]
```

`stringify` turns a data structure back into a query:

```js
import {stringify} from 'twitter-search-query-parser';

stringify(
  [ 'And',
    [ [ 'Including', [ 'Text', '@jack' ] ],
      [ 'Including', [ 'Pair', 'from', 'twitter' ] ] ] ]
) === '@jack from:twitter'
```

`simplify` squashes the data structure by turning complex types into text. This makes it easier to build an interface for the query, and it stringifies just the same.

```js
import {parse, simplify} from 'twitter-search-query-parser';

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
  disallow: ['Group', 'Or']
});

simplified ===
  [ 'And',
    [ [ 'Including', [ 'Text', '@jack OR @twitter' ] ],
      [ 'Excluding', [ 'Text', '(@support OR @twitterdev)' ] ] ] ]
```

## Terms

The parsed data stucture follows the format: `[Type, ...values]`. The nature of the `values` depends on the `Type` – see `types.js`.

Here are all the types of term:

### `And`

Represents a conjunction of other terms, and is the root of the query and grouped sub-queries.

Contains an Array value of other terms.

Example: `['And', [ [ ... ], [ ... ], ..., [ ... ] ]]`

### `Or`

Represents a disjunction of other terms.

Contains an Array value of other terms.

Example: `['Or', [ [ ... ], [ ... ], ..., [ ... ] ]]`

### `Including`

Represents the *inclusion* of the contained term.

Contains a single value, another terms.

Example: `['Including', ['Text', 'x']]`

### `Excluding`

Represents the *exclusion* of the contained term.

Contains a single value, another terms.

Example: `['Excluding', ['Text', 'x']]`

### `Text`

Represents a text value, including hashtags, mentions and cashtags.

Contains a single string value.

Example: `['Text', x]`

## Development

```
$ npm install
$ npm run gen
$ npm run try "some -search from:twitter @jack #tagged OR \"exactly this\""
```

