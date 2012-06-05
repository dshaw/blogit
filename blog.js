/*!
 * blogit
 * Copyright(c) 2012 Daniel D. Shaw <dshaw@dshaw.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var fs = require('fs')
  , http = require('http')
  , path = require('path')
  , ejs = require('ejs')
  , optimist = require('optimist')
  , Templar = require('templar')
  , posts = require('./lib/posts')
  , maple = require('mapleTree')
  , router = new maple.RouteTree()
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

  // router configuration
  router.define('/', function (req, res) {
    posts(options, function (err, entries) {
      res.template = Templar(req, res, templarOptions)
      res.template('layout.ejs', { entries: entries })
    })
  })

  // route static files
  router.define('/*', function (req, res) {
    var file = path.join('public', req.url)
    fs.readFile(file, function (err, data) {
      if (err) {
        res.statusCode = 404
        return res.end()
      }

      res.end(data)
    })
  })

  return http.createServer(function (req, res) {
    router.match(req.url).fn(req, res)
  }).listen(options.port)
}