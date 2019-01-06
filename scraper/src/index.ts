
import { openConnection } from './data/database'
import { Team, Player } from './types/Types'
import scrap_teams from './scraper'

let links_teams: Team[] = [];
scrap_teams(links_teams)
setTimeout(storeInDDBB, 20000);

function storeInDDBB(){
  links_teams.map((t: Team) => 
    console.log(t.name + " " + ((t.players)?t.players.length:0) ))
  openConnection(links_teams)
}