const graphql = require('graphql')

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLInt} = graphql

const PlayerMongo = require('../models/player')
const InjuryMongo = require('../models/injury')
const TeamMongo = require('../models/team')


const PlayerType = new GraphQLObjectType({
    name: 'Player',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        link: {type: GraphQLString},
        teamId: {type: GraphQLString},
        injuries: {
            type: new GraphQLList(InjuryType),
            resolve(parent, args){
                return InjuryMongo.find({player_link: parent.link.slice(33)})
            }
        },
        team: {
            type: TeamType,
            resolve(parent, args){
                return TeamMongo.findOne({id: parent.teamId})
            }
        }
    })
})
const InjuryType = new GraphQLObjectType({
    name: 'Injury',
    fields: () => ({
        id: {type: GraphQLID},
        player_link: {type: GraphQLString},
        fixture: {type: GraphQLInt},
        team_link: {type: GraphQLString},
        status: {type: GraphQLString}
    })
})
const TeamType = new GraphQLObjectType({
    name: 'Team',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        link: {type: GraphQLString},
        players_links: {type: new GraphQLList(GraphQLString)}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // Endpoints for players
        player: {
            type: PlayerType,
            args:{ id: {type: GraphQLID} },
            resolve(parent, args){
                //Code to query DDBB
                return PlayerMongo.findOne({id: args.id})
            }
        },
        players: {
            type: new GraphQLList(PlayerType),
            resolve(parent, args){
                return PlayerMongo.find({}) //find ALL players
            }
        },
        // Endpoints for injuries
        injury: {
            type: InjuryType,
            args:{ id: {type: GraphQLID} },
            resolve(parent, args){
                //Code to query DDBB
                return InjuryMongo.findOne({id: args.id})
            }
        },
        injuries: {
            type: new GraphQLList(InjuryType),
            args:{ player_link: {type: GraphQLString} },
            resolve(parent, args){
                //Code to query DDBB
                return InjuryMongo.find({player_link: args.player_link})
            }
        },
        // Endpoints for teams
        team: {
            type: TeamType,
            args:{ id: {type: GraphQLID} },
            resolve(parent, args){
                return TeamMongo.findOne({id: args.id})
            }
        },
        teams: {
            type: new GraphQLList(TeamType),
            resolve(parent, args){
                //Code to query DDBB
                return TeamMongo.find({})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})