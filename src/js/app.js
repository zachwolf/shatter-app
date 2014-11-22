/**
 * app.js is the primary file that will be included in the browser
 */
(function($, window, undefined){

  var Grid   = require('canvas-grid')/*
    , config = require('config')*/

  $(function(){
    /**
     * kick everything off now that the document is ready
     */

    new Grid({
      el: ".photogrid"
    })

  })
}(jQuery, window))