import React from 'react'
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

  const printBody = (players) => {
    return (players.map(p => (
        <Player player={p} />
    )))
  }

export default function PlayersTable({ players }) {
  const classes = useStyles();

   return(
        <Paper className={classes.root}>
       <Table className={classes.table}>
        <TableHead>
        <TableRow>
            <TableCell>Name player</TableCell>
            <TableCell align="right">Team</TableCell>
            <TableCell align="right">Points 2018</TableCell>
            <TableCell align="right">Titularity %</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
            {printBody(players)}
        </TableBody>
        </Table>
        </Paper>
    )
}