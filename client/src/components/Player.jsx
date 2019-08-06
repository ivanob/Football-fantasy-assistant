import React from 'react'
import {gql} from 'apollo-boost'
import {graphql} from 'react-apollo'
import { Query } from "react-apollo";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const getPlayerQuery = gql`
{
    player(id: "pacheco") {
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
      <Query query={getPlayerQuery} variables= {{playerId: 'pacheco'}}>
        {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return data.player.name
    }}
      
      </Query>
    )
}

//export default graphql(getPlayerQuery)(Player)
export default (Player)

