import React, { Component } from 'react'
import { Fragment } from 'react'
import { Input, Label, Menu } from 'semantic-ui-react'

export default class SideTools extends Component {
  constructor(props) {

    super(props)
    if (props.data.length > 0) {
      this.characterCount = props.data[0].characters.length
      this.chapterCount = props.data[0].chapters.length
      this.locationCount = props.data[0].locations.length
    }
  }

  state = { activeItem: 'inbox' }
  
  render() {
    const { activeItem } = this.state

    return (
      <Fragment>
      </Fragment>
    )
  }
}