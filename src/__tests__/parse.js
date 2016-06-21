import test from 'ava';
import {parse} from '..';

const testCases = [
  ['single word query',
    'simple',
    [['INCLUDING', 'simple']]
  ]
];

testCases.forEach(([name, query, expected]) => {
  test(name, t => {
    t.deepEqual(
      parse(query),
      expected
    );
  });
});
