var fs = require("fs"),
    path = require("path");

module.exports = posts;

function posts (req, options, callback) {
  if (typeof callback === 'undefined') {
    callback = options
    options = {}
  }

  var folder = (typeof options == "string") ? options : options.posts,
      metaFile = path.join(folder, "index.json");

  fs.readFile(metaFile, "utf8", function (err, metadata) {
    if (err) return callback(err);

    var entryIds = JSON.parse(metadata)
      , entryCount = entryIds.length
      , postDir = path.join(__dirname, options.posts, entryIds[0])
      , entries = []

    post(postDir, function (err, data) {
      entries.push(data)
      console.log(entries)
      callback(null, entries);
    })

    //gather(entryCount, function () {})
  });
}

function gather (count, callback) {
  if (count === 0) callback()
  else count--
}