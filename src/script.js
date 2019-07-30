import { Solver, cnd, arg } from './Solver.js'

// Creating a solver with some initial data
const sol = new Solver({
  money: 30,
  fame: 25,
  inv: {
    'apple': {count: 1},
    'shoes': {count: 3}
  }
})

// Creating some conditions
// have more than 50 money
const rich = cnd(
  'gt',
  arg(
    'money',
    50
  )
)

// have more than 15 fame
const good = cnd(
  'gt',
  arg(
    'fame',
    15
  )
)

// have at least something
const well = cnd(
  'any',
  [
    rich,
    good
  ]
)

// have an aple in his inventory
const savvy = cnd(
  'have',
  arg(
    'inv',
    'apple'
  )
)

const prep = cnd(
  'all',
  [
    well,
    savvy
  ]
)

// checks
console.log('Rich: ', sol.is(rich))
console.log('Good: ', sol.is(good))
console.log('Well: ', sol.is(well))
console.log('Savvy: ', sol.is(savvy))