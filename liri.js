// require("dotenv").config();

var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var request = require("require");
var client = new Twitter(keys.twitter);
var fs = require("fs");

console.log(keys.twitter);