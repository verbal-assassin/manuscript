import React, { useEffect, useState } from 'react';
import { Grid, Card, Form, Input, Popup, Select, TextArea, Button } from 'semantic-ui-react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import DndStyling from '../dnd-styling/dndStyles'
import Location from './Location';
import './Location.css'
import Toast from '../custom/Toast'

const popupStyle = {
  borderRadius: 5,
  opacity: 0.7
}


const stateList = [
  { key: 'USA', text: 'United States', value: 'USA' },
  { key: 'EU', text: 'Europe', value: 'Europe' },
  { key: 'JP', text: 'Japan', value: 'JP' },
]

const nullableEntry = {

  "_id": "",
  "name": "",
  "description": "",
  "city": "",
  "country": "",
  "region_or_state": "",
  "population": "",
  "architecturalStyle": "",
  "weather": ""
}

function Locations(props) {
  /**
   * setup our state...
   */
  const [location, setLocation] = useState(nullableEntry)
  const [sortedLocations, setSortedLocations] = useState([])
  const [notification, setNotification] = useState(false)
  const [countries, setCountries] = useState([])

  useEffect( () => {

    const getCountries = async () => {

      let mylist = await props.meta.GetCountries()
      setCountries(mylist)
    }

    getCountries()
    setSortedLocations(getSortedLocations())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * return the locations in the order based on the 
   * sortOrder attribute of the location.
   */
  const getSortedLocations = () => {

    if(props.data.length === 0) {
      return []
    }

    return props.data[0].locations.sort(function(a, b){
      if(a.sortOrder < b.sortOrder) {
        return -1
      }

      if(a.sortOrder > b.sortOrder){
        return 1
      }
      //
      //  both must be equal, but i don't expect to get here 
      //  often.
      //
      return 0
    })
  }
  /**
   * reset the input elements to their intial state and 
   * display a notification that the data has been saved
   */
  const showToast = () => {
    resetData()
    setNotification(true)
    setTimeout(() => setNotification(false), 3000)
  }

  
  /**
   * @event onLocationChanged
   * for certain fields this event handler can be used to help
   * reduce the number of "on<control>Changed" functions.
   * 
   * @param {object} e the event target that triggered this event.
   */
  const onLocationChanged = (e) => {

    let newLocationInfo = { ...location }

    switch (e.target.name) {
      case "name":
        newLocationInfo.name = e.target.value
        break;

      case "description":
        newLocationInfo.description = e.target.value
        break;

      case "city":
        newLocationInfo.city = e.target.value
        break;

      case "population":
        newLocationInfo.population = e.target.value
        break;
  
      case "weather":
        newLocationInfo.weather = e.target.value
        break;
    
      case "architecturalStyle":
        newLocationInfo.architecturalStyle = e.target.value
        break;

      default:
        break;
    }

    setLocation(newLocationInfo)
  }
  /**
   * @event onCountryChanged
   * A specific handler for the country select control that is part of
   * the form.  This had to be handled differently, at least I think
   * it did.  I'm really not that smart...
   * 
   * @param {object} e the event target that trigger this event.
   */
  const onCountryChanged = (e, data) => {

    let newLocationInfo = { ...location }
    newLocationInfo.country = data.value
    setLocation(newLocationInfo)
  }
  /**
   * @event onRegionStateChanged
   * 
   * A specific handler for the region/state select control that is part of
   * the form.  See previous comment about my lack of intellect.
   * 
   * @param {object} e the event target that trigger this event.
   */
  const onRegionStateChanged = (e) => {

    let newLocationInfo = { ...location }
    newLocationInfo.region_or_state = e.target.innerText
    setLocation(newLocationInfo)
  }
  /**
   * 
   * onPersist - persist the data as necessary.  this object is like
   * Sgt Schultz in that 'it knows nothing...'
   * 
   */
  const onPersist = async () => {
    const manuscriptId = props.data[0]._id
    await props.manager.Save(manuscriptId, location)
    showToast()
    //
    //  once toast is toast, save the data.  
    //
    setTimeout(() => props.onRefresh(true), 3000)
  }

  /**
   * @method resetData()  used to reset the location to a base initialized set of values
   */
  const resetData = () => {
    //
    //  need to check dirty flag
    //
    setLocation(nullableEntry)
  }

  /**
   * onLocationSelected when a location card is clicked on, the 
   * details of that location will be put there.
   * 
   * @param {Location} location location to edit information about
   */
  const onLocationSelected = (location) => {
    console.log(location)
    setLocation(location)
  }

  /**
   * OnDragEnd event that fires when dragging of a location
   * has completed.  The destination may be outside and therefore ntohing
   * will happen.
   * 
   * @param {*} result 
   */
  const onDragEnd = async (result) => {

    // dropped outside the list
    if (!result.destination) {
      return
    }

    const items = DndStyling.reorder(
      sortedLocations,
      result.source.index,
      result.destination.index
    )

    setSortedLocations(items)
    await props.manager.UpdateSortOrder(props.data[0]._id, items)
  }

  return (
    <div className='locationForm'>

      <h2>Maintaining Locations</h2>
      <Grid>
        <Grid.Column width={10}>
          <p className='instructions'>
            One of the key aspects to ensure your readers truly feel a sense 
            of immersion is the detailing of a location.  Make sure you
            describe it fully yet succinctly.
          </p>
          <Form>
            <Form.Field
              control={Input}
              name='name'
              label='Location Name'
              value={location.name}
              placeholder='Location Name'
              onChange={onLocationChanged}
            />

            <Form.Field
              control={TextArea}
              label='Description'
              name='description'
              value={location.description}
              placeholder='Describe attributes of location'
              onChange={onLocationChanged}
            />

            <Form.Group inline widths='equal' >

              <Form.Field
                control={Input}
                label='City'
                name='city'
                value={location.city}
                placeholder='City'
                onChange={onLocationChanged}
              />

              <Form.Field
                control={Select}
                label='Country'
                name='country'
                value={location.country}
                placeholder='Country'
                options={countries}
                search
                onChange={onCountryChanged}
              />

            </Form.Group>

            <Form.Field
              control={Select}
              label='Region / State'
              name='region_or_state'
              value={location.region_or_state}
              placeholder='Region or State'
              options={stateList}
              onChange={onRegionStateChanged}
            />

            <Form.Group inline widths='equal' >
              <Popup
                content='Population is not required.  However, it may help with setting a scene. Such as crowded restaurant.'
                style={popupStyle}
                trigger={
                  <Form.Field
                    control={Input}
                    label='Population'
                    name='population'
                    value={location.population}
                    placeholder='Population'
                    onChange={onLocationChanged}
                  />
                } />

              <Popup
                content='Use weather to help with a particular context in the location you want to call out.'
                style={popupStyle}
                trigger={
                  <Form.Field
                    control={Input}
                    label='Weather'
                    name='weather'
                    value={location.weather}
                    placeholder='Weather'
                    onChange={onLocationChanged}
                  />
                } />

            </Form.Group>
            <Popup
              content='Add color/context around a location to help bring it into focus.'
              style={popupStyle}
              trigger={
                <Form.Field
                  control={TextArea}
                  label='Architectural Style'
                  name='architecturalStyle'
                  value={location.architecturalStyle}
                  placeholder='Modern, Retro, Futuristic...'
                  onChange={onLocationChanged}
                />
              } />

            <Form.Field control={Button} onClick={onPersist}>Save</Form.Field>
          </Form>
          <Toast level='success' message='Data Saved' visible={notification} />
        </Grid.Column>
        <Grid.Column width={4}>
          <div className='scrolling content'>
            <Card.Group>
              <Card>
                <Button onClick={resetData} fluid>New Location</Button>
              </Card>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={DndStyling.getListStyle(snapshot.isDraggingOver)}
                    >
                      
                      {sortedLocations.map((location, index) =>
                        <Draggable key={location._id} draggableId={location._id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={DndStyling.getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              {
                                <Location data={location} onClick={onLocationSelected} meta={props.meta}/>
                              }
                            </div>
                          )}
                        </Draggable>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </Card.Group>
          </div>
        </Grid.Column>
        <Grid.Column width={2}></Grid.Column>
      </Grid>
    </div>
  );
}

export default Locations
