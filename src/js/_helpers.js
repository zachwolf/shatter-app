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
    , uuid = str.replace(exp, _replaceID)
  return uuid
}

/**
 * Replaces a character with another random character
 *
 * @access private
 * @param {string} c - single character
 * @returns {string}
 */
function _replaceID(c) {
  var r = (d + Math.random() * 16) % 16 | 0
  d = Math.floor(d/16)
  return ( c=='x' ? r : (r&0x7 | 0x8) ).toString(16)
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
 * Expose functions
 */
module.exports = {
    fibonacci: fibonacci
  , getHypotenuseLength: getHypotenuseLength
  , getFurthestCorner: getFurthestCorner
  , getCircumference: getCircumference
  , getRandomArbitrary: getRandomArbitrary
  , generateID: generateID
  , sequential: sequential
  , getHypotenuseLength: getHypotenuseLength
}