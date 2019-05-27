type hasLink = {
    link: string
}

type hasId = {
    id: string
}

export interface Team extends hasLink, hasId {
    name: string,
    players_links: string[]
}

export interface Player extends hasLink, hasId {
    teamId: string,
    name: string,
    generalInfo: GeneralInfo,
    fixtures: FixtureData[]
    historicalPrices?: Price[]
    historicalScore?: FinalScore[]
}

export type GeneralInfo = {
    position: string,
    price: number,
    average: number,
    played_games: number,
    totalPoints: number
}

type FinalScore = {
    season: string,
    points: number,
    numPlayedGames: number,
    average: number
}

type Price = {
    date: Date,
    price: number
}

export type FixtureData = {
    number: number,
    rival?: Team,
    generalStats: GeneralStats,
    offensiveStats: OffensiveStats,
    deffensiveStats: DeffensiveStats,
    negativeStats: NegativeStats,
    bonusStats: BonusStats
    totalPoints: number
}

export type GeneralStats = {
    PJ: number,
    Plus60: number,
    G: number
}

export type OffensiveStats = {
    AG: number, //Write down in comments the meaning of each one
    ASG: number,
    LLE: number,
    PTYP: number
}

export type DeffensiveStats = {
    P0: number,
    PTYD: number,
    P: number,
    D: number
}

export type NegativeStats = {
    PTYF: number,
    GPP: number,
    GE: number,
    TA: number,
    TR: number
}

export type BonusStats = {
    RM: number,
    RG: number,
    REC: number,
    PER: number,
    MAR: number
}