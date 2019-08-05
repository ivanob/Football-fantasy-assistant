import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import SearchAppBar from '../components/SearchAppBar';

class MainContainer extends Component {
  render() {
    return (
        <Grid container spacing={3}>
            <SearchAppBar/>
        <Grid item xs={12}>
        </Grid>
        </Grid>
    )
  }
}

export default MainContainer
