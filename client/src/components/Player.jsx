import React, { Component } from 'react'

import {graphql} from 'react-apollo'
import {getPlayerQuery} from '../queries/queries'
import { Query } from "react-apollo";
import {calculateStats} from '../utils/statistics'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


/*
<TableRow key={1}>
          <TableCell component="th" scope="row">
            {player? player.playerId: ''}
          </TableCell>
          <TableCell align="right">{''}</TableCell>
          <TableCell align="right">{''}</TableCell>
          <TableCell align="right">{''}</TableCell>
        </TableRow>*/

class Player extends Component{
      render(){
        if (this.props.loading) return <p>Loading...</p>
        if (this.props.error) return <p>Error :(</p>
          console.log(this.props.data)
          return ''
          
        /*const stats = calculateStats(data.player)
        console.log(stats, player)
        return <TableRow key={stats.name}>
            <TableCell component="th" scope="row">
              {stats.name}
            </TableCell>
            <TableCell align="right">{stats.completeTitularity}</TableCell>
            <TableCell align="right">{stats.partialTitularity}</TableCell>
            <TableCell align="right">{stats.percInjury}</TableCell>
            <TableCell align="right">{stats.avgPointsPlayed}</TableCell>
          </TableRow>
          
        */
        }
}

export default graphql(getPlayerQuery)(Player)

