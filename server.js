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
  var defaultPet = [{"name":"Heidi","kind":"Dog","age":3}, {"name":"Pluto","kind":"Dog","age":14}, {"name":"Heidi","kind":"Dog","age":4}];
  myFirebaseRef.set(defaultPet);
  res.send(defaultPet);
});

app.post('/pet', function (req, res) {
  res.send(req.body);
  myFirebaseRef.push(req.body);
});


app.listen(3000);
