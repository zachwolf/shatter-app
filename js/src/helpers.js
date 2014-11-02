/**
 * thanks to SciencePrimer.com for help with the math
 * http://scienceprimer.com/drawing-regular-polygons-javascript-canvas
 *
 * thanks to mathopenref.com for help with line intersection
 * http://www.mathopenref.com/coordintersection.html
 */
 
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