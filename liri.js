//Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
require("dotenv").config();
//use axios to commmunicate APIs
var axios = require("axios");
//use fs to access other files for search info in "do-what-it-says"
var fs = require("fs");
//use this info to hide your APIS
var keys = require("./keys.js");
//declare moment.js
var moment = require('moment');
moment().format();
//require node-spotify-api to access spotify with node
var Spotify = require('node-spotify-api');
//spotify has 2 keys                           
var spotify = new Spotify(keys.spotify);  //does this refer to the keys.js or .env?

var liriCommand = process.argv[2];
var liriTerm = process.argv.slice(3).join(" ");





var pick = function(liriCommand, liriTerm){

switch(liriCommand) {
    case "do-what-it-says":
    if((liriCommand === "do-what-it-says") && (!liriTerm )){
    //this reads the content of random.text and outputs:
            //spotify-this-song,"I Want it That Way" 
                fs.readFile('random.txt', 'utf8', (err, data) => {
                    if (err) throw err;
                    console.log(data);
                    var stringRandom = data;
                    // split the text into an array using , as divider
                    var arrayRandom = stringRandom.split(',');
            //check to see if the arrayRandom[1] contains " "
                    var doitAttr = arrayRandom[1].indexOf('"');
            //remove " " from arrayRandom[1] 2 times
                    var x = arrayRandom[1].replace('"', '');
                    var y = x.replace('"', '');
                    var z = arrayRandom[0];
                    console.log("node " + z + " " + y);
                    liriCommand =  z;
                    liriTerm = y;
                    console.log("DO-IT-COMMAND: " + liriCommand);
                    console.log("DO-IT-TERM: " + liriTerm);
                    pick (liriCommand, liriTerm);
                    
                }); 
            } //close if do what it says
            break;

case "concert-this":
    if((liriCommand === "concert-this") && (!liriTerm)){
    console.log("Liri Command 'Concert-This' requires an artist's name. Please try again.");
        } else if ((liriCommand === "concert-this") && (liriTerm)){
            var artist = liriTerm;
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
        break;

case "spotify-this-song":
    // 2. `node liri.js spotify-this-song '<song name here>'`
        // DEFAULT FOR NO SONG IS "THE SIGN" BY ACE OF BASE
        // SINCE THERE ARE MULTIPLE RESULTS, I"VE USED THE API URI SEARCH FOR THE SONG
        if((liriCommand === "spotify-this-song") && (!liriTerm)){
            spotify
            .request("https://api.spotify.com/v1/albums/5UwIyIyFzkM7wKeGtRJPgB")
            .then(function(response) {
            console.log(response.artists[0].name);
            console.log(response.name);
            })
            .catch(function(err) {
            console.error('Error occurred: ' + err); 
            });
        } else if ((liriCommand === "spotify-this-song") && (liriTerm)){
                var song = liriTerm;
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
            } //close if
            break;
    

    case "movie-this":
            if((liriCommand === "movie-this") && (!liriTerm)){
                var movie = "Mr. Nobody";
            } else if ((liriCommand === "movie-this") && (liriTerm)){
                var movie = liriTerm;
            }
                var movieQueryUrl = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=1929ae9f";
                // console.log(concertQueryUrl);

                axios.get(movieQueryUrl).then(
                    function(response) {
                        var x = response.data;
                        var title = x.Title;
                        var year = x.Year;
                        var imdbRating = x.Ratings[0].Value;
                        var rtRating = x.Ratings[1].Value;
                        var country = x.Country;
                        var language = x.Language;
                        var plot = x.Plot;
                        var actors = x.Actors;
                        console.log(
                            "Title of the Movie: " + title +
                            "\nYear the movie came out: " + year +
                            "\nIMDB Rating: " + imdbRating +
                            "\nRotten Tomatoes Rating: " + rtRating +
                            "\nCountry Produced: " + country +
                            "\nLanguage(s): " + language +
                            "\nPlot: " + plot +
                            "\nActors: " + actors                 
                            ); //close console.log
                    } // close f response
                ); // close axios get
                break;
                }
            }

pick(liriCommand, liriTerm);
