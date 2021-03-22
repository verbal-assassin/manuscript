import React, { Fragment, useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react'
import { Route, Switch } from 'react-router-dom'

import ToolHeader from '../ToolHeader'
import SideTools from '../SideTools'

import Home from '../Home'
import Characters from '../characters/Characters'
import Writing from '../writing/Writing';
import Locations from '../locations/Locations'
import Renderer from '../pdf/Renderer'
import LocationManager from '../logic/LocationManager'
import ManuscriptManager from '../logic/ManuscriptManager'
import Cartographer from '../logic/Cartographer'

import appConfig from '../AppConfig'

import './manuscript.css'


function Manuscript(props) {

  const [manuscript, setManuscript] = useState([]);
  const [refresh, setRefresh] = useState(false)
  const manager = new ManuscriptManager(appConfig)
  
  const getManuscript = async () => {

    const manuscript = await manager.Get('60274612a2786815445b259f')
    setManuscript(manuscript)

  }
  
  //  TODO  adding a dependency on useeffect will cause getManuscript to fire when that value changes.

  useEffect(() => {
    getManuscript()
    setRefresh(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh])

  const RenderingComponent = () => (
    <Renderer data={manuscript} />
  )

  const WritingComponent = () => (
    <Writing data={manuscript} />
  )
  
  const CharactersComponent = () => (
    <Characters data={manuscript} />
  )

  const LocationsComponent = () => (
    <Locations 
      data={manuscript} 
      manager={new LocationManager(appConfig)} 
      onRefresh={setRefresh} 
      meta={new Cartographer(appConfig)} />
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
              <Route exact path='/manuscript' component={WritingComponent} />
              <Route exact path='/characters' component={CharactersComponent} />
              <Route exact path='/locations' component={LocationsComponent} />
              <Route exact path='/render' component={RenderingComponent} />
            </Switch>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  )
}

export default Manuscript