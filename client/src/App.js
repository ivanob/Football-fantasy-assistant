import React, { Component } from 'react'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'

//apollo-client setup
const client = new ApolloClient({
  url: 'http://localhost:4000/graphql'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
        <h1>List of players</h1>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
