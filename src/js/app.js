/**
 * app.js is the primary file that will be included in the browser
 */
(function($, window, undefined){

  var shatter = require('shatter')

  $(function(){
    /**
     * kick everything off now that the document is ready
     */

    console.log('hi!', shatter);
  })
}(jQuery, window))