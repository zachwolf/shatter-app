(function(){

  var app = window.app = window.app || {}

  /*****************
   * ┌─┐┌─┐┬┌┐┌┌┬┐ *
   * ├─┘│ │││││ │  *
   * ┴  └─┘┴┘└┘ ┴  *
   *****************/
  
  /**
   * Represents a x, y coordinate
   *
   * @constructor
   * @param {object} settings
   * @param {number} settings.x - point x coordinate
   * @param {number} settings.y - point y coordinate
   * @param {number} settings.angle - point angle from shatter center
   * @returns {this}
   */
  function Point (settings, _super) {
    this._super = _super
    this.id     = generateID()

    this.x     = settings.x
    this.y     = settings.y
    // this.angle = settings.angle

    return this
  }
  
  /**
   * gets the closest Point
   *
   * @param {number} count - how many other dots to find
   * @returns {object}
   */
  Point.prototype.getClosest = function(count) {
    return _.chain(this._super.items)
            .reject(function(point) {
              return this.id === point.id
            }, this)
            .sortBy(function(point) {
              return getHypotenuseLength(this.x, this.y, point.x, point.y)
            }, this)
            .value()
            .splice(0, count)
  }

  app.Point = Point
}());