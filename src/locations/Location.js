import React, {Fragment} from 'react';
import { Card } from 'semantic-ui-react'

function Location(props) {

  return (
    <Fragment>
      <Card>
        <Card.Content>
            <Card.Header>{props.chapterInfo.chapter}</Card.Header>
            <Card.Meta>
              View Point: {props.chapterInfo.viewpoint}
            </Card.Meta>
            <Card.Description>
              <em>more chapter info.</em>
            </Card.Description>
          </Card.Content>
        </Card>
    </Fragment>
  )
}

export default Location;