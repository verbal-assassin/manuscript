import React, { Fragment, useEffect, useState } from 'react';
import { Card, Popup } from 'semantic-ui-react'

function Location(props) {
  const location = props.data
  const [fullName, setFullName] = useState('XXX')

  useEffect( () => {

    const getCountryName = async () => {

      let name = await props.meta.GetCountryNameByCode(location.country)
      setFullName(name)
    }

    getCountryName()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onLocationSelected = (location) => {
    props.onClick(location)
  }

  return (
    <Fragment>
      <Popup
        trigger={
          <Card onClick={() => onLocationSelected(location)}>
            <Card.Content>
              <Card.Header>{location.name}</Card.Header>
              <Card.Meta>
                {fullName}
              </Card.Meta>
              <Card.Description>
                {location.description}
              </Card.Description>
            </Card.Content>
          </Card>
        }>
        <Popup.Header>{location.name} Details</Popup.Header>
        <Popup.Content>
          <p className='tight'>{`Pop:`} <span className='xright'>{location.population}</span></p>
          <p className='tight'>{`Weather:`} <span className='xright'>{location.weather}</span></p>
          <p className='tight'>{`Architecture:`} <span className='xright'>{location.architecturalStyle}</span></p>
        </Popup.Content>
      </Popup>

    </Fragment>
  )
}

export default Location;