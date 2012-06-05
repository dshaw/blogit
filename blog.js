/**
 * Module dependencies.
 */

var http = require('http')
  , _ = require('lodash')
  , ejs = require('ejs')
  , optimist = require('optimist')
  , Templar = require('templar')
  , posts = require('./lib/posts')
  , defaults = { port: 9000, engine: 'ejs', posts: './posts' , templates: './templates' }
  , options = null;

/**
 * Exports.
 */

if (module.parent) {
    module.exports = function blogit (options) {
        options || (options = {})
        options = _.extend(defaults, options)
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

function blog (options) {
    var templarOptions = {
        // lazy load
        engine: require(options.engine),
        folder: options.templates
    }

    // preload templates
    Templar.loadFolder(templarOptions.folder)

    return http.createServer(function (req, res) {
        posts(req, options, function (err, entries) {
            // note that this causes a sync fs hit the first time if the folder has not been loaded yet.
            res.template = Templar(req, res, templarOptions)
            res.template('layout.ejs', { entries: entries })
        })
    }).listen(options.port)
}