
export const calculateStats = (data) => {
    const gamesCompletePlayed = data.fixtures.filter(f => f.generalStats.PJ==='1' && f.generalStats.Plus60==='1')
    const gamesPartialPlayed = data.fixtures.filter(f => f.generalStats.PJ==='1' && f.generalStats.Plus60==='0')
    const arrayFixturesPlayed = gamesCompletePlayed.map(g => g.number)
    const injuriedWeeks = data.injuries.filter(inj => !arrayFixturesPlayed.includes(inj.fixture) )
    return [calculateTitularity(gamesCompletePlayed,injuriedWeeks),
        calculatePercInjury(injuriedWeeks), calculateTitularity(gamesPartialPlayed,injuriedWeeks) ]
}

const calculateTitularity = (gamesPlayed, injuriedWeeks) => {
    return (gamesPlayed.length)/parseFloat(38 - injuriedWeeks.length)
}

const calculatePercInjury = (injuriedWeeks) => {
    return (injuriedWeeks.length)/parseFloat(38 - injuriedWeeks.length)
}