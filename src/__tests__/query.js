import test from 'ava';
import {parse, stringify} from '..';

/**
 * These test cases are just to check reversibility. You add a query and it will check that a
 * stringification via a parse is identical to the original query.
 */

const testCases = [
  [
    'single word query',
    'simple'
  ],
  [
    'triple OR',
    'a OR b OR c'
  ],
  [
    'pairs',
    `filter:vine exclude:retweets min_replies:100 lang:es to:jack since:2016-01-01
    -filter:vine -exclude:retweets -min_replies:100 -lang:es -to:jack -since:2016-01-01`
  ],
  [
    'list',
    'list:beep/boop -list:beep/boop list:@beep/boop -list:@beep/boop'
  ],
  [
    'group',
    `a (b c) -(d e)`
  ],
  [
    'OR groups',
    'a (b c) OR (d e)'
  ],
  [
    'invalid OR',
    'a OR -b'
  ],
  [
    'supergroup',
    '(((((((a b c)))))))'
  ],
  [
    'extreme example',
    `search #search @search -query filter:vine exclude:retweets exclude:nativeretweets
     min_replies:10 OR min_retweets:100 min_faves:20 lang:es OR to:jack ?
     since:2016-01-01 until:2016-02-01 list:NASA/astronauts-in-space-now filter:verified
     cats OR dogs OR beavers "exactly this" -"exactly not this"
     fish #fish @fish "fish" -fish -#fish -@fish -"fish"`
  ]
];

testCases.forEach(([name, rawQuery]) => {
  const query = rawQuery.split('\n').map(v => v.trim()).join(' ');
  test(name, t => {
    t.deepEqual(
      stringify(parse(query)),
      query
    );
  });
});
