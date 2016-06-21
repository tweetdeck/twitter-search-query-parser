import test from 'ava';
import {parse, stringify} from '..';

const testCases = [
  [
    'single word query',
    'simple',
    [['Including', 'simple']]
  ],
  [
    'triple OR',
    'a OR b OR c',
    [
      [
        'Or',
        [
          ['Including', 'a'],
          ['Including', 'b'],
          ['Including', 'c']
        ]
      ]
    ]
  ],
  [
    'extreme example',
    `search #search @search -query filter:vine exclude:retweets exclude:nativeretweets
     min_replies:10 OR min_retweets:100 min_faves:20 lang:es OR to:jack ?
     since:2016-01-01 until:2016-02-01 list:NASA/astronauts-in-space-now filter:verified
     cats OR dogs OR beavers`,
    [
      ['Including', 'search'],
      ['Including', '#search'],
      ['Including', '@search'],
      ['Excluding', 'query'],
      ['Pair', 'filter', 'vine'],
      ['Pair', 'exclude', 'retweets'],
      ['Pair', 'exclude', 'nativeretweets'],
      ['Or', [['Pair', 'min_replies', '10'], ['Pair', 'min_retweets', '100']]],
      ['Pair', 'min_faves', '20'],
      ['Or', [['Pair', 'lang', 'es'], ['Pair', 'to', 'jack']]],
      ['IsQuestion', true],
      ['Pair', 'since', '2016-01-01'],
      ['Pair', 'until', '2016-02-01'],
      ['List', 'NASA', 'astronauts-in-space-now'],
      ['Pair', 'filter', 'verified'],
      [
        'Or',
        [
          ['Including', 'cats'],
          ['Including', 'dogs'],
          ['Including', 'beavers']
        ]
      ]
    ]
  ]
];

testCases.forEach(([name, rawQuery, expected]) => {
  const query = rawQuery.split('\n').map(v => v.trim()).join(' ');
  test(name, t => {
    t.deepEqual(
      parse(query),
      expected
    );
    t.deepEqual(
      stringify(expected),
      query
    );
    t.deepEqual(
      stringify(parse(query)),
      query
    );
    t.deepEqual(
      parse(stringify(expected)),
      expected
    );
  });
});
