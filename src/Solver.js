export class Solver {
  constructor (initialData = {}) {
    this.__data = {...initialData}
    this.__fn = {
      // Coparison funcs: args is object
      'gt': args => this.__data[args.attr] > args.value,
      'lt': args => this.__data[args.attr] < args.value,
      'eq': args => this.__data[args.attr] == args.value,
      'ne': args => this.__data[args.attr] != args.value,
      // Aggregation funcs: args is array (of conditions)
      'any': args => args.some(cond => this.is(cond)),
      'all': args => args.every(cond => this.is(cond)),
      // Alteration funcs: args is a single condition
      'not': args => !this.is(args),
      // Search funcs: args is object
      'have': args => !!(this.__data[args.attr][args.value]),
      // When you need something moe complex just pass a callback function
      'call': args => args.value(this.__data[args.attr]),
    }
  }

  get data() {
    return {...this.__data}
  }

  set data(value) {
    this.__data = {
      ...this.__data,
      ...value
    }
  }

  // test condition with our current data
  is(condition) {
    return this.__fn[condition.type](condition.args)
  }

  // explain condition
  whatIs(condition, indent = '') {
    switch (condition.type) {
      case 'gt': return `${indent}${condition.args.attr} > ${condition.args.value}`
      case 'lt': return `${indent}${condition.args.attr} < ${condition.args.value}`
      case 'eq': return `${indent}${condition.args.attr} = ${condition.args.value}`
      case 'ne': return `${indent}${condition.args.attr} ≠ ${condition.args.value}`
      case 'any': return condition.args.reduce((prev, curr) => `${prev}\n${this.whatIs(curr, `${indent}\t`)}`, `${indent}One of the following:`)
      case 'all': return condition.args.reduce((prev, curr) => `${prev}\n${this.whatIs(curr, `${indent}\t`)}`, `${indent}All of the following:`)
      case 'have': return `${indent}${condition.args.attr} have "${condition.args.value}"`
      case 'call': return condition.desc ? `${indent}${condition.desc}` : `${indent}Defined by function call`
    }
  }
}

// condition creator
export const cnd = (type, args, desc = undefined) => (
  desc 
  ? {
      type,
      args,
      desc,
    }
  : {
      type,
      args,
    }
)

// argument creator
export const arg = (attr, value) => ({
  attr,
  value,
})