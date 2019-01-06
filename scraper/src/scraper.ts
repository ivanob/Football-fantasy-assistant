import { Team, Player } from './types/Types'

const cheerio = require('cheerio')
const rp = require('request-promise')

const base_url = 'http://www.laligafantasymarca.com';

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

//Read the list of teams for this season
 export default function scrap_teams(links_teams){
    rp(options_teams)
      .then(($) => {
        console.log("Started team info scraping");
        var team_links = $(".teams-menu").find('a');
        team_links.each(function(i, link){ 
          const t :Team = {name: link.attribs.title, link: link.attribs.href, players: []}
          links_teams.push(t);
        });
        scraping_players_links(links_teams);
      }
    )
  }

  function scraping_players_links(links_teams){
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
          if(!team.players) team.players = []
        team.players = team.players.concat(p)
      })
  }