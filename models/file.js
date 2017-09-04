var fs = require("fs");
const uploadsURL = "./uploads";

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

exports.getAllImageByAlbumName = (albumName, callback) => {
	fs.readdir(`${uploadsURL}/${albumName}`, (err, files) => {
		var images = [];
		if(err){
			callback(err, images);
			return;
		}
        var len = files.length;
        (function isImg(i) {
            if (i == len){
                callback(null, images);
                return;
            };
            fs.stat(`${uploadsURL}/${albumName}/${files[i]}`, (err, stats) => {
                if (stats.isFile()) {
                    images.push(files[i]);
                }
                i++;
                isImg(i);
            })
        })(0);
	});
}