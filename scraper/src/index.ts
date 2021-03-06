import { Team, Player } from './types/TypesFantasy'
import { scrap_teams, scrap_players_links, scrap_player_stats, contains_wrong_data_player, scrap_injuries } from './scraper'
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
      if(storeData){
        const containsWrongData: Boolean = contains_wrong_data_player(p)
        const playerInDB = await dbController.readPlayer(p.id)
        if((containsWrongData && playerInDB!==null) || playerInDB===null){
          if((containsWrongData && playerInDB!==null)){
            console.log(`Overwritting ${p.id} data cause INCORRECT DATA`)
          }
          dbController.storePlayer(p)
        }else{
          console.log(`Player ${p.id} already exists in DDBB`)
        }
      }
    }
  }
  dbController.closeConnection()
}

async function readData(dbController: MongoController, closeConnection: boolean) {
  const teams: Team[] = await dbController.readTeams()
  if(closeConnection){
    await dbController.closeConnection()
  }
}

async function setupMongoConnection(): Promise<MongoController>{
  const dbController = new MongoController()
  await dbController.openConnection()
  return dbController
}

async function scrapDataInjuries(dbController: MongoController, storeData: boolean){
  const injuriesSeason = await scrap_injuries()
  if(storeData){
    dbController.storeInjuries(injuriesSeason)
  }
  dbController.closeConnection()
}

//Entry point of the program
setupMongoConnection().then(conn => {
  readData(conn, false)
  //scrapDataTeams(conn, true)
  //scrapDataPlayers(conn, true)
  scrapDataInjuries(conn, true)
})

