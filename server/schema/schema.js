const graphql = require('graphql')

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLInt} = graphql

const PlayerMongo = require('../models/player')
const InjuryMongo = require('../models/injury')
const TeamMongo = require('../models/team')

const subtypeGeneralInfo = new GraphQLObjectType({
    name: 'generalInfo',
    fields: () => ({
        position: {type: GraphQLString},
        price: {type: GraphQLString},
        average: {type: GraphQLString},
        played_games: {type: GraphQLString},
        totalPoints: {type: GraphQLString}
    })
})

const subtypeGeneralStats = new GraphQLObjectType({
    name: 'generalStats',
    fields: () => ({
        PJ: {type: GraphQLString},
        Plus60: {type: GraphQLString},
        G: {type: GraphQLString}
    })
})
const subtypeOffensiveStats = new GraphQLObjectType({
    name: 'offensiveStats',
    fields: () => ({
        AG: {type: GraphQLString},
        ASG: {type: GraphQLString},
        LLE: {type: GraphQLString},
        PTYP: {type: GraphQLString}
    })
})
const subtypeDeffensiveStats = new GraphQLObjectType({
    name: 'deffensiveStats',
    fields: () => ({
        P0: {type: GraphQLString},
        PTYD: {type: GraphQLString},
        P: {type: GraphQLString},
        D: {type: GraphQLString}
    })
})
const subtypeNegativeStats = new GraphQLObjectType({
    name: 'negativeStats',
    fields: () => ({
        PTYF: {type: GraphQLString},
        GPP: {type: GraphQLString},
        GE: {type: GraphQLString},
        TA: {type: GraphQLString},
        TR: {type: GraphQLString}
    })
})
const subtypeBonusStats = new GraphQLObjectType({
    name: 'bonusStats',
    fields: () => ({
        RM: {type: GraphQLString},
        RG: {type: GraphQLString},
        REC: {type: GraphQLString},
        PER: {type: GraphQLString},
        MAR: {type: GraphQLString}
    })
})

const subtypeFixtures = new GraphQLList(
    new GraphQLObjectType({
    name: 'fixtures',
    fields: () => ({
        number: {type: GraphQLInt},
        rival: {type: GraphQLString},
        generalStats: {type: subtypeGeneralStats},
        offensiveStats: {type: subtypeOffensiveStats},
        deffensiveStats: {type: subtypeDeffensiveStats},
        negativeStats: {type: subtypeNegativeStats},
        bonusStats: {type: subtypeBonusStats},
        totalPoints: {type: GraphQLString}
    })
}))

const PlayerType = new GraphQLObjectType({
    name: 'Player',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        link: {type: GraphQLString},
        teamId: {type: GraphQLString},
        generalInfo: {
            type: subtypeGeneralInfo
        },
        fixtures: {
            type: subtypeFixtures
        },
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
            args:{ position: {type: GraphQLString} },
            resolve(parent, args){
                if(args.position){
                    return PlayerMongo.find({"generalInfo.position": args.position})
                }else {
                    return PlayerMongo.find({}) //find ALL players
                }
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