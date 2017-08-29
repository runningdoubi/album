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
        for (let i of files) {
            fs.stat(`${uploadsURL}/${i}`, (err, stats) => {
                if (stats.isDirectory()) {
                    allAlbums.push(files[i]);
                }
            })
        }
        resolve(allAlbums);
    })
}
exports.getAllAlbums = (async () => {
	var files = await getAllFiles();
	var allAlbums = await getDirectory(files);
	return allAlbums;
})();
