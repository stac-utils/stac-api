const test = require('ava')
const { parseCqlText, parseCqlJson } = require('../libs/cql')

test('parse single text property comparisons', (t) => {
  const expected = {
    'platform': {
      eq: 'platform2'
    }
  }
  const actual = parseCqlText("platform = 'platform2'")

  t.deepEqual(actual, expected)
})
