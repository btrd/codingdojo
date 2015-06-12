var express = require('express');
var Firebase = require("firebase");
var bodyParser = require('body-parser')

var myFirebaseRef = new Firebase("https://luminous-inferno-31.firebaseio.com/");

var app = express();

app.use(bodyParser.json())

app.get('/pets', function (req, res) {
  myFirebaseRef.on("value", function(snapshot) {
    res.json(snapshot.val());
  });
});

app.get('/addPets', function (req, res) {
  var defaultPet = [{"name":"Heidi","kind":"Dog","age":3}, {"name":"Pluto","kind":"Dog","age":14}, {"name":"Tobie","kind":"Dog","age":4}];
  myFirebaseRef.push({"name":"Heidi","kind":"Dog","age":3});
  myFirebaseRef.push({"name":"Pluto","kind":"Dog","age":14});
  myFirebaseRef.push({"name":"Tobie","kind":"Dog","age":4});
  res.send(defaultPet);
});

app.post('/pet', function (req, res) {
  myFirebaseRef.push(req.body);
  res.send(req.body);
});


app.listen(3000);
