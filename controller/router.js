var file = require("../models/file.js")

exports.showIndex = function(req, res) {
    var files = file.getAllAlbums((files) => {
        res.render("index", {
            "albums": files
        });
    });
}

exports.showAlbum = function(req, res) {
    var albumName = req.params.albumName;
    file.getAllImageByAlbumName(albumName, (err, imgArray) => {
        if (err) {
            console.log(err);
        }
        res.render("album", {
            "albumName": albumName,
            "images": imgArray
        });

    })
}