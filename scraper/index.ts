import { Team } from './types/Types'
const rp = require('request-promise')
const cheerio = require('cheerio')
const database = require('./database')

const links_teams: Team[] = [];
const links_players: string[] = [];
const base_url = 'http://www.laligafantasymarca.com';

/*const options = {
  uri: links_teams[0],
  transform: function (body) {
    return cheerio.load(body);
  }
};*/

const options_teams = {
  uri: base_url,
  transform: function (body) {
    return cheerio.load(body);
  }
};

function return_url_options(url){
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
  .then(($) => {
    console.log("Started team info scraping");
    var team_links = $(".teams-menu").find('a');
    team_links.each(function(i, link){ 
      const t :Team = {name: link.attribs.title, link: link.attribs.href}
      links_teams.push(t);
    });
    //database.store_teams(links_teams);
    scraping_player_links();
  }
);

function scraping_player_links(){
  links_teams.map((team, i) =>
    rp(return_url_options(base_url + links_teams[i].link))
    .then(($) => {
      console.log("Scraping players from team " + links_teams[i].name);
      var players_link: string[] = [];
      $(".tablepager tr h3 a").each(function(link){ 
        var link_player: string = $(this).attr("href");
        if(!players_link.filter(x => x===link_player).length){
            players_link.push(link_player)
        }
      })
      team.players = players_link.map(x => {return {name: "A", link:x}})
      // links_players.push({name_team: links_teams[i].name, links_players: players_link})
      scraping_player_stats()
    }
  )
)}

function scraping_player_stats(){
  links_players.map((team, i) =>
    rp(return_url_options(base_url + links_teams[i].link))
    .then(($) => {
      $
    }
  ))
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