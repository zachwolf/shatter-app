(function(){

  var app = window.app = window.app || {}

  /*****************
   * ┌─┐┬ ┬┌─┐┬┌┐┌ *
   * │  ├─┤├─┤││││ *
   * └─┘┴ ┴┴ ┴┴┘└┘ *
   *****************/

  /**
   * Allows for chaining object methods.
   * Functions will be able to be called normally,
   * but all other types need to be accessed using
   * `Chain.set(prop, val)` and `Chain.get(prop)`
   *
   * I haven't tested this in many browsers yet.
   * Until then, it's probably safer to use something like
   * LeaVerou's Chainvas
   * http://leaverou.github.io/chainvas/
   *
   * @param {object} target - object of things to wrap
   * @returns {object}
   */
  function Chain(target) {
    
    this.target = target
    
    function wrap(value, prop) {
      if (_.isFunction(value)) {
        this[prop] = _.bind(function(){
          this.target[prop].apply(this.target, _.toArray(arguments))
          return this
        }, this)
      }
      return
    }
    
    _.each(this.target, wrap, this)
    _.each(this.target.constructor.prototype, wrap, this)
    
    return this
  }

  /**
   * Changes a property value on the original target
   * 
   * @param {string} prop - name of the property being changed
   * @param {*} val - new value
   * @returns {object}
   */
  Chain.prototype.set = function(prop, val) {
    this.target[prop] = val
    return this
  }

  /**
   *
   * @param {string} prop - 
   * @returns {*}
   */
  Chain.prototype.get = function(prop) {
    return this.target[prop]
  }

  app.Chain = Chain

}());