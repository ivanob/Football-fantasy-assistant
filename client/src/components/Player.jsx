import React from 'react'
import {gql} from 'apollo-boost'
import {graphql} from 'react-apollo'
import { Query } from "react-apollo";
import {calculateStats} from '../utils/statistics'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const getPlayerQuery = gql`
{
    player(id: "pacheco") {
        name,
        fixtures{
          number,
          generalStats{
            PJ,
            Plus60
          },
          deffensiveStats{
            P,D
          },
          bonusStats{
            REC,MAR
          },
        },
        generalInfo{
          totalPoints,
          position
        },
        injuries{
          fixture
        }
    }
}
`

const getAllPlayerQuery = gql`
{
    players {
        name
    }
}
`
/*
<TableRow key={1}>
          <TableCell component="th" scope="row">
            {player? player.playerId: ''}
          </TableCell>
          <TableCell align="right">{''}</TableCell>
          <TableCell align="right">{''}</TableCell>
          <TableCell align="right">{''}</TableCell>
        </TableRow>*/

function Player({player}){
    return (
      <Query query={getPlayerQuery} variables={{playerId: 'pacheco'}}>
        {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>Error :(</p>
          console.log(data)
        const stats = calculateStats(data.player)
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
          
        }}
        </Query>
    )
}

//export default graphql(getPlayerQuery)(Player)
export default (Player)

