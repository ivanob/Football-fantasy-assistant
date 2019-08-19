import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import SearchAppBar from '../components/Header/SearchAppBar';
import PlayersTable from '../components/PlayersTable';

function MainContainer() {
  const [playerName, setPlayerName] = useState('');
  const [searchPosition, setSearchPosition] = useState('');

  const onSearchPlayer = playerId => {
    setPlayerName(playerId);
  };

  const onDisplayPosition = position => {
    setSearchPosition(position);
  };

  return (
    <Grid container spacing={3}>
      <SearchAppBar
        onSearchPlayer={onSearchPlayer}
        onDisplayPosition={onDisplayPosition}
      />
      <Grid item xs={12} />
      <PlayersTable playerId={playerName} position={searchPosition} />
    </Grid>
  );
}

export default MainContainer;
