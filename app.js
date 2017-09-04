var express = require("express");
var router = require("./controller/router.js");

var app = express();

app.set("view engine","ejs");

app.use(express.static("./public"));
app.get("/",router.showIndex);
app.get("/:albumName",router.showAlbum)

app.listen(3000,function(err){
    console.log("正在监听3000端口");
});