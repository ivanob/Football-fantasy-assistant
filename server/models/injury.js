const mongoose = require('mongoose')
const Schema = mongoose.Schema

const injurySchema = new Schema({
    fixture: Number,
    player_link: String
})

module.exports = mongoose.model('Injuries', injurySchema) // 'Player' is the name of the collection in Mongo