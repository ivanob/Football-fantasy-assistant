import { Team, Player } from './types/TypesFantasy'
import { scrap_teams, scrap_players_links, scrap_player_stats } from './scraper'
import { MongoController } from './data/MongoController'

async function scrapDataTeams(dbController: MongoController, storeData: boolean) {
  let teams: Team[] = await scrap_teams()
  for(let t of teams){
    const links = await scrap_players_links(t)
    t.players_links = links
  }
  console.log(teams)
  if(storeData){
    dbController.storeTeams(teams)
  }
  dbController.closeConnection()
}

async function scrapDataPlayers(dbController: MongoController, storeData: boolean) {
  let teams: Team[] = await dbController.readTeams()
  const a = await scrap_player_stats(teams[0].players_links[0], teams[0])
  console.log(a)
  if(storeData){
    dbController.storeTeams(teams)
  }
  dbController.closeConnection()
}

async function readData(dbController: MongoController) {
  const teams: Team[] = await dbController.readTeams()
  
  await dbController.closeConnection()
}

async function setupMongoConnection(): Promise<MongoController>{
  const dbController = new MongoController()
  await dbController.openConnection()
  return dbController
}

//Entry point of the program
setupMongoConnection().then(conn => {
  //readData(conn)
  //scrapDataTeams(conn, false)
  scrapDataPlayers(conn, false)
})

