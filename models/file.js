var fs = require("fs");

var uploadsURL = "./uploads";
var allAlbums = [];

(() => {
    var promise = new Promise((resolve, reject) => {
        fs.readdir(uploadsURL, (err, files) => {
            resolve(files);
        })
    }).then((files) => {
        var albumsFiles = [];
        var promise2 = new Promise((resolve, reject) => {
            files.forEach((file, index) => {
                fs.stat(`${uploadsURL}/${file}`, (err, stats) => {
                    if (stats.isDirectory()) {
                        albumsFiles.push(file);
                        if (index == files.length - 1) {
                            resolve(albumsFiles);
                        }
                    }
                })
            });
        }).then((albumsFiles) => {
            allAlbums = albumsFiles;
            console.log(allAlbums)
        })
    });
})();

function getAllFiles() {
    new Promise((resolve, reject) => {
        fs.readdir(uploadsURL, (err, files) => {
            resolve(files);
        })
    })
}

function getDirectory(files) {
    var allAlbums = [];
    new Promise((resolve, reject) => {
        for (let i = 0; i < files.length; i++) {
            fs.stat(`${uploadsURL}/${files[i]}`, (err, stats) => {
                if (stats.isDirectory()) {
                    allAlbums.push(files[i]);
                }
                if (i == files.length - 1) {
                    resolve(allAlbums);
                    console.log("allAlbums1", allAlbums);
                }
            })
        }
    })
}
exports.getAllAlbums = allAlbums;