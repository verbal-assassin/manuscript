import React, { useState, useEffect } from 'react';
import { Grid, Card, Form, Input, Popup, Select, Radio, TextArea, Checkbox, Button, Icon } from 'semantic-ui-react'

const countryList = [
  { key: 'USA', text: 'United States', value: 'USA' },
  { key: 'EU', text: 'Europe', value: 'EU' },
  { key: 'JP', text: 'Japan', value: 'JP' },
]


const stateList = [
  { key: 'USA', text: 'United States', value: 'USA' },
  { key: 'EU', text: 'Europe', value: 'EU' },
  { key: 'JP', text: 'Japan', value: 'JP' },
]

const nullableEntry = {

  "id":"",
  "name": "",
  "description": "",
  "city": "",
  "country": "",
  "region_or_state": "",
  "population": "",
  "architecturalStyle": "",
  "weather": ""
}

function Locations(manuscriptData) {
  /**
   * setup our state...
   */
  const [value, setValue] = useState('male')
  const [location, setLocation] = useState(nullableEntry)
  /**
   * onLocationChanged
   * for certain fields this event handler can be used to help
   * reduce the number of "on<control>Changed" functions.
   * 
   * @param {object} e the event target that triggered this event.
   */
  const onLocationChanged = (e) => {

    let newLocationInfo = {...location}

    switch (e.target.name) {
      case "firstname":
        newLocationInfo.firstname = e.target.value
        break;
        
      case "lastname":
        newLocationInfo.lastname = e.target.value
        break;

      case "gender":
        newLocationInfo.gender = e.target.value
        break;

      case "type":
        newLocationInfo.type = e.target.value
        break;

      case "description":
        newLocationInfo.description = e.target.value
        break;

      default:
        break;
    }

    setLocation(newLocationInfo)
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

    let newLocationInfo = {...location}
    newLocationInfo.gender = e.target.innerText.toLowerCase()
    setLocation(newLocationInfo)
  }
  /**
   * onTypeChanged
   * A specific handler for the radio controls that determine the
   * type of location being portrayed.
   * 
   * @param {object} e the event target that triggers this event
   */
  const onTypeChanged = (e) => {
    
    let newLocationInfo = {...location}
    switch(e.target.innerText) {
      case "location":
        newLocationInfo.type = "3"
        break;
      case "Anti Hero":
        newLocationInfo.type = "2"
        break;
      case "Protagonist":
        newLocationInfo.type = "1"
        break;
      default:
        newLocationInfo.type = 3
        break;
    }

    setLocation(newLocationInfo)
  }
  /**
   * upsertLocation - Yeah, strange name.  upsert became popular after I learned
   * my database nomenclature so I have to get use to it... sigh...
   */
  const upsertLocation = async () => {
    const manuscriptId = manuscriptData.data[0]._id
    const url = `http://localhost:8091/manuscript/location/${manuscriptId}/${location._id}`

    var update = { 
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
    setLocation(nullableEntry)
  }

  /**
   * 
   * @param {Location} location location to edit information about
   */    
  const onLocationSelected = (location) => {
    console.log(location)
    setLocation(location)
  }

  return (
    <div className='locationForm'>
      <h2>Maintaining Locations</h2>
      <Grid>
        <Grid.Column width={10}>
          <p className='instructions'>
            Discuss describing a location, where you don't need exact details for some
            and some others you might.
          </p>
          <Form>
            <Form.Field
              control={Input}
              name='name'
              label='Location Name'
              value={location.name}
              placeholder='Location Name'
              onChange = {onLocationChanged}
            />

            <Form.Field
              control={TextArea}
              label='Description'
              name='description'
              value={location.description}
              placeholder='Describe attributes of location'
              onChange = {onLocationChanged}
              />

            <Form.Group inline widths='equal' >
              
              <Form.Field
                control={Input}
                label='City'
                name='city'
                value={location.city}
                placeholder='City'
                onChange = {onLocationChanged}
                />

              <Form.Field
                control={Select}
                label='Country'
                name='country'
                value={location.country}
                placeholder='Country'
                options={countryList}
                onChange = {onSelectChanged}
              />

            </Form.Group>

            <Form.Field
                control={Select}
                label='Region / State'
                name='region_or_state'
                value={location.region_or_state}
                placeholder='Region or State'
                options={stateList}
                onChange = {onSelectChanged}
              />

            <Form.Group inline widths='equal' >
              
              <Form.Field
                control={Input}
                label='Population'
                name='population'
                value={location.population}
                placeholder='Population'
                onChange = {onLocationChanged}
                />

              <Form.Field
                control={Input}
                label='Weather'
                name='weather'
                value={location.weather}
                placeholder='Weather'
                onChange = {onLocationChanged}
              />

            </Form.Group>
            <Popup 
              content='Add color/context around a location to help bring it into focus.'
              trigger={
                <Form.Field
                  control={TextArea}
                  label='Architectural Style'
                  name='architecturalStyle'
                  value={location.architecturalStyle}
                  placeholder='Modern, Retro, Futuristic...'
                  onChange = {onLocationChanged}
                  />
              } />

            <Form.Field control={Button} onClick={upsertLocation}>Save</Form.Field>
          </Form>
        </Grid.Column>
        <Grid.Column width={4}>
          <div class='scrolling content'>
            <Card.Group>
              <Card>
                <Button onClick={resetData} fluid>New Location</Button>
              </Card>
              {
                manuscriptData && manuscriptData.data.length > 0 && manuscriptData.data[0].locations.map((location) => {
                  return (
                    <Card onClick={() => onLocationSelected(location)}>
                      <Card.Content>
                        <Card.Header>{location.firstname} {location.lastname}</Card.Header>
                        <Card.Meta>
                          {(location.type === '1' ? "Protagonist" : (location.type === '2' ? 'Location' : 'Anti-Hero'))}
                        </Card.Meta>
                        <Card.Description>
                          {location.description}
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

export default Locations
