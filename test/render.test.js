var assert = require("assert"),
    mocha = require("mocha"),
    render = require("../lib/render"),
    debug = console.log;

describe("Render", function () {
    var entry;

    before(function (done) {
        var content = require("./fixtures/post.fixture.json").content;

        render(content, function (err, data) {
            assert.ok(!err);
            entry = data;
            done();
        });
    });

    it("should produce an String", function(done) {
        //debug(JSON.stringify(entry, null, 4));
        assert.equal(typeof entry, "string");
        done();
    });

    it("should have a render html", function(done) {
        assert.equal(entry.slice(0, 26), "<h1>This is the title</h1>");
        done();
    });

});
