var file = require("../models/file.js");
var formidable = require("formidable");
var path = require("path");
var fs = require("fs");
var sd = require("silly-datetime");

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

exports.showUp = function (req, res){
	var files = file.getAllAlbums((files) => {
        res.render("up", {
            "albums": files
        });
    });
}

exports.doPost = function (req, res){
	var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, "/../tempup");

	form.parse(req, (err, fields, files, next) => {
		if(err){
            next();
            return;
		}
		var size = parseInt(files.picture.size);
		if(size > 50000){
			res.send("文件过大");
			fs.unlink(files.picture.path);
			return;
		}
		var t = sd.format(new Date(), "YYYYMMDDHHmmss");
		var ran = parseInt(Math.random() * 89999 + 10000);
		var extname = path.extname(files.picture.name);
		var oldPath = files.picture.path;
		var newPath = path.join(__dirname, "/../uploads/" + fields.selectFile +"/"+ t + ran + extname);
		fs.rename(oldPath, newPath, function(){
            if(err){
            	res.send("rename err");
            	return;
            }
            res.send("上传成功")
		});
	});

	return;
}