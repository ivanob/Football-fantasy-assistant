const graphql = require('graphql')

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLInt} = graphql

const PlayerMongo = require('../models/player')
const InjuryMongo = require('../models/injury')


const PlayerType = new GraphQLObjectType({
    name: 'Player',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString}
    })
})
const InjuryType = new GraphQLObjectType({
    name: 'Injury',
    fields: () => ({
        id: {type: GraphQLID},
        player_link: {type: GraphQLString},
        fixture: {type: GraphQLInt}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        player: {
            type: PlayerType,
            args:{ id: {type: GraphQLID} },
            resolve(parent, args){
                //Code to query DDBB
                // return players.find(p => p.id === args.id)
                return PlayerMongo.findOne({id: args.id})
            }
        },
        players: {
            type: new GraphQLList(PlayerType),
            resolve(parent, args){
                return PlayerMongo.find({}) //find ALL players
            }
        },
        injury: {
            type: InjuryType,
            args:{ id: {type: GraphQLID} },
            resolve(parent, args){
                //Code to query DDBB
                // return players.find(p => p.id === args.id)
                return InjuryMongo.findOne({id: args.id})
            }
        },
        injuries: {
            type: new GraphQLList(InjuryType),
            args:{ player_link: {type: GraphQLString} },
            resolve(parent, args){
                //Code to query DDBB
                // return players.find(p => p.id === args.id)
                return InjuryMongo.find({player_link: args.player_link})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})