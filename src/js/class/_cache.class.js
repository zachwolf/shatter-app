/*******************
 * ┌─┐┌─┐┌─┐┬ ┬┌─┐ *
 * │  ├─┤│  ├─┤├┤  *
 * └─┘┴ ┴└─┘┴ ┴└─┘ *
 *******************/

/**
 * Temporary data storage with events
 *
 * @param {object} child - object to attach events to
 * @returns {object}
 */
function Cache(child) {
  this.child = child
  this.listeners = {}
  this.data = {}

  /**
   * clears stored data
   *
   * @access private
   */
  function clearCache() {
    this.data = []
  }

  this.on('reset', clearCache, this)

  return this
}

/**
 * the primary reason Cache is created,
 * this stores data to be searched for later
 *
 * @param {*} id - identifier for later lookup
 * @param {*} data - value to be stored
 * @returns {object}
 */
Cache.prototype.save = function(id, data) {

  this.data[this.hash(id)] = data

  this.trigger('save')
  return this
}

/**
 * searches cache data for a match
 *
 * @param {...} arguments - identifiers
 * @returns {object|undefined}
 */
Cache.prototype.find = function() {
  var res = this.data[this.hash.apply(this, arguments)]

  return (res && res.data) ? res.data : undefined
}

/**
 * function description
 *
 * @param {string} foo - foo description
 * @returns {string}
 */
Cache.prototype.hash = function() {
  var args = _.toArray(arguments)
  return JSON.stringify(_.sortBy(args))
}

/**
 * adds event listener
 *
 * @param {string} event - event name
 * @param {function} fn - callback when event is fired
 * @param {object} ctx - context for the callback
 * @returns {object}
 */
Cache.prototype.on = function(event, fn, ctx) {
  // set up a holder for this event
  this.listeners[event] = this.listeners[event] || []

  // alias
  var listeners = this.listeners[event]

  if (_.isFunction(fn)) {
    if (ctx) fn = _.bind(fn, ctx)
    listeners.push(fn)
  }

  return this
}

/**
 * removes event listener
 *
 * @param {string} event - event name
 * @returns {object}
 */
Cache.prototype.off = function(event) {
  delete this.listeners[event]
  return this
}

/**
 * fires all attached callbacks with a certain name
 *
 * @param {string} event - event name
 * @returns {object}
 */
Cache.prototype.trigger = function(event/*, data?*/) {
  var listeners = this.listeners[event]

  if (listeners && listeners.length) {
    _.each(listeners, function(fn) {
      fn.call(this)
    }, this)
  }

  return this
}

module.exports = Cache