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
  , render = require('./render')

/**
 * Exports.
 */

module.exports = post;

/**
 * Post
 *
 * @param options
 * @param callback
 */

function post(options, callback) {
  options || (options = {})

  var folder = (typeof options == 'string') ? options : options.folder
    , metaFile = path.join(folder, 'blog.json');

  fs.readFile(metaFile, 'utf8', function (err, metadata) {
    if (err) return callback(err)

    var entry = JSON.parse(metadata)
      , postFile = path.join(folder, entry.file)

    fs.readFile(postFile, 'utf8', function (err, content) {
      if (err) return callback(err)

      entry.folder = folder
      entry.format = 'md'
      entry.content = content

      render(content, function (err, html) {
        if (err) return callback(err)

        entry.html = html
        callback(null, entry)
      })
    })
  })
}
