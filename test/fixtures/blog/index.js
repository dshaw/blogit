var blogit = require("../../../")
  , blog = blogit()

blog.on('listening', function () {
  console.log("Blog listening on ", blog.address())
})