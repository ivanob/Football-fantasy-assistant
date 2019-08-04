import express = require('express')
import graphqlHTTP = require('express-graphql')
import schema = require('../schema/schema')
const mongoose = require('mongoose')

const app = express()

//connect to mongo DB
mongoose.connect('mongodb://localhost:27022/fantasy')
mongoose.connection.once('open', () => {
    console.log('Connected to database')
})

app.use('/graphql', graphqlHTTP({
    schema, //This schema is defining my graph, nothing to do with Mongo schema
    graphiql: true
}))

app.listen(4000, () => {
    console.log('Now listening for requests on port 4000')
})