var fs = require("fs"),
    path = require("path"),
    marked = require("marked");

module.exports = render;

marked.setOptions({
    gfm: true,
    pedantic: false,
    sanitize: true
//    ,
    // callback for code highlighter
//    highlight: function(code, lang) {
//        if (lang === "js") {
//            return javascriptHighlighter(code);
//        }
//        return code;
//    }
});

function render(options, callback) {
    options || (options = {});

    var data = (typeof options == "string") ? options : options.data,
        html = marked(data);

    callback(null, html)
}
