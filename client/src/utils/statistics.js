/* 
calculatePercInjury(injuriedWeeks)
calculateTitularity(gamesPartialPlayed,injuriedWeeks)
*/
export const calculateStats = (data) => {
    const numFixturesAvailable = data.fixtures.length
    const gamesPlayed = data.fixtures.filter(f => f.generalStats.PJ==='1')
    const gamesCompletePlayed = data.fixtures.filter(f => f.generalStats.PJ==='1' && f.generalStats.Plus60==='1')
    const gamesPartialPlayed = data.fixtures.filter(f => f.generalStats.PJ==='1' && f.generalStats.Plus60==='0')
    const countTotalPoints = data.generalInfo.totalPoints
    const arrayFixturesPlayed = gamesPlayed.map(g => g.number)
    const injuriedWeeks = data.injuries.filter(inj => !arrayFixturesPlayed.includes(inj.fixture) )
    calculatePersonalPoints(data)
    return {
        name: data.name,
        completeTitularity: calculateTitularity(gamesCompletePlayed,injuriedWeeks,numFixturesAvailable),
        partialTitularity: calculateTitularity(gamesPartialPlayed,injuriedWeeks,numFixturesAvailable),
        percInjury: calculatePercInjury(injuriedWeeks, numFixturesAvailable),
        avgPointsPlayed: calculateAveragePlayedGames(countTotalPoints, gamesPlayed) 
    }
}

const calculateTitularity = (gamesPlayed, injuriedWeeks, numFixturesAvailable) => {
    return ((gamesPlayed.length)/parseFloat(numFixturesAvailable - injuriedWeeks.length)).toFixed(2)
}

const calculatePercInjury = (injuriedWeeks, numFixturesAvailable) => {
    console.log(numFixturesAvailable)
    return ((injuriedWeeks.length)/parseFloat(numFixturesAvailable)).toFixed(2)
}

const calculateAveragePlayedGames = (totalPoints, gamesCompletePlayed) => {
    return (totalPoints/parseFloat(gamesCompletePlayed.length)).toFixed(2)
}

const calculatePersonalPoints = (player) => {
    switch(player.generalInfo.position){
        case 'Portero':
            return player
    }
}