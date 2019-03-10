import { Team, Player } from './types/TypesFantasy'
import scrap_teams from './scraper'
import { MongoController } from './data/MongoController'

async function scrapData() {
  const teams = await scrap_teams()
}

const dbController = new MongoController()
dbController.storeTeam
scrapData()
//setTimeout(storeInDDBB, 10000);

// openConnection(links_teams)

// function storeInDDBB(){
//   links_teams.map((t: Team) => 
//     console.log(t.name + " " + ((t.players)?t.players.length:0) ))
//   openConnection(links_teams)
// }