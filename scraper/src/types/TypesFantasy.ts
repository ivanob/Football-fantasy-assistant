type hasLink = {
    link: string
}

type hasId = {
    id: string
}

export interface Team extends hasLink, hasId {
    name: string,
    players_links?: string[]
}

export interface Player extends hasLink, hasId {
    teamId: string,
    name: string,
    position: string,
    price: number,
    average: number,
    fixtures?: FixtureData[]
    historicPrices?: Price[]
    historicScore?: FinalScore[]
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

type FixtureData = {
    team: Team,
    number: number,
    rival: Team,
    generalStats: GeneralStats[],
    offensiveStats: OffensiveStats[],
    deffensiveStats: DeffensiveStats[],
    negativeStats: NegativeStats[],
    bonusStats: BonusStats[]
    totalPoints: number
}

type GeneralStats = {
    PJ: boolean,
    Plus60: boolean,
    G: number
}

type OffensiveStats = {
    AG: number, //Write down in comments the meaning of each one
    ASG: number,
    LLE: number,
    PTYP: number
}

type DeffensiveStats = {
    P0: number,
    PTYD: number,
    P: number,
    D: number
}

type NegativeStats = {
    PTYF: number,
    GPP: number,
    GE: number,
    TA: number,
    TR: number
}

type BonusStats = {
    RM: number,
    RG: number,
    REC: number,
    PER: number,
    MAR: number
}