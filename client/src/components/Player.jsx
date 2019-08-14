import React, { Component } from 'react'

import {graphql} from 'react-apollo'
import {getPlayerQuery} from '../queries/queries'
import {calculateStats} from '../utils/statistics'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

function Player(props) {
        if (props.loading) return <p>Loading...</p>
        if (props.error) return <p>Error :(</p>
          if(props.data.player){
            const stats = calculateStats(props.data.player)
            console.log(stats)
            return <TableRow key={stats.name}>
              <TableCell component="th" scope="row">
                {stats.name}
              </TableCell>
              <TableCell align="right">{stats.completeTitularity}</TableCell>
              <TableCell align="right">{stats.partialTitularity}</TableCell>
              <TableCell align="right">{stats.percInjury}</TableCell>
              <TableCell align="right">{stats.avgPointsPlayed}</TableCell>
              <TableCell align="right">{stats.personalStats}</TableCell>
              <TableCell align="right">{stats.totalPoints}</TableCell>
            </TableRow>
          }else return ''
        }


export default graphql(getPlayerQuery, {
  options: (props)=>{
    return{
      variables:{
        playerId: props.playerId
      }
    }
  }
})(Player)

