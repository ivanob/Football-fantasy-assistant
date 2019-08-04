import React, { Component } from 'react'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import Player from './components/Player'


//apollo-client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})



class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
        <h1>List of players</h1>
        <Player></Player>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
