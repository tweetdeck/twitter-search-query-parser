import test from 'ava';
import {parse, simplify, stringify} from '..';

const testCases = [
  [
    'no groups',
    'a (b c)',
    ['Group'],
    [
      'And',
      [
        ['Including', ['Text', 'a']],
        ['Including', ['Text', '(b c)']]
      ]
    ]
  ]
];

testCases.forEach(([name, query, disallow, expected]) => {
  test(name, t => {
    t.deepEqual(
      simplify(parse(query), {disallow}),
      expected
    );
    t.deepEqual(
      stringify(simplify(parse(query), {disallow})),
      query
    );
  });
});
