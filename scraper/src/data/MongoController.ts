import {Team, Player, rawInjury} from '../types/TypesFantasy'
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

export class MongoController {
    url: String = 'mongodb://localhost:27022' // Connection URL
    dbName: String = 'fantasy' // Database Name
    db: any
    client: any

    async closeConnection(): Promise<boolean> {
        return new Promise((resolve, reject) => {
        this.client.close().then((reply) => {
            console.log('closed connection to mongo')
            resolve(true)
          })
          .catch((error) => {
            console.error(error)
            reject(false)
          })
        })
    }

    // Use connect method to connect to the server
    async openConnection(): Promise<boolean> {
        return new Promise(resolve => {
            const that = this
            MongoClient.connect(that.url, function(err, client) {
                assert.equal(null, err)
                console.log("Connected successfully to mongo")
                that.db = client.db(that.dbName)
                that.client = client
                resolve(true)
            })
        })
    }

    storeTeams(teams: Team[]){
        const that = this
        teams.forEach((team: Team) => 
            that.db.collection('teams').insertOne(
                team))
        console.log('Teams stored in DB')
    }

    async readTeams(): Promise<Team[]>{
        return new Promise(resolve => {
            this.db.collection("teams").find().toArray(
                function(err, result) {
                    if (err) throw err
                    resolve(result)
            })
        }
    )}

    readPlayer(idPlayer: string): Player{
        return this.db.collection("players").findOne( { id: idPlayer }) 
    }

    storePlayer(player: Player){
        this.db.collection('players').insertOne(player)
        console.log('Player: ' + player.id + ' stored in DB')
    }

    storeInjuries(injuriesSeason: rawInjury[]){
        this.db.collection('injuries').insertMany(injuriesSeason)
        console.log('List of injuries stored in DB')
    }
}
