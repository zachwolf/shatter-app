var Cache = require('class/cache.class')

/**********************
 * ┬ ┬┌─┐┬  ┌┬┐┌─┐┬─┐ *
 * ├─┤│ ││   ││├┤ ├┬┘ *
 * ┴ ┴└─┘┴─┘─┴┘└─┘┴└─ *
 **********************/

/**
 * Generic class for creating an array of sub classes
 * 
 * @param {function} Child - subclass to be called when adding an item
 * @returns 
 */
function Holder (Child) {
  this.items = []
  this.Child = Child
  this.cache = new Cache()
  return this
}

/**
 * Creates children from the Child constructor
 *
 * @param {...*} - params that will be passed onto the child constructor
 * @returns {this}*/
Holder.prototype.addItem = function() {
  try {
    var items = Object.create(this.Child.prototype)
      , args  = _.toArray(arguments)
    
    // push constructor into arguments to be used as the last param
    args.push(this)

    var child = this.Child.apply(items, args);

    // todo: only push if a valid item was returned
    if (child instanceof this.Child) {
      this.items.push(items)
    }

    return this
  } catch (err) {
    debugger
    console.log(err)
  }
}

/**
 * Filters through the items list and
 * returns an item matching the passed parameters
 *
 * @param {string} prop - property of the child to be searched for
 * @param {string|number} val - properties value
 * @returns {child}
 */
Holder.prototype.getItem = function(prop, val) {
  var obj = {}
  return _.findWhere(this.items, obj[val] = prop)
}

/**
 * function description
 *
 * @param {string} foo - foo description
 * @returns {string}
 */
Holder.prototype.empty = function() {
  this.items = []
  return this
}

module.exports = {
  Holder: Holder
}