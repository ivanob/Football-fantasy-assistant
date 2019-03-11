import { Team, Player } from './types/TypesFantasy'
import scrap_teams from './scraper'
import { MongoController } from './data/MongoController'

async function scrapData(dbController: MongoController) {
  const teams: Team[] = await scrap_teams()
  dbController.storeTeams(teams)
  dbController.closeConnection()
}

async function readData(dbController: MongoController) {
  const teams: Team[] = await dbController.readTeams()
  console.log(teams)
  await dbController.closeConnection()
}

async function setupMongoConnection(): Promise<MongoController>{
  const dbController = new MongoController()
  await dbController.openConnection()
  return dbController
}

//scrapData(dbController)
setupMongoConnection().then(conn => {
  readData(conn)
})

