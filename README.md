# liri-node-app

LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.
LIRI was created to help study Node.JS and CLIs or command line interfaces. 
Commands for API responses can be run using CLIs and do not need the browser.

to install liri-node-app:

make sure you have Node.js by running "node --v" in the terminal

If no error is returned, 
1) clone the repository in the terminal.
2) run "npm init"
3) run "npm install" to install node dependencies.
4) In order to access Spotify, you need to obtain your own API key information: 
4a) Navigate to the root of your project and run `npm init -y` &mdash; this will initialize a `package.json` file for your project. The `package.json` file is required for installing third party npm packages and saving their version numbers. If you fail to initialize a `package.json` file, it will be troublesome, and at times almost impossible for anyone else to run your code after cloning your project.

4b) Make a `.gitignore` file and add the following lines to it. This will tell git not to track these files, and thus they won't be committed to Github.

```
node_modules
.DS_Store
.env
```

4c) Make a JavaScript file named `keys.js`.

* Inside keys.js your file will look like this:

```js
console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
```

4d) Next, create a file named `.env`, add the following to it, replacing the values with your API keys (no quotes) once you have them:

```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

```

* This file will be used by the `dotenv` package to set what are known as environment variables to the global `process.env` object in node. These are values that are meant to be specific to the computer that node is running on, and since we are gitignoring this file, they won't be pushed to github &mdash; keeping our API key information private.

5) once you have completed the above you should begin testing LIRI in the terminal.
Liri has 4 commands and you can access them by typing them in the terminal. The first three commands by adding a search term at the end. The fourth command, "do-what-it-says", does not take in a parameter but instead accesses search terms from the file: "random.txt" using the node fs npm. The commands are:

node liri concert-this <artist>
node liri spotify-this-song <song>
node liri movie-this <movie name>
node liri do-what-it-says 

Sample results for these commands can be viewed in the following PNG files:

"concert-this" - sample search for "Sting"
"concert-this.png"

"spotify-this-song" - sample search for "Sunflower"
"spotify-this.png"

"movie-this" - sample search for "Jaws"
"movie-this.png"

"do-what-it-says" (no parameters)
"dowhat.png"
