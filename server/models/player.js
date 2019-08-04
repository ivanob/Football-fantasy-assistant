const mongoose = require('mongoose')
const Schema = mongoose.Schema

const playerSchema = new Schema({
    id: String,
    name: String,
    link: String,
    teamId: String
})

module.exports = mongoose.model('Player', playerSchema) 