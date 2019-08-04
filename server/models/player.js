const mongoose = require('mongoose')
const Schema = mongoose.Schema

const playerSchema = new Schema({
    id: String,
    name: String
})

module.exports = mongoose.model('Player', playerSchema) // 'Player' is the name of the collection in Mongo