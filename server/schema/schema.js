const graphql = require('graphql')

const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql

const players = [
    {name: 'Pacheco', id: '1'},
    {name: 'Messi', id: '2'},
    {name: 'Ronaldo', id: '3'}
]

const PlayerType = new GraphQLObjectType({
    name: 'Player',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        player: {
            type: PlayerType,
            args:{ id: {type: GraphQLString} },
            resolve(parent, args){
                //Code to query DDBB
                return players.find(p => p.id === args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})