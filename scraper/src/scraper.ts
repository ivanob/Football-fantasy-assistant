import { Team, Player } from './types/TypesFantasy'

const cheerio = require('cheerio')
// const rp = require('request-promise')
var rp = require('promise-request-retry');

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
      retry: 6, // will retry the call twice, in case of error.
      transform: function (body) {
        return cheerio.load(body);
      }
    };
  }

 function generate_id(teamName: string): string{
    let lower = teamName.toLowerCase().split(" ")
    let newName = lower[lower.length-1]
    const originalChars = ["á", "é", "í", "ó", "ú"]
    const replaceChars = ["a", "e", "i", "o", "u"]
    for(let i = 0; i < originalChars.length; i++){ 
      newName = newName.split(originalChars[i]).join(replaceChars[i])
     }
    return newName
  }

//Read the list of teams for this season
 export async function scrap_teams(): Promise<Team[]>{
   const links_teams: Team[] = []
  return new Promise(resolve => {
    rp(options_teams)
      .then(($) => {
        console.log("Started team info scraping");
        var team_links = $(".teams-menu").find('a');
        team_links.each(function(i, link){ 
          const t :Team = {id: generate_id(link.attribs.title), name: link.attribs.title, link: link.attribs.href, players_links: []}
          console.log(t)
          links_teams.push(t);
        });
        return resolve(links_teams)
      }
    ).catch((error) => {
      console.log("Error scraping team")
    })
    })
  }

  export function scrap_players_links(team: Team): Promise<string[]>{
    return new Promise(resolve => {
        rp(return_url_options(base_url + team.link))
        .then(($) => {
          console.log("Scraping players links from team " + team.name);
          var players_link: string[] = [];
          $(".tablepager tr h3 a").each(function(link){ 
            var link_player: string = $(this).attr("href");
            if(players_link.filter(x => x===link_player).length === 0){
                players_link.push(link_player)
            }
          })
          resolve(players_link)
        }
      ).catch((error) => {
        console.log("Error scraping player from team " + team)
      })
      }
  )}

  /*function scraping_player_stats(link_player: string, team: Team){
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
          value: value,
          link: base_url + link_player}
          if(!team.players) team.players = []
        team.players = team.players.concat(p)
      })
      .catch((error) => {
        console.log("Error scraping player stats of " + link_player)
      })
  }*/