/**
 * todo: only draw canvas when things are changing
 */
console.log('---------')
// ;(function($, window){
  // 'use strict';

  /**
   * thanks to SciencePrimer.com for help with the math
   * http://scienceprimer.com/drawing-regular-polygons-javascript-canvas
   *
   * thanks to mathopenref.com for help with line intersection
   * http://www.mathopenref.com/coordintersection.html
   */

  // requestAnimationFrame Shim
  ;(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
  })()
  
  /**
   * Object.create polyfill for older browers
   */
  if (typeof Object.create != 'function') {
    Object.create = (function() {
      var Object = function() {};
      return function (prototype) {
        if (arguments.length > 1) {
          throw Error('Second argument not supported');
        }
        if (typeof prototype != 'object') {
          throw TypeError('Argument must be an object');
        }
        Object.prototype = prototype;
        var result = new Object();
        Object.prototype = null;
        return result;
      };
    })();
  }

  /***********************
   *   PRIVATE METHODS   *
   ***********************/

  /**
   * Finds the hypotenuse length from a point to the corner of the stage
   * Assumes the triangle is right angled because math is hard
   *
   * A^2 + B^2 = C^2
   *
   * @param Number x1 - starting x
   * @param Number y1 - starting y
   * @param Number x2 - ending x
   * @param Number y2 - ending y
   * @returns Number
   */
  function getHypotenuseLength(x1, y1, x2, y2) {
    var A = Math.abs(x1 - x2)
      , B = Math.abs(y1 - y2)

    return Math.sqrt(Math.pow(A, 2) + Math.pow(B, 2))
  }

  /**
   * Gets a random number between a range
   *
   * @param {Number} min - smallest range
   * @param {Number} max - largest range
   * @returns {Number}
   */
  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }
  
  /**
   * Generates a random id
   * Based on this stackoverflow question http://fncy.gr/1vJ9mOD
   *
   * @returns {String}
   */
  function generateID() {
    var d    = new Date().getTime()
      , str  = 'xxxxxxxx'
      , exp  = (/x/g)
      , uuid = str.replace(exp, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d/16)
        return ( c=='x' ? r : (r&0x7 | 0x8) ).toString(16)
    })
    return uuid
  }

  /**
   * compares passed numbers to see if they are
   * incrementally ordered
   * 
   * @param {array|...number} arr - list of numbers to be compared
   * @returns {boolean}
   */
  function sequential(arr) {
    // sequential(1,2,3) or sequential([1,2,3]) can be called
    if (!_.isArray(arr)) {
      arr = _.toArray(arguments)
    }

    var clone = _.sortBy(arr, function(num){
          return num
        })
      , valid = true

    for (var i = 0; i < clone.length; i++) {
      if (clone[i] !== arr[i]) {
        valid = false
        break
      }
    }

    return valid
  }

  /***********************
   * END PRIVATE METHODS *
   ***********************/

  /***********************
   *    BEGIN CLASSES    *
   ***********************/

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

  /**************************
   * ┌─┐┬  ┬┌─┐┬─┐┬  ┌─┐┌─┐ *
   * │ │└┐┌┘├┤ ├┬┘│  ├─┤├─┘ *
   * └─┘ └┘ └─┘┴└─┴─┘┴ ┴┴   *
   **************************/

  /**
   * Finds the common area shared between two lines
   *
   * @param {object} line1 -
   * @param {object} line2 -
   * @returns {object}
   */
  function Overlap(line1, line2) {
    var /*idsArr, cacheRes
      , */thisBox, thatBox

/*    this.cache = new Cache()

    idsArr = [line1[0].id, line1[1].id, line2[0].id, line2[1].id]
    cacheRes = this.cache.find.apply(this.cache, idsArr)

    if (cacheRes) return cacheRes
*/
    thisBox = new Box(line1)
    thatBox = new Box(line2)

    this.left   = Math.max(thisBox.left,   thatBox.left)
    this.right  = Math.min(thisBox.right,  thatBox.right)
    this.top    = Math.max(thisBox.top,    thatBox.top)
    this.bottom = Math.min(thisBox.bottom, thatBox.bottom)

    return this
  }

  /**
   * sets parameters for a square based on a line from
   * one corner to the opposite corner
   *
   * @access private
   * @param {object} line - the information for the box
   * @returns {object}
   */
  function Box(line) {
    this.top    = Math.min(line[0].y, line[1].y)
    this.right  = Math.max(line[0].x, line[1].x)
    this.bottom = Math.max(line[0].y, line[1].y)
    this.left   = Math.min(line[0].x, line[1].x)
    return this
  }

  /**
   * tests if an `x, y` point is contained in a box
   *
   * @param {number} x - point x position
   * @param {number} y - point y position
   * @returns {boolean}
   */
  Overlap.prototype.contains = _.memoize(function(x, y) {
    var seq = sequential
    
    return seq(this.left, x, this.right) && seq(this.top, y, this.bottom)
  })

  /**************
   * ┬  ┬┌┐┌┌─┐ *
   * │  ││││├┤  *
   * ┴─┘┴┘└┘└─┘ *
   **************/

  /**
   * path between two points
   *
   * @param {object} settings - line options
   * @param {object} settings.????? - ????
   * @param {object} _super - parent object
   * @returns {object}
   */
  function Line(settings, _super) {
    this._super = _super
    this.id     = generateID()

    this.points = settings.points
    this.cache  = new Cache()

    return this
  }

  /**
   * gets the point where two lines cross
   *
   * MATH!
   * y = m(x-Px) + Py
   *
   * x,y are the coordinates of any point on the line
   * m is the slope of the line
   * Px , Py x and y coordinates of the given point P that defines the line
   *
   * y = (m(x) - m(Px)) + Py
   *
   * for example: 
   *
   * Point setup
   * ===============================================
   *
   * this.point[0]             // { x: 100, y: 100 }
   * m = this.getSlope()       // 1
   * y = (m(x) - m(Px)) + Py
   * y = (1(x) - 1(100)) + 100
   *
   * this.point[1]             // { x: 100, y: 200}
   * m = this.getSlope()       // 0
   * y = (m(x) - m(Px)) + Py
   * y = (0(x) - 0(100)) + 200
   *
   * solve for x
   * ===============================================
   *
   * (1(x) - 1(100)) + 100 = (0(x) - 0(100)) + 200
   * (1(x) - 100)    + 100 =  0(x)           + 200
   *                 - 100                   - 100
   * 1x    - 100           =  0x             + 100
   * -0x   + 100             -0x             + 100
   * 1x                    =                   200
   * /1                                        /1
   * x                     =                   200
   *
   * solve for y
   * ===============================================
   *
   * this.point[0]             // { x: 100, y: 100 }
   * m = this.getSlope()       // 1
   * x = 200                   // previously solved
   * y = (m(x) - m(Px)) + Py
   * y = (1(200) - 1(100)) + 100
   * y = 200     - 100     + 100
   * y = 200
   *
   * results
   * ===============================================
   *
   * { x: 200, y: 200 }
   *
   * @param {object}   settings
   * @param {object}   settings.against - Line to be compared to
   * @param {function} settings.callback - what to do with the results
   * @returns {object}
   */
  Line.prototype.getIntersetion = function(against) {
    // todo: error handling, i.e...
    // if (!settings.against.instanceof(Line)) throw new Error('need like objects to compare')

    var m0, px0, py0, m1, px1, py1
      , py, mpx0, mpx1, m01
      , x, y
      , results = {
          x: undefined
        , y: undefined
        }
      , overlap

    // `this` line information
    m0  = this.getSlope()
    px0 = this.points[0].x
    py0 = this.points[0].y

    // `against` line information
    m1  = against.getSlope()
    px1 = against.points[0].x
    py1 = against.points[0].y

    // parallel line check
    if (m0 === m1) return results

    // (m0(x) - m0(px0)) + py0 = (m1(x) - m1(px1)) + py1
    //                   - py0                     - py0
    // (m0(x) - m0(px0))       = (m1(x) - m1(px1)) + py
    py   = py1 - py0
    // (m0(x) - m0(px0))       = (m1(x) - m1(px1)) + py
    mpx0 = m0 * px0
    mpx1 = m1 * px1
    // m0(x) - mpx0            = (m1(x) - mpx1)    + py
    //       + mpx0                                + mpx0
    // m0(x)                   =  m1(x) - mpx1     + py + mpx0
    // -m1(x)                    -m1(x)
    // (m0-m1)(x)              =        - mpx1     + py + mpx0
    // (m01)(x)                =        - mpx1     + py + mpx0
    // /m01                      /m01
    // x                       =       (- mpx1     + py + mpx0) / m01
    m01 = m0 - m1

    // if there's not slope, change how the point is calculated
    if (px0 === this.points[1].x) {
      x = px0
      y = ((m1*x) - (m1*px1)) + py1
    } else if (px1 === against.points[1].x) {
      x = px1
      y = ((m0*x) - (m0*px0)) + py0
    } else {
      x = ((mpx1 * -1) + py + mpx0) / m01
      y = ((m0*x) - (m0*px0)) + py0
    }

    // weird math things happen when a new line is
    // created and it's just a point, not a line.
    // this helps to prevent the resulting errors
    if (_.isNaN(x) || _.isNaN(y)) return results // throw new Error('point shouldn\'t be NaN')

    // if x is not between left most x and right most x
    // and y is not between left most y and right most y
    // for each line
    overlap = new Overlap(this.points, against.points)
    if (overlap.contains(x, y)) {
      results.x = x
      results.y = y
    }

    return results
  }

  /**
   * compare all lines
   *
   * @returns {array}
   */
  Line.prototype.getIntersetions = function() {
    var results = []
      , cache   = this._super.cache

    _.chain(this._super.items)
      // don't compare `this` to itself
      .reject(function(line) {
        return this.id === line.id
      }, this)
      .each(function(line){
        var cached = cache.find(this.id, line.id)
          , res = (!!cached) ? cached : this.getIntersetion(line)

        // if (cached) {
        //   debugger
        // }
        if (res && res.x && res.y) {
          results.push(res)
        }

        if (!cached) cache.save([this.id, line.id], res)
      }, this)
      .value()

    // should return points
    return results
  }

  /**
   * get the slope of a line
   *
   * MATH!
   * slope = rise / run
   *
   * @returns {number}
   */
  Line.prototype.getSlope = function() {
    var x1, x2, y1, y2
      , rise, run, angle
      // stop doing math for information we already have
      , res = this.cache.find('slope')

    if (!_.isUndefined(res)) return res

    x1    = this.points[0].x
    x2    = this.points[1].x
    y1    = this.points[0].y
    y2    = this.points[1].y
    rise  = Math.abs(y2 - y1)
    run   = Math.abs(x2 - x1)
    // if slope increases or decreases
    angle = (x1 < x2 && y1 < y2 || x1 > x2 && y1 > y2) ? 1 : -1
    res   = (rise / run) * angle

    this.cache.save('slope', res)

    return res
  }

  /***********************
   *     END CLASSES     *
   ***********************/

  /***********************
   *   BEGIN CONSTANTS   *
   ***********************/

  var $stage  = $('canvas')
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
    .addItem({
      points: [new Point({x: 325, y: 350}), new Point({x: 375, y: 300})]
    })
    .addItem({
      points: [new Point({x: 150, y: 400}), new Point({x: 250, y: 300})]
    })
    .addItem({
      points: [new Point({x: 175, y: 200}), new Point({x: 175, y: 350})]
    })
    .addItem({
      points: [new Point({x: 100, y: 325}), new Point({x: 500, y: 325})]
    })
    .addItem({
      points: [new Point({x: 100, y: 225}), new Point({x: 150, y: 225})]
    })

  for (var i = 0; i <= 10; i++) {
    var x1 = getRandomArbitrary(0, 600)
      , y1 = getRandomArbitrary(0, 600)
      , x2 = getRandomArbitrary(0, 600)
      , y2 = getRandomArbitrary(0, 600)
    lines.addItem({
      points: [new Point({x: x1, y: y1}), new Point({x: x2, y: y2})]
    })
  };
    // .addItem({
    //   points: [new Point({x: 100, y: 100}), new Point({x: 250, y: 101})]
    // })
    // .addItem({
    //   points: [new Point({x: 50, y: 150}), new Point({x: 300, y: 150})]
    // })
    // .addItem({
    //   points: [new Point({x: 150, y: 200}), new Point({x: 350, y: 200})]
    // })
    // .addItem({
    //   points: [new Point({x: 0, y: 250}), new Point({x: 200, y: 250})]
    // })
    // .addItem({
    //   points: [new Point({x: 150, y: 300}), new Point({x: 200, y: 300})]
    // })
    // .addItem({
    //   points: [new Point({x: 0, y: 350}), new Point({x: 300, y: 350})]
    // })
    // .addItem({
    //   points: [new Point({x: 500, y: 400}), new Point({x: 600, y: 400})]
    // })

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


  // _.each(tris.items, drawTriangles)

// }(jQuery, window))