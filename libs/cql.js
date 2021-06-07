const SqlWhereParser = require('sql-where-parser')

const config = SqlWhereParser.defaultConfig

config.operators[5]['<=>'] = 2
config.operators[5]['<>'] = 2
config.tokenizer.shouldTokenize.push('<=>', '<>')


function parseCqlText(input) {
  // Currently only implements crude AND

  const parser = new SqlWhereParser(config)

  const fields = {}

  const parsed = parser.parse(input, (op, rands) => {
    if (rands.length === 2) {
      // if (!fields[rands[0]]) {
      //   fields[rands[0]] = []
      // }
      const term = {}
      if (op === '=') {
        term['eq'] = rands[1]
      }
      fields[rands[0]] = term
    }

    return parser.defaultEvaluator(op, rands)
  })

  return fields
}

function parseCqlJson(input) {
  const query = JSON.parse(input)

  return new Error('Not implemented')
}

module.exports = {
  parseCqlText,
  parseCqlJson
}
