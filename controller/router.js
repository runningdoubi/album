var file = require("../models/file.js")
console.log(file.getAllAlbums)
exports.showIndex = function(req,res){
    res.render("index",{
    	"albums":file.getAllAlbums
    });
}

exports.showAlbum = function(req,res){

}