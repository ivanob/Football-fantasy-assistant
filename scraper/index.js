"use strict";
exports.__esModule = true;
var database_1 = require("./data/database");
var scraper_1 = require("./scraper");
var links_teams = [];
scraper_1["default"](links_teams);
setTimeout(storeInDDBB, 20000);
function storeInDDBB() {
    links_teams.map(function (t) {
        return console.log(t.name + " " + t.players.length);
    });
    database_1.openConnection(links_teams);
}
