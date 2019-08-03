import express = require('express')
import graphqlHTTP = require('express-graphql')
import schema = require('../schema/schema')

// https://www.youtube.com/watch?v=ed8SzALpx1Q&t=5652s

const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log('Now listening for requests on port 4000')
})