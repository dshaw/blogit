/*!
 * blogit
 * Copyright(c) 2012 Daniel D. Shaw <dshaw@dshaw.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var fs = require('fs')
  , path = require('path')
  , marked = require('marked')

/**
 * Exports.
 */

module.exports = render

/**
 * Configuration.
 */

marked.setOptions({
    gfm: true
  , pedantic: false
  , sanitize: true
//    ,
    // callback for code highlighter
//    highlight: function(code, lang) {
//        if (lang === 'js') {
//            return javascriptHighlighter(code);
//        }
//        return code
//    }
})

/**
 * Render
 *
 * @param options
 * @param callback
 */

function render(options, callback) {
  if (typeof callback === 'undefined') {
    callback = options
    options = {}
  }

  var data = (typeof options == 'string')
           ? options
           : (options && typeof options.data == 'string') ?  options.data : ""
    , html = marked(data)

  callback(null, html)
}
