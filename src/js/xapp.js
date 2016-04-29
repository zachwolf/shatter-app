/**
 * The business of the app
 * 
 * @requires module:Chain
 * @requires module:Holder
 * @requires module:Point
 * @requires module:Line
 */
(function(){

	var app    = window.app
		// imports
		, Chain  = app.Chain
		, Holder = app.Holder
		, Point  = app.Point
		, Line   = app.Line

	/***********************
   *   BEGIN CONSTANTS   *
   ***********************/

    , $stage  = $('canvas')
    , ctx     = new Chain($stage.get(0).getContext('2d'))
    , stage   = {
        $       : $stage
      , width   : $stage.prop('width')
      , height  : $stage.prop('height')
      , centerX : $stage.prop('width')  / 2
      , centerY : $stage.prop('height') / 2
      }
    , points     = new Holder(Point)
    , intersects = new Holder(Point)
    , lines      = new Holder(Line)

  /***********************
   *    END CONSTANTS    *
   ***********************/

  /*************
   * ┌─┐┌─┐┌─┐ *
   * ├─┤├─┘├─┘ *
   * ┴ ┴┴  ┴   *
   *************/

  if (app.debug) {
    app.expose = app.expose || {}

    app.expose.ctx = ctx
    app.expose.stage = stage
  }
  
  ctx.set('strokeStyle', '#dadd15')
     .set('lineWidth', 3)
     .set('fillStyle', '#B00B00')

  function drawLines() {
    _.each(lines.items, function(line){
      ctx.beginPath()
         .moveTo(line.points[0].x, line.points[0].y)
         .lineTo(line.points[1].x, line.points[1].y)
         .closePath()
         .stroke()
      return
    })
  }

  var count = 0

  function drawIntersects() {
    ctx.set('fillStyle', '#B00B00')

    intersects.empty()

    function getIntersects(line){
      var intersections = line.getIntersetions()

      if (intersections && !!intersections.length) {
        _.each(intersections, addIntersects)
      }
    }

    function addIntersects(intersection) {
      intersects.addItem(intersection)
    }

    function drawIntersect(intersect) {
      ctx.beginPath()
         .arc(intersect.x, intersect.y, 4, 0, Math.PI * 2)
         .closePath()
         .fill()
    }

    _.each(lines.items, getIntersects)
    _.each(intersects.items, drawIntersect)
  }

  function clear() {
    ctx.clearRect(0, 0, stage.width, stage.height)
  }

  function draw() {
    if (lineStart) {
      clear()
      drawLines()
      drawIntersects()
    // console.table(intersects.items)
    }
    requestAnimationFrame(draw)
  }

  lines
    .addItem({
      points: [new Point({x: 550, y: 550}), new Point({x: 50, y: 50})]
    })
    // .addItem({
    //   points: [new Point({x: 325, y: 350}), new Point({x: 375, y: 300})]
    // })
    // .addItem({
    //   points: [new Point({x: 150, y: 400}), new Point({x: 250, y: 300})]
    // })
    .addItem({
      points: [new Point({x: 175, y: 200}), new Point({x: 175, y: 350})]
    })
    .addItem({
      points: [new Point({x: 100, y: 325}), new Point({x: 500, y: 325})]
    })
    // .addItem({
    //   points: [new Point({x: 100, y: 225}), new Point({x: 250, y: 225})]
    // })

  // for (var i = 0; i <= 10; i++) {
  //   var x1 = getRandomArbitrary(0, 600)
  //     , y1 = getRandomArbitrary(0, 600)
  //     , x2 = getRandomArbitrary(0, 600)
  //     , y2 = getRandomArbitrary(0, 600)
  //   lines.addItem({
  //     points: [new Point({x: x1, y: y1}), new Point({x: x2, y: y2})]
  //   })
  // };

  var lineStart = false
    , drawPoint
    , drawLine

  stage.$
    .on('click', function(e){
      if (lineStart) {
        lineStart = false
      } else {
        drawPoint = new Point({x: e.offsetX * 2, y: e.offsetY * 2})
        lines.addItem({
          points: [new Point({x: e.offsetX * 2, y: e.offsetY * 2}), drawPoint]
        })
        drawLine = _.last(lines.items)
        lineStart = true
      }
    })
    .on('mousemove', function(e){
      if (lineStart) {
        lines.cache.trigger('reset')
        drawLine.cache.trigger('reset')
        drawLine.getSlope()

        drawPoint.x = e.offsetX * 2
        drawPoint.y = e.offsetY * 2
        // drawPoint.equation = drawPoint.getEquation()
      }
    })

  $(function(){
    draw()
    clear()
    drawLines()
    drawIntersects()
  })

}());