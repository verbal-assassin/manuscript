import React, { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
import Manuscript from './manuscript/Manuscript';

export default function App() {
  return (
    <Fragment>
      {
        /*
          top bar, mainly handles the various "file" aspects
        */
      }
      <BrowserRouter>
        <Grid>
          <Grid.Column width={16}>
          </Grid.Column>
        </Grid>
        <Grid>

          <Grid.Column width={2}>
          </Grid.Column>

          <Grid.Column width={12}>
            <Manuscript />
          </Grid.Column>

          <Grid.Column width={2}>
          </Grid.Column>
        </Grid>
      </BrowserRouter>

    </Fragment>
  )
}