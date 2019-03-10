import {Team} from '../types/TypesFantasy'

export class MongoController {
    // Connection URL
    url: String = 'mongodb://localhost:27018';
    // Database Name
    dbName: String = 'fantasy'

    storeTeam(t: Team){
        console.log('Store team')
    }
}
