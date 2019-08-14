import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'
import Player from './Player'

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
      margin: '30px'
    },
    table: {
      minWidth: 650
      
    },
  }));

  /*const printBody = (playerId) => {
    console.log('print data of ' + playerId)
    return <Player playerId={playerId} />
  }*/

export default function PlayersTable({ playerId }) {
  const classes = useStyles()
  const [tablePlayers, setTablePlayers] = useState(new Map())
  if(!tablePlayers.has(playerId)){
    setTablePlayers(tablePlayers.set(playerId, (<Player playerId={playerId} />)))
  }
  useEffect(() => {
    // Update the document title using the browser API
        
        
    });

   return(
       <Paper className={classes.root}>
       <Table className={classes.table}>
        <TableHead>
        <TableRow>
            <TableCell>Name player</TableCell>
            <TableCell align="right">Complete titularity</TableCell>
            <TableCell align="right">Partial titularity</TableCell>
            <TableCell align="right">% Injury</TableCell>
            <TableCell align="right">Avg points played</TableCell>
            <TableCell align="right">Personal points</TableCell>
            <TableCell align="right">Total points</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>

            {(Array.from(tablePlayers.values()))
            }
        </TableBody>
        </Table>
        </Paper>
    )
}
