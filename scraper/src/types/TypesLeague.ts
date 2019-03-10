import { Team } from './TypesFantasy'

type Season = {
    year: string
    fixtures: Fixture[]
}

type Fixture = {
    local: Team
    visitor: Team
    date: Date
}