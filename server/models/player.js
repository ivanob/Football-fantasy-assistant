const mongoose = require('mongoose')
const Schema = mongoose.Schema

const generalInfo = {
    position: String,
    price: String,
    average: String,
    played_games: String,
    totalPoints: String
}

const generalStats = {
    PJ: String,
    Plus60: String,
    G: String
}

const offensiveStats = {
    AG: String,
    ASG: String,
    LLE: String,
    PTYP: String
}

const deffensiveStats = {
    P0: String,
    PTYD: String,
    P: String,
    D: String
}

const negativeStats = {
    PTYF: String,
    GPP: String,
    GE: String,
    TA: String,
    TR: String
}

const bonusStats = {
    RM: String,
    RG: String,
    REC: String,
    PER: String,
    MAR: String
}

const fixtures = {
    number: String,
    rival: String,
    generalStats,
    offensiveStats,
    deffensiveStats,
    negativeStats,
    bonusStats,
    totalPoints: String
}

const playerSchema = new Schema({
    id: String,
    name: String,
    link: String,
    teamId: String,
    generalInfo,
    fixtures: [fixtures]
})

module.exports = mongoose.model('Player', playerSchema) 