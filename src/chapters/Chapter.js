import React, {Fragment} from 'react';
import './Chapter.css'
import { Card } from 'semantic-ui-react'

function Chapter(props) {

  const onCardClick = () => {
    console.log(`Chapter Clicked on ${props.chapterInfo.guid}`)
    props.click(props.chapterInfo.guid)
  }

  return (
    <Fragment>
      <Card onClick={onCardClick}>
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

export default Chapter;