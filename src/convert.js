const CSVToJSON = require('csvtojson');
const fs = require('fs');

// convert users.csv file to JSON array
CSVToJSON().fromFile('data/wta_players.csv')
    .then(rawData => {
        const wtaPlayers = JSON.stringify(rawData);
        const playerCountry = {}
        wtaPlayers.forEach(data => {
            let player = data["200000"]
            let country = data["UNK"]
            playerCountry[player] = country
        })
        // write JSON string to a file
        fs.writeFile('data/TennisPlayerCountry.json', playerCountry, (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON data is saved.");
        });
        // users is a JSON array
        // log the JSON array
        console.log(playerCountry);
    }).catch(err => {
        // log error if any
        console.log(err);
    });



    