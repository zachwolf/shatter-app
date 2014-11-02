console.log('---------')
;(function($, window){
  'use strict';

  /**
   * thanks to SciencePrimer.com for help with the math
   * http://scienceprimer.com/drawing-regular-polygons-javascript-canvas
   */

  // requestAnimationFrame Shim
  (function() {
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
   * returns an array of fibonacci sequence numbers
   *
   * @param (Number|Function) limit - length of array requested
   * @param Array [arr] - internal variable used for recursive calls
   * @returns Array
   */
  function fibonacci(limit, _arr) {
    var arr = _arr || [0, 1]
      , val = arr[arr.length - 2] + arr[arr.length - 1]
    
    if(_.isFunction(limit)) {
      if (!limit(val, arr.length)) {
        return arr
      }
    } else if (_.isNumber(limit) && arr.length >= limit) {
      return arr
    }

    arr.push(val)

    return fibonacci(limit, arr)
  }

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
   * finds the furthest corner in a square from a given point
   * 
   * @param Number x1 - the points x
   * @param Number y1 - the points y
   * @param Number width - container height
   * @param Number height - container width
   * @returns Array [Number, Number]
   */
  function getFurthestCorner(x, y, width, height) {
    var resX = (x >= width  / 2) ? 0 : width
      , resY = (y >= height / 2) ? 0 : width
    
    return [resX, resY]
  }

  /**
   * Gets the circumfernce of a circle
   *
   * @param {Number} diam - diameter of the circle
   * @returns {Number}
   */
  function getCircumference(diam) {
    return Math.PI * diam
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

  /***********************
   * END PRIVATE METHODS *
   ***********************/

  /***********************
   *    BEGIN CLASSES    *
   ***********************/

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


  /**************************
   * ┌┬┐┬─┐┬┌─┐┌┐┌┌─┐┬  ┌─┐ *
   *  │ ├┬┘│├─┤││││ ┬│  ├┤  *
   *  ┴ ┴└─┴┴ ┴┘└┘└─┘┴─┘└─┘ *
   **************************/

   /**
    * object composed of three Points
    *
    * @param {object} settings
    * @param {array|object} settings.points - triangles corners
    * @param {object} _super - reference to Holder, probably shouldn't be modified manually
    * @returns {object}
    */
  function Triangle(settings, _super) {
    this.id = generateID()
    // add use super if you need access to the parent container
    // this._super = _super

    this.points = (_.isArray(settings.points)) ? settings.points : [settings.points]

    var fn = {
      1: function() {
        // find 2 clostest
        var magicNumber = 20
          , origin      = this.points[0]
          , res         = origin.getClosest(magicNumber)

        res = _.filter(res, function(point) {
          return origin.angle !== point.angle
        })

        this.points = this.points.concat(res.splice(0, 2))
        return this
      }
    , 2: function() {
        // find 1 clostest
        // console.log('2')
      }
    , 3: function() {
        // console.log('good to go')
        return this
      }
    , err: function() {
        // todo? error handling
        // console.log('err')
      }
    }

    var x = ((fn[this.points.length]) ? fn[this.points.length] : fn.err).call(this)

    // debugger

    return x
  }


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
    this.angle = settings.angle

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
    , shatter = new Shatter({
        x: stage.width  / 3
      , y: stage.height / 3
      , stage: stage
      })
    , diameters = fibonacci(function(val, count){
       // return val < shatter.hypotenuse
        return count < 3
      }, [13, 21])
    , points = new Holder(Point)
    , tris   = new Holder(Triangle)

  /***********************
   *    END CONSTANTS    *
   ***********************/

  /*************
   * ┌─┐┌─┐┌─┐ *
   * ├─┤├─┘├─┘ *
   * ┴ ┴┴  ┴   *
   *************/

  // probably better Math.random
  // https://github.com/davidbau/seedrandom
  Math.seedrandom()

  /**
   * Creates the points to be used to draw everything else
   *
   * @returns {Array}
   */
  function makePoints(diameter, key) {
    var circ          = getCircumference(diameter)
      , numberOfSides = 5 //getRandomArbitrary(5 + key, 10 + key)
      , fuzz          = 0 //getRandomArbitrary(0, 40) //
      , angleOffset   = 0 //Math.random() * 90

    // console.log(numberOfSides)

    for (var i = 1, x, y, angle; i <= numberOfSides; i += 1) {
      angle = i * 2 * Math.PI / numberOfSides

      x = Math.round(shatter.x + ((diameter + fuzz) * Math.cos(angle + angleOffset)))
      y = Math.round(shatter.y + ((diameter + fuzz) * Math.sin(angle + angleOffset)))

      points.addItem({
        x: x
      , y: y
      , angle: angle})
    }

  }

  /**
   * Draws each point
   *
   * @param {Object} point - Point
   * @returns {string}
   */
  function drawPoints(point) {
    ctx.set('strokeStyle', '#fe11a5')
       .fillRect(point.x, point.y, 2, 2)
  }

  /**
   * Draws each triangle
   *
   * @param {Object} tri - Triangle
   * @returns {string}
   */
  function drawTriangles(tri) {
    console.log(tri);
    ctx.set('strokeStyle', '#fe11a5')
       .beginPath()
       .moveTo(tri.points[0].x, tri.points[0].y)
       .lineTo(tri.points[1].x, tri.points[1].y)
       .lineTo(tri.points[2].x, tri.points[2].y)
       .closePath()
       .stroke()
  }
  
  _.each(diameters, makePoints)
  
  // temp add a triangle until they're generated dynamically
  // tris
  //   .addItem({
  //     points: points.items[0]
  //   })
  //   .addItem({
  //     points: points.items[3]
  //   })
    // .addItem({
    //   points: [points.items[0], points.items[1], points.items[2]]
    // })
    // .addItem({
    //   points: [points.items[0], points.items[1], points.items[2], points.items[3]]
    // })
  

  _.each(points.items, drawPoints)
  
  console.log(tris);
  _.each(points.items, function(point){
    tris.addItem({
      points: point
    })
  })
  
  var count = 0
    , am

  function raf (item) {
    console.log(count);
    if (count > tris.items.length) debugger
    am = requestAnimationFrame(function(){
      console.log(tris.items[count]);
      drawTriangles(tris.items[count])
      count++
      raf(tris.items[count])
    })
  }

  setTimeout(function(){

    raf(tris.items[count])
  }, 10)

  // _.each(tris.items, drawTriangles)

}(jQuery, window))