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
  , debug = console.log

/**
 * Exports.
 */

module.exports = posts

/**
 * Posts
 *
 * @param req
 * @param options
 * @param callback
 */

function posts (req, options, callback) {
  if (typeof callback === 'undefined') {
    callback = options
    options = {}
  }

  var folder = (typeof options == 'string') ? options : options.posts
    , metaFile = path.join(folder, 'index.json')

  fs.readFile(metaFile, 'utf8', function (err, metadata) {
    if (err) return callback(err)

    var entryIds = JSON.parse(metadata)

    async.map(entryIds, function (id, cb) {
      var postDir = path.join(options.posts, id)
      post(postDir, function (err, entry) {
        cb(null, entry)
      })
    }, function(err, entries) {
      if (err) return callback(err)
      //debug('entries', entries)
      callback(null, entries)
    })
  })
}
