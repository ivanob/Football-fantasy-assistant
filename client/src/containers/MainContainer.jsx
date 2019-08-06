import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import SearchAppBar from '../components/SearchAppBar'
import PlayersTable from '../components/PlayersTable'



function MainContainer() {
  const [playerName, setPlayerName] = useState('')

  const onSearchPlayer = (playerId) => {
    setPlayerName(playerId)
    }
    return (
        <Grid container spacing={3}>
            <SearchAppBar onSearchPlayer={onSearchPlayer}/>
        <Grid item xs={12}>
        </Grid>
            <PlayersTable players={[{playerId: playerName}]}/>
        </Grid>
    )
}

export default MainContainer
