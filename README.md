# twitter-search-query-parser

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release) [![Build Status](https://travis-ci.org/tweetdeck/twitter-search-query-parser.svg?branch=master)](https://travis-ci.org/tweetdeck/twitter-search-query-parser)

Parser, simplifier and stringifier of Twitter search queries.

## Install

```
npm install --save twitter-search-query-parser
```

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

The parsed data stucture follows the format: `[Type, ...values]`. The nature of the `values` depends on the `Type`.

### `Text`

Represents a text value, including hashtags, mentions and cashtags. For example:

```
#x
```

Contains a single string value.

```
['Text', 'x']
```

### `Exactly`

Represents an exact text match, in quotes.

```
"b c"
```

Contains one string value.

```
['Exactly', 'b c']
```

### `And`

Represents a conjunction of other terms, and is the root of the query and grouped sub-queries. For example:

```
x #y
```

Contains an Array value of other terms.

```
['And', [ ... ]]
```

### `Or`

Represents a disjunction of other terms. For example:

```
x OR #y
```

Contains an Array value of other terms.

```
['Or', [ ... ]]
```

### `Including`

Represents the *inclusion* of the contained term. Every term is either included or excluded.

Contains a single value, another term.

```
['Including', ['Text', 'x']]
```

### `Excluding`

Represents the *exclusion* of the contained term. Every term is either included or excluded.

Contains a single value, another term.

```
['Excluding', ['Text', 'x']]
```

### `Group`

Represents a group of terms. For example:

```
(a b) OR (c d)
```

Contains a single value, another term.

```
['Group', [ ... ]]
```

### `Pair`

Represents a search facet operator. For example:

```
filter:vine exclude:retweets
```

Contains two string values: they key and the value.

```
['Pair', 'filter', 'vine']
```

### `List`

Represents a list facet operator.

```
list:NASA/astronauts-in-space-now
```

Contains two values: user name and list slug.

```
['List', 'NASA', 'astronauts-in-space-now']
```

## Known bugs

- This library has only been tested in English and likely has insufficient query parsing cababilities in other alphabets

## Development

```
$ npm install
$ npm run gen
$ npm run try "some -search from:twitter @jack #tagged OR \"exactly this\""
```

Commit messages should follow the [Angular commit message guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit).

### Release

This repository uses [semantic-release](https://github.com/semantic-release/semantic-release). Changes will automatically be released to npm.
