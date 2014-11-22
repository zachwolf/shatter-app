(function(){

  var app = window.app = window.app || {}

  window.app.debug = true

  /*************************
   * ┌─┐┬ ┬┌─┐┌┬┐┌┬┐┌─┐┬─┐ *
   * └─┐├─┤├─┤ │  │ ├┤ ├┬┘ *
   * └─┘┴ ┴┴ ┴ ┴  ┴ └─┘┴└─ *
   *************************/
  
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
      , furthestCorner = getFurthestCorner(this.x, this.y, stage.width, stage.height)
      , args           = [this.x, this.y].concat(furthestCorner)
      , hypLength      = getHypotenuseLength.apply(window, args)

    this.hypotenuse = hypLength
    
    return this
  }

  app.Shatter = Shatter
  
}());

