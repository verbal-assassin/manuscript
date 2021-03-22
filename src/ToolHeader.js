import _ from 'lodash'
import React from 'react';
import { Grid, Image, Icon } from 'semantic-ui-react'

const columns = _.times(4, (i) =>(
  <Grid.Column key={i}>
    <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
    <p>Text</p>
  </Grid.Column>

))


const ToolHeader = () => {
  return(
    <Grid textAlign='center' columns={3}>

      <Grid.Column key={0}>
        <Icon name='keyboard' size='large'/>
        <p>Zen Mode</p>
      </Grid.Column>

      <Grid.Column key={1}>
        <Icon name='save' size='large'/>
        <p>Save</p>
      </Grid.Column>
    
      <Grid.Column key={2}>
        <Icon name='settings' size='large'/>
        <p>Settings</p>
      </Grid.Column>
    </Grid>
  )
}

export default ToolHeader;