var file = require("../models/file.js")
exports.showIndex = function(req,res){
    res.render("index",{
    	"albums":file.getAllAlbums()
    });
}

exports.showAlbum = function(req,res){

}