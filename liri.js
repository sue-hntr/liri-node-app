//Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
require("dotenv").config();

//use axios to commmunicate APIs
var axios = require("axios");

//use this info to hide your APIS
var keys = require("./keys.js");

//declare moment.js
var moment = require('moment');
moment().format();

//require node-spotify-api to access spotify with node
var Spotify = require('node-spotify-api');

//spotify has 2 keys
var spotify = new Spotify(keys.spotify);  //does this refer to the keys.js or .env?

// COMPLETED CONCERT-THIS
//  `node liri.js concert-this <artist/band name here>`
if(process.argv[2] === "concert-this"){ 
// var concert_this = process.argv[2];
    var artist = process.argv[3];

    var concertQueryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    // console.log(concertQueryUrl);

    axios.get(concertQueryUrl).then(
        function(response) {
            // console.log(response.data[0]);
            // console.log ("XXXXXXXXX");
            for (var i = 0; i < response.data.length; i++){
                var venueName = response.data[i].venue.name;
                var venueLocateCity = response.data[i].venue.city;
                var venueLocateState = response.data[i].venue.region;
                var venueLocateCountry = response.data[i].venue.country;
                var oldVenueDate = response.data[i].datetime;
                var venueDate = moment(oldVenueDate).format("MM/DD/YYYY");
                
                console.log("Artist: " + artist +
                            " \nName of Venue: " + venueName +
                            " \nVenue Location: " + venueLocateCity+ ", " + venueLocateState + " " + venueLocateCountry + 
                            " \nDate of Event: " + venueDate +
                            "\n__________________________");
    
            } // close for
        } //close function response 
    ); //get then
} //close if concert-this



//    * `spotify-this-song`
// 2. `node liri.js spotify-this-song '<song name here>'`
// DEFAULT FOR NO SONG IS "THE SIGN" BY ACE OF BASE
// SINCE THERE ARE MULTIPLE RESULTS, I"VE USED THE API URI SEARCH FOR THE SONG
if((process.argv[2] === "spotify-this-song") && (!process.argv[3])){
   spotify
    .request("https://api.spotify.com/v1/albums/5UwIyIyFzkM7wKeGtRJPgB")
    .then(function(response) {
      console.log(response.artists[0].name);
      console.log(response.name);
    })
    .catch(function(err) {
      console.error('Error occurred: ' + err); 
    });
} else if ((process.argv[2] === "spotify-this-song") && (process.argv[3])){
            var song = process.argv.slice(3).join(" ");
            spotify
                .search({ type: 'track', query: song })
                .then(function(response) {
            //PUT CODE FOR RESPONSE INTO HERE OTHERWISE OUTSIDE OF SCOPE 
                    console.log("Artist's Name: ");
                    for (var j = 0; j < response.tracks.items[0].artists.length; j++){
                        console.log(response.tracks.items[0].artists[j].name);
                    }
                    console.log("Song's Name: " + response.tracks.items[0].name);
                    console.log("Album's Name: " + response.tracks.items[0].album.name);   
                })
                .catch(function(err) {
                console.log(err);
                });
                }




// THIS WORKS MAKE A COPY TO GET THE DEFAULT "THE SIGN"
// if((process.argv[2] === "spotify-this-song") && (!process.argv[3])){
//     console.log("The sign");
// }else if ((process.argv[2] === "spotify-this-song") && (process.argv[3])){
//     console.log(process.argv[3]);
// }
