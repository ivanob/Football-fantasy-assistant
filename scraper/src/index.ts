import { Team, Player } from './types/TypesFantasy'
import { scrap_teams, scrap_players_links } from './scraper'
import { MongoController } from './data/MongoController'

async function scrapData(dbController: MongoController, storeData: boolean) {
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
  scrapData(conn, true)
})

