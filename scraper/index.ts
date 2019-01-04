import { Team, Player } from './types/Types'
const rp = require('request-promise')
const cheerio = require('cheerio')
import { openConnection, insertElement } from './data/database'
// const database = require('./data/database')

const links_teams: Team[] = [];
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

openConnection('a','b')
//scrap_teams()
//setTimeout(storeInDDBB, 20000);

//Read the list of teams for this season
function scrap_teams(){
  rp(options_teams)
    .then(($) => {
      console.log("Started team info scraping");
      var team_links = $(".teams-menu").find('a');
      team_links.each(function(i, link){ 
        const t :Team = {name: link.attribs.title, link: link.attribs.href, players: []}
        links_teams.push(t);
      });
      //database.store_teams(links_teams);
      scraping_players_links();
    }
  )
}

function storeInDDBB(){
  links_teams.map((t: Team) => 
    console.log(t.name + " " + t.players.length))
}

function scraping_players_links(){
  links_teams.map((team, i) =>
    rp(return_url_options(base_url + links_teams[i].link))
    .then(($) => {
      console.log("Scraping players from team " + links_teams[i].name);
      var players_link: string[] = [];
      $(".tablepager tr h3 a").each(function(link){ 
        var link_player: string = $(this).attr("href");
        if(players_link.filter(x => x===link_player).length === 0){
            players_link.push(link_player)
            scraping_player_stats(link_player, team)
        }
      })
      // team.players = players_link.map(x => {return {name: "A", link:x}})
      // links_players.push({name_team: links_teams[i].name, links_players: players_link})
      // scraping_player_stats()
    }
  )
)}

function scraping_player_stats(link_player: string, team: Team){
  rp(return_url_options(base_url + link_player))
    .then(($) => {
      const name_player = $('.name').text()
      let position = ""
      let value = 0
      //const position = $('.info .left .title').next().text()
      $('.info .left .title').each(function(index, element){ 
        if($(element).text()==="Demarcación"){
          position = ($(element).next().text().trim())
        }
        if($(element).text()==="Valor"){
          value = ($(element).next().text()).slice(0, -2)
        }
      })
      const p: Player =  {name: name_player,
        position: position,
        value: value}
      team.players = team.players.concat([p])
    })
}