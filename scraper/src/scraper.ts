import { Team, Player, GeneralInfo, FixtureData} from './types/TypesFantasy'
import { OffensiveStats, DeffensiveStats, NegativeStats, BonusStats } from './types/TypesFantasy'

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

  function generate_id_player(playerName: string): string{
    let lower = playerName.toLowerCase()
    const originalChars = ["á", "é", "í", "ó", "ú", " "]
    const replaceChars = ["a", "e", "i", "o", "u", ""]
    for(let i = 0; i < originalChars.length; i++){ 
      lower = lower.split(originalChars[i]).join(replaceChars[i])
     }
    return lower
  }

//Read the list of teams for this season
 export async function scrap_teams(): Promise<Team[]>{
   const links_teams: Team[] = []
  return new Promise(resolve => {
    rp(options_teams)
      .then(($) => {
        console.log("Started team info scraping")
        var team_links = $(".teams-menu").find('a')
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

  function scrap_general_stats($: any): GeneralInfo{
    let generalStats: GeneralInfo = {position:"", price:-1, average:-1, played_games:-1, totalPoints:-1}
    $('.info .left .title').each(function(index, element){ 
      if($(element).text()==="Demarcación"){
        generalStats.position = ($(element).next().text().trim())
      }
      if($(element).text()==="Valor"){
        generalStats.price = ($(element).next().text()).slice(0, -2)
      }
    })
    $('.info .right .title').each(function(index, element){ 
      if($(element).text()==="Partidos"){
        generalStats.played_games = ($(element).next().text())
      }
      if($(element).text()==="Media"){
        generalStats.average = ($(element).next().text())
      }
    })
    generalStats.totalPoints = $('.photo .points').text().replace("puntos", "")
    return generalStats
  }

  function read_stat($, data) {
   return $($(data).children()).text()
  }

  function empty_offensives(data: OffensiveStats): boolean{
    return !data.AG && !data.ASG && !data.LLE && !data.PTYP
  }

  function empty_deffensive(data: DeffensiveStats): boolean{
    return !data.D && !data.P && !data.P0 && !data.PTYD
  }

  function empty_negative(data: NegativeStats): boolean{
    return !data.GE && !data.GPP && !data.PTYF && !data.TA && !data.TR
  }

  function empty_bonus(data: BonusStats): boolean{
    return !data.MAR && !data.PER && !data.REC && !data.RG && !data.RM
  }

  export function contains_wrong_data_player(p: Player): boolean{
    const errors = p.fixtures.find(x => empty_offensives(x.offensiveStats) && 
    empty_deffensive(x.deffensiveStats) &&
    empty_negative(x.negativeStats) &&
    empty_bonus(x.bonusStats) && x.totalPoints!==0 && x.generalStats.PJ===1)
    return errors!==undefined
  }

    function scrap_fixtures_stats($: any): FixtureData[]{
      let fixtures: FixtureData[] = []
      $('.matchstats tbody tr').each(function(index, element){ 
        let fix: FixtureData = {
          number: -1,
          rival: undefined,
          generalStats: {PJ:0,Plus60:0, G:0 },
          offensiveStats: {AG: 0,ASG: 0,LLE: 0,PTYP: 0},
          deffensiveStats: {P0: 0, PTYD: 0,P: 0,D: 0},
          negativeStats: {PTYF: 0,GPP: 0,GE: 0,TA: 0,TR: 0},
          bonusStats: {RM: 0,RG: 0,REC: 0,PER: 0,MAR: 0},
          totalPoints: -1}
        const column = $(element).find('td')
        column.each(function(i, data){ 
          if(i === 0){ fix.number = $(data).text()}
          if(i === 1){ fix.rival = $(data).text()}
          if(i === 2){ fix.generalStats.PJ = $(data).text().replace("-", 0)}
          if(i === 3){ fix.generalStats.Plus60 = read_stat($,data).replace("-", 0)}
          if(i === 4){ fix.generalStats.G = read_stat($,data)}
          if(i === 23){ fix.totalPoints = $(data).text()}
          //Bonus
          if(i === 22){fix.bonusStats.MAR = read_stat($,data) }
          if(i === 21){fix.bonusStats.PER = read_stat($,data) }
          if(i === 20){fix.bonusStats.REC = read_stat($,data) }
          if(i === 19){fix.bonusStats.RG = read_stat($,data) }
          if(i === 18){fix.bonusStats.RM = read_stat($,data) }
          //Negatives
          if(i === 17){fix.negativeStats.TR = read_stat($,data) }
          if(i === 16){fix.negativeStats.TA = read_stat($,data) }
          if(i === 15){fix.negativeStats.GE = read_stat($,data) }
          if(i === 14){fix.negativeStats.GPP = read_stat($,data) }
          if(i === 13){fix.negativeStats.PTYF = read_stat($,data) }
          //Deffensives
          if(i === 12){fix.deffensiveStats.D = read_stat($,data) }
          if(i === 11){fix.deffensiveStats.P = read_stat($,data) }
          if(i === 10){fix.deffensiveStats.PTYD = read_stat($,data) }
          if(i === 9){fix.deffensiveStats.P0 = read_stat($,data) }
          //Offensives
          if(i === 8){fix.offensiveStats.PTYP = read_stat($,data) }
          if(i === 7){fix.offensiveStats.LLE = read_stat($,data) }
          if(i === 6){fix.offensiveStats.ASG = read_stat($,data) }
          if(i === 5){fix.offensiveStats.AG = read_stat($,data) }
        })
        fixtures.push(fix)
      })
      return fixtures
    }

  export function scrap_player_stats(link_player: string, team: Team): Promise<Player>{
    return new Promise(resolve => {
    rp(return_url_options(base_url + link_player))
      .then(($) => {
        const name_player = $('.name').text()
        const p: Player =  {
          id: generate_id_player(name_player),
          teamId: team.id,
          name: name_player,
          generalInfo: scrap_general_stats($),
          fixtures: scrap_fixtures_stats($),
          link: base_url + link_player}
        resolve(p)
      })
      .catch((error) => {
        console.log("Error scraping player stats of " + link_player)
      })
  })}