require("dotenv").config();
var fs = require("file-system")
var moment = require("moment")
var keys = require("./keys.js");
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);

var axios = require("axios")
var input = process.argv
var command = input[2]
var arg = input.slice(3).join(" ")

function concertThis(artist){
    axios({
        method: "get",
        url: "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp",
    }).then(function(res){
        for (var i = 0; i < res.data.length; i++){
            console.log("Venue: " + res.data[i].venue.name)
            console.log("Location: " + res.data[i].venue.city)
            dateTime = res.data[i].datetime
            date = moment(dateTime).format('MM/DD/YYYY')
            console.log("Date: " + date)
            console.log("*************************")}
    })
}

function movieThis(movie){
    axios({
        method: "get",
        url: "http://www.omdbapi.com/?apikey=trilogy&t=" + movie

}).then(function(res){
    console.log("Title: " + res.data.Title)
    console.log("Release Year: " + res.data.Year)
    console.log("IMDB Rating: " + res.data.imdbRating)
    console.log("Rotten Tomatoe Rating: " + res.data.Ratings[1].Value)
    console.log("Country: " + res.data.Country)
    console.log("Language: " + res.data.Language)
    console.log("Plot: " + res.data.Plot)
    console.log("Actors: " + res.data.Actors)
})
}

function songThis(song){
    spotify.search({ type: 'track', query: song }, function(err, data) { if (err) {
        return console.log('Error occurred: ' + err);
      }
      
     for(var i = 0 ; i < data.tracks.items.length; i++){
        console.log("Song Name: " + data.tracks.items[i].name)
        console.log("Preview: " + data.tracks.items[i].external_urls.spotify)
        console.log("Album: " + data.tracks.items[i].album.name)
    
      for (var j = 0; j < data.tracks.items[i].artists.length; j++){
      console.log("Artists: " + data.tracks.items[i].artists[j].name)}
      console.log("***********************")  }; 
    });
}

function doWhatever(){
    fs.readFile("./random.txt", "utf8", function(err, data){
    data = data.split(",")
    var count = Math.floor(data.length / 2)
    console.log(count)
    for (var i =0 ; i < count; i++){
        command = data[i * 2]
        randArg = data [(i * 2) + 1]
        checkCommand(randArg)
    }

    })
}

function checkCommand(arg){
if(command == "movie-this") {movieThis(arg)}
else if(command == "concert-this") {concertThis(arg)}
else if (command == "spotify-this-song") {songThis(arg)}
else if (command == "do-what-it-says") {doWhatever()} }

checkCommand(arg)

