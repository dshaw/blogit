/*!
 * blogit
 * Copyright(c) 2012 Daniel D. Shaw <dshaw@dshaw.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var http = require('http')
  , ejs = require('ejs')
  , optimist = require('optimist')
  , Templar = require('templar')
  , posts = require('./lib/posts')
  , defaults = { port: 9000, engine: 'ejs', posts: './posts', templates: './templates' }
  , options = null

/**
 * Exports.
 */

if (module.parent) {
  module.exports = function blogit (options) {
    options || (options = {})
    Object.keys(defaults).forEach(function (prop) {
      if (!options[prop]) options[prop] = defaults[prop]
    })
    return blog(options)
  }
} else {
  options = optimist.default(defaults).argv
  blog(options)
}

/**
 * Blog
 *
 * @param options
 * @return http.Server
 */

function blog(options) {
  var templarOptions = {
    engine: require(options.engine) // lazy load
  , folder: options.templates
  }

  // preload templates
  Templar.loadFolder(templarOptions.folder)

  return http.createServer(function (req, res) {
    posts(req, options, function (err, entries) {
      // note that this causes a sync fs hit the first time if the folder has not been loaded yet.
      res.template = Templar(req, res, templarOptions)
      res.template('layout.ejs', { entries:entries })
    })
  }).listen(options.port)
}