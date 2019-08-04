import React, { Component } from 'react'
import {gql} from 'apollo-boost'
import {graphql} from 'react-apollo'

const getPlayerQuery = gql`
{
    players {
        name
    }
}
`


class Player extends Component {
    
  render() {
    console.log(this.props)
    return (
      <p>player</p>
    )
  }
}

export default graphql(getPlayerQuery)(Player)
