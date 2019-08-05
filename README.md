# Solver
Condition solver

Creates simple conditions and test them agains  data set

## `./script.js`
Live example

## `./Solver.js`
Export everything you need

### class Solver
Creates a new solver
```js
  const solver = new Solver()
```
You can also initialize it with some data
```js
  const solver = new Solver({
    money: 200,
    time: 50
    stock: {
      'apple': {
        count: 3,
        quality: 1
      }
    }
  })
```

You can read and _modify_ data
```js
  solver.data = {money: 10}
```

You can test a condition
```js
  solver.is(condition) // true|false
```

You can describe a condition
```js
  solver.whatIs(condition) // string 
```
But most probably you'll want to modify this method to better serve your needs

### cnd(type,args[, desc])
Creates a condition. Description argument is optional, I added it to describe conditions with callback function
```js
  const condition = cnd(
    type, // see below
    args  // arguments - type dependant
  )
```

Currently there are 8 condition types

**Comparisons** (args is an object `{attr:string, value:any}`)
* `gt` - returns `true` when attribute is _greater_ than `value`
* `lt` - returns `true` when attribute is _less_ than `value`
* `eq` - returns `true` when attribute is _equal_ (weak comparison) to `value`
* `ne` - returns `true` when attribute is _not equal_ to `value`

**Aggregations** (args is an array of conditions)
* `all` - returns `true` when all of arguments are `true`
* `any` - returns `true` when at least one of arguments is `true`

**Alterations** (args is a single condition)
* `not` - returns `true` when argument is `false`

**Special case** (args is an object `{attr:string, value:function}`)
* `call` - returns whatever callback function return when we feed her a specified attribute as an argument

### arg(attr, value)
Creates an argument for comparison functions. Just a qulity of life function.
```js
  const argument = arg('money', 50)
```

### Conclusion
1. Create a solver
```js
  const sol = new Solver()
```
2. Update solver's data whenever you need it
```js
  sol.data = {time: 13, score: 6, name: 'John'}
```
3. Create a condition
```js
  const rich = cnd(
    'gt',
    arg(
      'money',
      50
    )
  )
```
4. Or lots of conditions and combine them
```js
  const good = cnd(
    'gt',
    arg(
      'fame',
      15
    )
  )

  const well = cnd(
    'any',
    [
      rich,
      good
    ]
  )

  const savvy = cnd(
    'have',
    arg(
      'inv',
      'apple'
    )
  )

  const prepared = cnd(
    'all',
    [
      well,
      savvy
    ]
  )
```
5. Test if solver's data matches condition
```js
  sol.is(good)
  sol.is(prepared)
```
6. Go wild!

## Totally useless demo's installation
Removed as unnecessary