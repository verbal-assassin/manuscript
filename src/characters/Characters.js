import React, { useState, useEffect } from 'react';
import { Grid, Card, Form, Input, Select, Radio, TextArea, Checkbox, Button, Icon } from 'semantic-ui-react'
import './Characters.css'

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

const nullableEntry = {
  "id":"",
  "firstname": "",
  "lastname": "",
  "gender": "",
  "type": "",
  "description": ""
}

function Characters(manuscriptData) {
  /**
   * setup our state...
   */
  const [value, setValue] = useState('male')
  const [character, setCharacter] = useState(nullableEntry)
  /**
   * onCharacterChanged
   * for certain fields this event handler can be used to help
   * reduce the number of "on<control>Changed" functions.
   * 
   * @param {object} e the event target that triggered this event.
   */
  const onCharacterChanged = (e) => {

    let newCharacterInfo = {...character}

    switch (e.target.name) {
      case "firstname":
        newCharacterInfo.firstname = e.target.value
        break;
        
      case "lastname":
        newCharacterInfo.lastname = e.target.value
        break;

      case "gender":
        newCharacterInfo.gender = e.target.value
        break;

      case "type":
        newCharacterInfo.type = e.target.value
        break;

      case "description":
        newCharacterInfo.description = e.target.value
        break;

      default:
        break;
    }

    setCharacter(newCharacterInfo)
  }

  /**
   * OnSelectChanged
   * A specific handler for the select control that is part of
   * the form.  This had to be handled differently, at least I think
   * it did.  I'm really not that smart...
   * 
   * @param {object} e the event target that trigger this event.
   */
  const onSelectChanged = (e) => {

    let newCharacterInfo = {...character}
    newCharacterInfo.gender = e.target.innerText.toLowerCase()
    setCharacter(newCharacterInfo)
  }
  /**
   * onTypeChanged
   * A specific handler for the radio controls that determine the
   * type of character being portrayed.
   * 
   * @param {object} e the event target that triggers this event
   */
  const onTypeChanged = (e) => {
    
    let newCharacterInfo = {...character}
    switch(e.target.innerText) {
      case "Character":
        newCharacterInfo.type = "3"
        break;
      case "Anti Hero":
        newCharacterInfo.type = "2"
        break;
      case "Protagonist":
        newCharacterInfo.type = "1"
        break;
      default:
        newCharacterInfo.type = 3
        break;
    }

    setCharacter(newCharacterInfo)
  }
  /**
   * upsertCharacter - Yeah, strange name.  upsert became popular after I learned
   * my database nomenclature so I have to get use to it... sigh...
   */
  const upsertCharacter = async () => {
    const manuscriptId = manuscriptData.data[0]._id
    const url = `http://localhost:8091/manuscript/character/${manuscriptId}/${character._id}`
    var update = { 
      firstname: character.firstname,
      lastname: character.lastname,
      gender: character.gender,
      type: character.type,
      description: character.description
    }

    var response = await fetch(url, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(update)
    })

    console.log(response)
  }


  const resetData = () => {
    //
    //  need to check dirty flag
    //
    setCharacter(nullableEntry)
  }

  /**
   * 
   * @param {Person} person character to edit information about
   */    
  const onCharacterSelected = (person) => {
    console.log(person)
    setCharacter(person)
  }

  return (
    <div className='characterForm'>
      <p className='instructions'>
        I am putting a lot of text here to describe the functionality of this page
        how will it look as I keep going?
      </p>
      <Grid>
        <Grid.Column width={10}>
          <Form>
            <Form.Group widths='equal'>
              <Form.Field
                control={Input}
                name='firstname'
                label='First name'
                value={character.firstname}
                placeholder='First name'
                onChange = {onCharacterChanged}
              />
              <Form.Field
                control={Input}
                label='Last name'
                name='lastname'
                value={character.lastname}
                placeholder='Last name'
                onChange = {onCharacterChanged}
              />

            </Form.Group>
            <Form.Group inline>
              <Form.Field
                control={Select}
                label='Gender'
                name='gender'
                value={character.gender}
                options={options}
                placeholder='Gender'
                onChange = {onSelectChanged}
                />

            </Form.Group>
            <Form.Group inline>
              <label>Type</label>
              <Form.Field
                control={Radio}
                label='Protagonist'
                name='type'
                value='1'
                checked={character.type === '1'}
                onChange = {onTypeChanged}
                />
              <Form.Field
                control={Radio}
                label='Anti Hero'
                name='type'
                value='2'
                checked={character.type === '2'}
                onChange = {onTypeChanged}
                />
      
              <Form.Field
                control={Radio}
                label='Character'
                name='type'
                value={'3'}
                checked={character.type === '3'}
                onChange = {onTypeChanged}
                />
            </Form.Group>

            <Form.Field
              control={TextArea}
              label='Character Description'
              name='description'
              value={character.description}
              placeholder='Describe attributes of character'
              onChange = {onCharacterChanged}
              />
  
            <Form.Field
              control={Checkbox}
              label='Some label'
              onChange = {onCharacterChanged} 
              />

            <Form.Field control={Button} onClick={upsertCharacter}>Save</Form.Field>
          </Form>
        </Grid.Column>
        <Grid.Column width={4}>
          <div class='scrolling content'>
            <Card.Group>
              <Card>
                <Button onClick={resetData} fluid>New Character</Button>
              </Card>
              {
                manuscriptData && manuscriptData.data.length > 0 && manuscriptData.data[0].characters.map((person) => {
                  return (
                    <Card onClick={() => onCharacterSelected(person)}>
                      <Card.Content>
                        <Card.Header>{person.firstname} {person.lastname}</Card.Header>
                        <Card.Meta>
                          {(person.type === '1' ? "Protagonist" : (person.type === '2' ? 'Character' : 'Anti-Hero'))}
                        </Card.Meta>
                        <Card.Description>
                          {person.description}
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  )
                })
              }
            </Card.Group>
          </div>
        </Grid.Column>
        <Grid.Column width={2}></Grid.Column>
      </Grid>
    </div>
  );
}

export default Characters
