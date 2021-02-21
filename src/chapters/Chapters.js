import React,{useState,useEffect} from 'react';
import Chapter from './Chapter';
import { Grid, Card } from 'semantic-ui-react'
import './Chapter.css'

function Chapters(props) {
  const myVar = 32

  return (
    
    <div className='characterForm'>
      <h2>Chapters</h2>
      <Grid>
        <Grid.Column width={16}>
          <Card.Group>
            { props.data && props.data.length>0 && props.data.map((item)=><Chapter click={props.onChapterSelected} chapterInfo={item}/>) }
          </Card.Group>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default Chapters;