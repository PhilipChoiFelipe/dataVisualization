const fs = require('fs');
const wta_players = require('./data/wta_players.json');

// convert users.csv file to JSON array
const playerCountry = {}
for (var player of wta_players) {
    console.log(player)
    let playerCode = player["200000"]
    let country = player["UNK"]
    playerCountry[playerCode] = country
    // write JSON string to a file
}
const palyerCountryString = JSON.stringify(playerCountry);
fs.writeFile('data/TennisPlayerCountry.json', palyerCountryString, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});
// users is a JSON array
// log the JSON array
console.log(palyerCountryString);

