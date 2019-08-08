import React from 'react'
import {gql} from 'apollo-boost'
import {graphql} from 'react-apollo'
import { Query } from "react-apollo";
import {calculateStats} from '../utils/statistics'

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
          totalPoints
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
          return data.player.name + ' ' + calculateStats(data.player).join(' ')
        }}
        </Query>
    )
}

//export default graphql(getPlayerQuery)(Player)
export default (Player)

