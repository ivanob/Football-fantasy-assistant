const mongoose = require('mongoose')
const Schema = mongoose.Schema

const generalInfo = {
    position: String,
    price: String,
    average: String,
    played_games: String,
    totalPoints: String
}

const playerSchema = new Schema({
    id: String,
    name: String,
    link: String,
    teamId: String,
    generalInfo
})

module.exports = mongoose.model('Player', playerSchema) 