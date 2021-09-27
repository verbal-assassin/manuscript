import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom';
import {
  Grid,
  Header,
  Icon,
  Image,
  List,
  Segment
} from 'semantic-ui-react'
import { SET_MANUSCRIPT_ID } from './redux/constants';

function Home() {

  const [data, setData] = useState([])
  const manuscriptId  = useSelector((state) => state.manuscriptId)

  const dispatch = useDispatch()

  const handleManuscriptSelected = (xxx) => {
    
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
    console.log (`dispatching ${xxx}`)
    console.log(`value of manuscriptId ${manuscriptId}`)
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
    
    dispatch({
      type: SET_MANUSCRIPT_ID,
      payload: {manuscriptId: xxx}
    })
  }
  /**
   * only retrieves a subset of the possible attributes
   * of each manuscript contained in the library.
   */
  const getData = async () => {

    let response = await fetch('http://localhost:8091/manuscript')
    let data = await response.json()
    setData(data)
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <Fragment>
      <Segment style={{ padding: '6em 0em' }} vertical>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                Welcome to Riders Bloque
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                I wrote / designed this website to help me focus when I'm trying to
                write my book.  I find nearly every tool like Word, Notepad, OneNote, and
                others to not fit the environment I wanted. I felt that I needed to have some semblence
                of a distractionless environment. To that end, I created this tool.
              </p>
              <p style={{ fontSize: '1em'}}>
                As I am also a developer, it helps keep my programming skills at least somewhat 
                up to date trying to learn new technologies.
              </p>
            </Grid.Column>
            <Grid.Column floated='right' width={6}>
              <Image circular size='medium' src={require('./assets/quillpen.jpg')} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment style={{ paddingBottom: '2em' }} vertical>
        <h3>Current Manuscripts</h3>
        <p>
          select one of the current manuscripts to begin working on that book!
          <Link to='/manuscript'>Manuscript</Link>
        </p>
        <Grid celled='internally' columns='equal' stackable>
          <Grid.Row>
            <Grid.Column>
              <List celled relaxed>
                {
                  data && data.length > 0 && data.map((manuscript) => {
                    return (
                        <List.Item 
                          key={manuscript._id} 
                          as='a' 
                          href='/manuscript/'
                          onClick={() => handleManuscriptSelected(manuscript._id)}>

                          <Icon name='book' />
                          <List.Content>
                            <List.Header>{manuscript.workingTitle}</List.Header>
                            <List.Description>
                              {manuscript.blurb}
                            </List.Description>
                          </List.Content>
                          <List.Content floated='right'><em>{manuscript.authorName}</em></List.Content>
                        </List.Item>
                      
                    )
                  })
                }
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment style={{ padding: '0em' }} vertical>
        <Grid columns='equal' stackable>
          <Grid.Row textAlign='center'>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                "Great Tool!!"
            </Header>
              <p style={{ fontSize: '1.33em' }}>That's what she said!</p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                "I only have one word for this tool.  Word!"
            </Header>
              <p style={{ fontSize: '1.33em' }}>
                <Image avatar src={require('./assets/XpgonN0X_400x400.jpg')} />
                <b>Bill Gates</b> Chief Competitor
            </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Fragment>
  )
}

export default Home