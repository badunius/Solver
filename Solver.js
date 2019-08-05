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

  /**
   * When called, the solver will start to use `source` as data source
   * Any changes to the `source` will be visible to the solver
   * Canceled by modifying the `data` property
   * @param {Object} source - data object
   */
  use(source) {
    this.__data = source
  }

  /**
   * Tests condition against our current data
   * @param {Object} condition - condition
   */
  is(condition) {
    return this.__fn[condition.type](condition.args)
  }

  /**
   * Explains condition (debug tool)
   * @param {Object} condition - condition
   * @param {String} indent - indentation
   */
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

/**
 * Condition creator
 * @param {String} type - 'gt'|'lt'|'eq'|'ne'|'any'|'all'|'have'|'call'
 * @param {any} args - type-dependent arguments Object|Array
 * @param {String} desc - optional description (works only for `call` conditions)
 */
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

/**
 * Argument creator
 * @param {String} attr - attribute: when testing we will test agains data[attr] value
 * @param {any} value - target value
 */
export const arg = (attr, value) => ({
  attr,
  value,
})