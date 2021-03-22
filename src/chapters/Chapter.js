import React, {Fragment} from 'react';
import './Chapter.css'
import { Card, Progress } from 'semantic-ui-react'

function Chapter(props) {

  const onCardClick = () => {
    console.log(`Chapter Clicked on ${props.chapterInfo.guid}`)
    props.click(props.chapterInfo.guid)
  }

  return (
    <Fragment>
      <Card onClick={onCardClick}>
        <Card.Content>
            <Card.Header><h4>Chapter <span>{props.chapterInfo.chapter}</span></h4></Card.Header>
            <Card.Meta>
              <p>View Point: {props.chapterInfo.viewpoint}</p>
              <Progress percent={(props.chapterInfo.completeness/10)* 100} size='tiny'/>
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