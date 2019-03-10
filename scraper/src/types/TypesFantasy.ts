type hasLink = {
    link: string
}

export interface Team extends hasLink {
    name: string,
    players?: Player[]
}

export interface Player extends hasLink {
    name: string,
    position: string,
    value: number,
    fixtures?: FixtureData[]
    historicValues?: Value[]
}

type Value = {
    date: Date,
    value: number
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
    AG: number,
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