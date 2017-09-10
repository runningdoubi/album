var express = require("express");
var router = require("./controller/router.js");

var app = express();

app.set("view engine","ejs");

app.use(express.static("./public"));
app.use(express.static("./uploads"));

app.get("/",router.showIndex);
app.get("/up",router.showUp);
app.post("/up",router.doPost);

app.get("/:albumName",router.showAlbum);

app.use((req, res) => {
    res.render("404");
})

app.listen(3000,function(err){
    console.log("正在监听3000端口");
});