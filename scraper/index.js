"use strict";
exports.__esModule = true;
var rp = require('request-promise');
var cheerio = require('cheerio');
var database = require('./database');
var links_teams = [];
var links_players = [];
var base_url = 'http://www.laligafantasymarca.com';
/*const options = {
  uri: links_teams[0],
  transform: function (body) {
    return cheerio.load(body);
  }
};*/
var options_teams = {
    uri: base_url,
    transform: function (body) {
        return cheerio.load(body);
    }
};
function return_url_options(url) {
    return {
        uri: url,
        transform: function (body) {
            return cheerio.load(body);
        }
    };
}
//database.connectDB();
//Read the list of teams for this season
rp(options_teams)
    .then(function ($) {
    console.log("Started team info scraping");
    var team_links = $(".teams-menu").find('a');
    team_links.each(function (i, link) {
        var t = { name: link.attribs.title, link: link.attribs.href };
        links_teams.push(t);
    });
    //database.store_teams(links_teams);
    scraping_player_links();
});
function scraping_player_links() {
    links_teams.map(function (team, i) {
        return rp(return_url_options(base_url + links_teams[i].link))
            .then(function ($) {
            console.log("Scraping players from team " + links_teams[i].name);
            var players_link = [];
            $(".tablepager tr h3 a").each(function (link) {
                var link_player = $(this).attr("href");
                if (!players_link.filter(function (x) { return x === link_player; }).length) {
                    players_link.push(link_player);
                }
            });
            team.players = players_link.map(function (x) { return { name: "A", link: x }; });
            console.log(team);
            // links_players.push({name_team: links_teams[i].name, links_players: players_link})
            scraping_player_stats();
        });
    });
}
function scraping_player_stats() {
    links_players.map(function (team, i) {
        return rp(return_url_options(base_url + links_teams[i].link))
            .then(function ($) {
            $;
        });
    });
}
/*
rp(options)
    .then(($) => {
        var players_description = $("#players-list").find("table").find(".name").find("a");
       // players_description = players_description.filter(x => x.attribs != undefined);
       // var players_links = players_description.map(x => x.attribs.href);
       var players_link = [];
       players_description.each(function(i, link){
          if(!players_link.includes(link.attribs.href)){
            players_link.push(link.attribs.href);
          }
        });

        //Solo Adan, de momento
        const options2 = {
          uri: base_url+players_link[0],
          transform: function (body) {
            return cheerio.load(body);
          }
        };
        rp(options2)
          .then(($) => {
            var player_stats = $(".matchstats tbody").find("tr")
            var fixtures = []
            player_stats.each(function(i, link){
              fixtures.push($($(link).find("td")[1]).text())
            });
            
            console.log(fixtures[0]);
          })
          

            
        
    })
    .catch((err) => {
        console.log(err);
});*/ 
