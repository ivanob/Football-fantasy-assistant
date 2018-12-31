export type Team = {
    name: string,
    link: string,
    players?: Player[]
}

export type Player = {
    name: string,
    position: string,
    value: string
    link?: string
}
