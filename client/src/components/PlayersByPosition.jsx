import React, { useQuery } from 'react';

import { graphql } from 'react-apollo';
import { getPlayersByPositionQuery } from '../queries/queries';
import { calculateStats } from '../utils/statistics';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

function PlayersByPosition({ props }) {
  const position = props.position;
  console.log('ENTRA');
  const { loading, error, data } = useQuery(
    getPlayersByPositionQuery,
    {
      variables: { position },
    },
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data.players) {
    return data.players.map((p, i) => {
      const stats = calculateStats(p);
      return (
        i,
        (
          <TableRow key={stats.name}>
            <TableCell component="th" scope="row">
              {stats.name}
            </TableCell>
            <TableCell align="right">
              {stats.completeTitularity}
            </TableCell>
            <TableCell align="right">
              {stats.partialTitularity}
            </TableCell>
            <TableCell align="right">{stats.percInjury}</TableCell>
            <TableCell align="right">
              {stats.avgPointsPlayed}
            </TableCell>
            <TableCell align="right">{stats.personalStats}</TableCell>
            <TableCell align="right">{stats.totalPoints}</TableCell>
          </TableRow>
        )
      );
    });
  } else return '';
}

export default PlayersByPosition;
