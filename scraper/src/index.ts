import { Team, Player } from './types/TypesFantasy'
import { scrap_teams, scrap_players_links, scrap_player_stats, contains_wrong_data_player } from './scraper'
import { MongoController } from './data/MongoController'
import { read } from 'fs';

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
  for(let team of teams){
    console.log('Scrapping players of ' + team.id)
    for(let t of team.players_links){
      const p = await scrap_player_stats(t, team)
      console.log('Scrapping player ' + p.id)
      const containsWrongData: Boolean = contains_wrong_data_player(p)
      const playerInDB = await dbController.readPlayer(p.id)
      if(storeData && !containsWrongData && playerInDB===null){
        dbController.storePlayer(p)
      }
    }
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
  scrapDataPlayers(conn, true)
})

