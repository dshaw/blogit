var assert = require("assert"),
    mocha = require("mocha"),
    request = require("request"),
    Blog = require("../blog"),
    debug = console.log;

describe("Blog", function () {
    var port = 9000,
        blog;

    before(function (done) {
        blog = Blog({ port: port, posts: "./test/fixtures/blog/posts", templates: "./test/fixtures/blog/templates" });

        blog.on('listening', function () {
            console.log("Blog listening.")
            done()
        })
    });

    it("should serve up the blog", function(done) {
        request("http://localhost:9000", function (err, res, body) {
            debug(body);
            assert.equal(typeof body, "string");
            assert.equal(body.slice(0, 15), "<!DOCTYPE html>");
            done();
        })
    });

});
