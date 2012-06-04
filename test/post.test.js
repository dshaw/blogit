var assert = require("assert"),
    mocha = require("mocha"),
    path = require("path"),
    post = require("../lib/post"),
    debug = console.log;

describe("Post", function () {
    var entry;

    before(function (done) {
        var postDir = path.join(__dirname, "./fixtures/blog/posts/test-post");

        post(postDir, function (err, data) {
            assert.ok(!err);
            entry = data;
            done();
        });
    });

    it("should produce an Object", function(done) {
        //debug(JSON.stringify(entry, null, 4));
        assert.equal(typeof entry, "object");
        done();
    });

    it("should have a `content` property", function(done) {
        assert.ok(entry.content);
        done();
    });

    it("should have a `name`", function(done) {
        assert.equal(entry.name, "Test Post");
        done();
    });

    it("should have a `name` property", function(done) {
        assert.equal(entry.name, "Test Post");
        done();
    });

    // NOTE: this should be optional.
    it("should have a `description` property", function(done) {
        assert.equal(entry.description, "This is a test blog-engine post.");
        done();
    });

    it("should have a `file` property", function(done) {
        assert.equal(entry.file, "test-post.md");
        done();
    });

    it("should have a `author` property", function(done) {
        assert.equal(entry.author, "Daniel D. Shaw <dshaw@dshaw.com> (http://dshaw.com)");
        done();
    });

    it("should have a `folder` property", function(done) {
        assert.equal(entry.folder, "/Users/dshaw/Dropbox/Voxer/code/blog-engine/test/fixtures/blog/posts/test-post");
        done();
    });

    it("should have the [optional] `keywords` property", function(done) {
        assert.ok(Array.isArray(entry.keywords));
        assert.deepEqual(entry.keywords, ["blog-engine", "test", "node.js"]);
        done();
    });

    it("should have a rendered `html` property", function(done) {
        assert.ok(entry.html);
        assert.equal(entry.html.slice(0, 26), "<h1>This is the title</h1>");
        done();
    });

});
