import test from 'ava';
import {parse, stringify} from '..';

const testCases = [
  [
    'single word query',
    'simple',
    ['And', [['Including', ['Text', 'simple']]]]
  ],
  [
    'cashtag',
    '$CASH',
    ['And', [['Including', ['Text', '$CASH']]]]
  ],
  [
    'url',
    'http://a.b',
    ['And', [['Including', ['Text', 'http://a.b']]]]
  ],
  [
    'forced',
    '+a +b OR c',
    ['And',
      [['Including', ['Text', '+a']],
       ['Including',
         ['Or',
           [['Including', ['Text', '+b']],
            ['Including', ['Text', 'c']]]]]]]
  ],
  [
    'OR',
    'a OR b',
    [
      'And',
      [
        [
          'Including',
          [
            'Or',
            [
              ['Including', ['Text', 'a']],
              ['Including', ['Text', 'b']]
            ]
          ]
        ]
      ]
    ]
  ],
  [
    'triple OR',
    'a OR b OR c',
    [
      'And',
      [
        [
          'Including',
          [
            'Or',
            [
              ['Including', ['Text', 'a']],
              ['Including', ['Text', 'b']],
              ['Including', ['Text', 'c']]
            ]
          ]
        ]
      ]
    ]
  ],
  [
    'pairs',
    `filter:vine exclude:retweets min_replies:100 lang:es to:jack since:2016-01-01
    -filter:vine -exclude:retweets -min_replies:100 -lang:es -to:jack -since:2016-01-01`,
    [
      'And',
      [
        ['Including', ['Pair', 'filter', 'vine']],
        ['Including', ['Pair', 'exclude', 'retweets']],
        ['Including', ['Pair', 'min_replies', '100']],
        ['Including', ['Pair', 'lang', 'es']],
        ['Including', ['Pair', 'to', 'jack']],
        ['Including', ['Pair', 'since', '2016-01-01']],
        ['Excluding', ['Pair', 'filter', 'vine']],
        ['Excluding', ['Pair', 'exclude', 'retweets']],
        ['Excluding', ['Pair', 'min_replies', '100']],
        ['Excluding', ['Pair', 'lang', 'es']],
        ['Excluding', ['Pair', 'to', 'jack']],
        ['Excluding', ['Pair', 'since', '2016-01-01']]
      ]
    ]
  ],
  [
    'list',
    'list:beep/boop -list:beep/boop',
    [
      'And',
      [
        ['Including', ['List', 'beep', 'boop']],
        ['Excluding', ['List', 'beep', 'boop']]
      ]
    ]
  ],
  [
    'group',
    `a (b c) -(d e)`,
    [
      'And',
      [
        ['Including', ['Text', 'a']],
        [
          'Including',
          [
            'Group',
            [
              'And',
              [
                ['Including', ['Text', 'b']],
                ['Including', ['Text', 'c']]
              ]
            ]
          ]
        ],
        [
          'Excluding',
          [
            'Group',
            [
              'And',
              [
                ['Including', ['Text', 'd']],
                ['Including', ['Text', 'e']]
              ]
            ]
          ]
        ]
      ]
    ]
  ],
  [
    'extreme example',
    `search #search @search -query filter:vine exclude:retweets exclude:nativeretweets
     min_replies:10 OR min_retweets:100 min_faves:20 lang:es OR to:jack
     since:2016-01-01 until:2016-02-01 list:NASA/astronauts-in-space-now filter:verified
     cats OR dogs OR beavers "exactly this" -"exactly not this"
     fish #fish @fish "fish" -fish -#fish -@fish -"fish"`,
    [
      'And',
      [
        ['Including', ['Text', 'search']],
        ['Including', ['Text', '#search']],
        ['Including', ['Text', '@search']],
        ['Excluding', ['Text', 'query']],
        ['Including', ['Pair', 'filter', 'vine']],
        ['Including', ['Pair', 'exclude', 'retweets']],
        ['Including', ['Pair', 'exclude', 'nativeretweets']],
        [
          'Including',
          [
            'Or',
            [
              ['Including', ['Pair', 'min_replies', '10']],
              ['Including', ['Pair', 'min_retweets', '100']]
            ]
          ]
        ],
        ['Including', ['Pair', 'min_faves', '20']],
        [
          'Including',
          [
            'Or',
            [
              ['Including', ['Pair', 'lang', 'es']],
              ['Including', ['Pair', 'to', 'jack']]
            ]
          ]
        ],
        ['Including', ['Pair', 'since', '2016-01-01']],
        ['Including', ['Pair', 'until', '2016-02-01']],
        ['Including', ['List', 'NASA', 'astronauts-in-space-now']],
        ['Including', ['Pair', 'filter', 'verified']],
        [
          'Including',
          [
            'Or',
            [
              ['Including', ['Text', 'cats']],
              ['Including', ['Text', 'dogs']],
              ['Including', ['Text', 'beavers']]
            ]
          ]
        ],
        ['Including', ['Exactly', 'exactly this']],
        ['Excluding', ['Exactly', 'exactly not this']],
        ['Including', ['Text', 'fish']],
        ['Including', ['Text', '#fish']],
        ['Including', ['Text', '@fish']],
        ['Including', ['Exactly', 'fish']],
        ['Excluding', ['Text', 'fish']],
        ['Excluding', ['Text', '#fish']],
        ['Excluding', ['Text', '@fish']],
        ['Excluding', ['Exactly', 'fish']]
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
