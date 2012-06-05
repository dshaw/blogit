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
  , async = require('async')
  , post = require('./post.js')

/**
 * Exports.
 */

module.exports = posts

/**
 * Posts
 *
 * @param options
 * @param callback
 */

function posts (options, callback) {
  if (typeof callback === 'undefined') {
    callback = options
    options = {}
  }

  var folder = folder = (typeof options == 'string') ? options : options && options.posts || './posts'
    , file = path.join(folder, 'index.json')

  fs.readFile(file, 'utf8', function (err, data) {
    if (err) return callback(err)

    var ids = JSON.parse(data)
    async.map(ids, function (id, cb) {
      var dir = path.join(folder, id)
      post(dir, function (err, entry) {
        cb(null, entry)
      })
    }, function(err, entries) {
      if (err) return callback(err)
      callback(null, entries)
    })
  })
}
