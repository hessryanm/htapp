var express = require("express");
var http = require("http");
var connect = require("connect");
var app = express();

app.use(connect.static(__dirname + '/public'))

app.get("/json", function(request, response) {
	response.send({
		firstName: "Isaac",
		lastName: "Hess"
	})
})

app.post("/post")

app.get("*", function(request, response) {
	response.sendfile("index.html");
})


http.createServer(app).listen(1337);