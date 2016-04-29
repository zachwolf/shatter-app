(function(){

  var app   = window.app = window.app || {}
    , Cache = app.Cache

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
    debugger
    console.log('getIntersetion', this.id, against.id);
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

  /**
   * Changes color of a single line
   *
   * @returns {object}
   */
  Line.prototype.highlight = function() {


    return this;
  }

  app.Line = Line

}());

