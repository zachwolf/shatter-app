/**
 * app.js is the primary file that will be included in the browser
 */
(function($, window, undefined){

  require('polyfill')

  // probably better Math.random
  // https://github.com/davidbau/seedrandom
  Math.seedrandom()

  var Shatter = require('shatter')
    , Chain = require('class/chain.class')

  $(function(){
    /**
     * kick everything off now that the document is ready
     */
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
  })
}(jQuery, window))