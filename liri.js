require("dotenv").config();

var moment = require("moment")
var keys = require("./keys.js");
//var spotify = new Spotify(keys.spotify);

var axios = require("axios")

var input = process.argv
var command = input[2]

if (command == "concert-this"){
    artist = input[3]
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

else if (command == "movie-this"){
    movie = input[3]
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