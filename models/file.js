var fs = require("fs");
var uploadsURL = "./uploads";

exports.getAllAlbums = (callback) => {
    new Promise((resolve, reject) => {
        fs.readdir(uploadsURL, (err, files) => {
            if (err) {
                reject(err);
            }
            resolve(files);
        })
    }).then((files) => {
        var albums = [];
        var len = files.length;
        (function isDir(i) {
            if (i == len){
                callback(albums);
                return;
            };
            fs.stat(`${uploadsURL}/${files[i]}`, (err, stats) => {
                if (stats.isDirectory()) {
                    albums.push(files[i]);
                }
                i++;
                isDir(i);
            })
        })(0);
    }, (err) => {
        console.log(err);
    });
}

