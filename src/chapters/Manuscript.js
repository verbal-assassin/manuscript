import React, { Fragment, useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react'
import { Route, Switch } from 'react-router-dom'

import ToolHeader from '../ToolHeader'
import SideTools from '../SideTools'

import Home from '../Home'
import Characters from '../characters/Characters'
import Writing from '../writing/Writing';
import Locations from '../locations/Locations'

import './manuscript.css'


function Manuscript(props) {

  const [manuscript, setManuscript] = useState([]);

  const getManuscript = async () => {

    let response = await fetch('http://localhost:8091/manuscript/60274612a2786815445b259f')
    let data = await response.json()
    setManuscript(data)
  }

  useEffect(() => {
    getManuscript()
  }, [])

  const WritingComponent = () => (
    <Writing data={manuscript} />
  )
  
  const CharactersComponent = () => (
    <Characters data={manuscript} />
  )

  const LocationsComponent = () => (
    <Locations data={manuscript} />
  )

  const SideToolsComponent = () => (
    <SideTools data={manuscript} />
  )

  return (
    <Fragment>
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <ToolHeader />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <SideToolsComponent />
          </Grid.Column>
          <Grid.Column width={12}>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/manuscript' component={Writing} />
              <Route exact path='/characters' component={CharactersComponent} />
              <Route exact path='/locations' component={LocationsComponent} />
            </Switch>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  )
}

export default Manuscript