 require("dotenv").config();

var request = require("request");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];
var userInput = process.argv[3];

//twitter
//This will show last 20 tweets
if (command === "my-tweets") {
  var params = {screen_name: 'soloriosquared'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (var i = 0; i < 20; i++) {
      console.log ( 
      "\nYour Tweet: " + tweets[i].text 
      + "\nOn: " + tweets[i].created_at 
      + "\n---------------------");
    };
  }
  else {
    console.log("Twitter Error occured")
  }
});
} 

//Spotify 
if (command === "spotify-this-song") {
  spotify.search({ type: 'track', query: userInput || 'The Sign', limit: 5 }, function (err, data) {
    
    if (!err) {
      for(var i = 0; i < data.tracks.items.length; i++) {
        var firstSong = data.tracks.items[i];
        
        console.log("Artist: " + firstSong.artists[0].name 
        + "\nSong Title: " + firstSong.name 
        + "\nAlbum: " + firstSong.album.name 
        + "\nSong Preview: " + firstSong.external_urls.spotify 
        + "\n-----------------------");
      };
    } else{
      console.log('Spotify error has occured' + err);
    }
  });
}

  //OMBD
  if (command === "movie-this") {
    var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
    request (queryUrl, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log("Title: " + JSON.parse(body).Title 
        + "\nRelease Year: " + JSON.parse(body).Year 
        + "\nIMBD Rating: " + JSON.parse(body).imdbRating
        + "\nPlot: " + JSON.parse(body).Plot
        + "\nLanguage: " + JSON.parse(body).Language
        + "\nActors: " + JSON.parse(body).Actors 
        + "\nRotten Tomatoes Ratings: " + JSON.parse(body).Ratings[0].Value
        + "\nCountry: " + JSON.parse(body).Country);
      };
    });
  }
  //random.txt
  if (command === "do-what-it-says") {
    fs.readFile("random.txt", "UTF8", function (err, data) {
      console.log(data);

      var myArray = data.split(",")
      console.log(myArray)
      
      spotify.search (
      { type: "track", query: myArray[1] || "All the Small Things", limit: 5 },
      function (err, data) {
          if (err) {
            return console.log("Text error occurred: " + err);
          }
      for (var i = 0; i <data.tracks.items.length; i++) {
        var firstTrack = data.tracks.items[i]; 1
          console.log("Artist: " + firstTrack.artists[0].name
          + "\nSong Title: " + firstTrack.name
          + "\nFrom album: " + firstTrack.album.name
          + "\nSong Preview: " + firstTrack.external_urls.spotify);
      };
    }
  );
    
  })
}


