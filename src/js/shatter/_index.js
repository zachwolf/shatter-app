/**
 * thanks to SciencePrimer.com for help with the math
 * http://scienceprimer.com/drawing-regular-polygons-javascript-canvas
 *
 * thanks to mathopenref.com for help with line intersection
 * http://www.mathopenref.com/coordintersection.html
 */

/*************************
 * ┌─┐┬ ┬┌─┐┌┬┐┌┬┐┌─┐┬─┐ *
 * └─┐├─┤├─┤ │  │ ├┤ ├┬┘ *
 * └─┘┴ ┴┴ ┴ ┴  ┴ └─┘┴└─ *
 *************************/

var helpers = require('helpers')

/**
 * Setup for the canvas center point
 *
 * @constructor
 * @returns {object}
 */
function Shatter (settings) {
  this.x = settings.x
  this.y = settings.y
  
  var stage          = settings.stage
    , furthestCorner = helpers.getFurthestCorner(this.x, this.y, stage.width, stage.height)
    , args           = [this.x, this.y].concat(furthestCorner)
    , hypLength      = helpers.getHypotenuseLength.apply(window, args)

  this.hypotenuse = hypLength
  
  return this
}

module.exports = Shatter