/**
 * app.js is the primary file that will be included in the browser
 */
(function($, window, undefined){

  require('polyfill')

  var Shatter = require('shatter')

  $(function(){
    /**
     * kick everything off now that the document is ready
     */
    console.log('hi!', new Shatter);
  })
}(jQuery, window))