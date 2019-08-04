const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teamSchema = new Schema({
    id: String,
    name: String,
    link: String,
    players_links: [String]
})

module.exports = mongoose.model('Team', teamSchema) 