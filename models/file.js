var fs = require("fs");

var uploadsURL = "./uploads";

function getAllFiles() {
    return new Promise((resolve, reject) => {
        fs.readdir(uploadsURL, (err, files) => {
            resolve(files);
        })
    })
}

function getDirectory(files) {
    return new Promise((resolve, reject) => {
        var allAlbums = [];
        for (var i = 0; i < files.length; i++) {
            (function(i) {
                fs.stat(`${uploadsURL}/${files[i]}`, (err, stats) => {
                    if (stats.isDirectory()) {
                        allAlbums.push(files[i]);
                    }
                    if (i == files.length-1) {
                        resolve(allAlbums);
                        console.log("allAlbums", allAlbums);
                    }
                })
            })(i)
        }
    })
}
exports.getAllAlbums = () => {
    var files = getAllFiles();
    var allAlbums = getDirectory(files);
    console.log(allAlbums);
    return allAlbums;
};