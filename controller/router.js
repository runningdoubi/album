var file = require("../models/file.js")
var files = file.getAllAlbums((files) => {
	console.log(files)
    return files;
});
console.log(files);
exports.showIndex = function(req, res) {
    res.render("index", {
        "albums": ['1','2','3']

    });
}

exports.showAlbum = function(req, res) {

}