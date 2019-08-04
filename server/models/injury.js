const mongoose = require('mongoose')
const Schema = mongoose.Schema

const injurySchema = new Schema({
    fixture: Number,
    player_link: String,
    team_link: String,
    status: String
})

module.exports = mongoose.model('Injuries', injurySchema) 