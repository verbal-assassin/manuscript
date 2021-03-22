import React, { Component } from 'react'
import { Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { Input, Label, Menu, Placeholder } from 'semantic-ui-react'

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
        <h4>MetaData of manuscript</h4>
        <Placeholder>
          <Placeholder.Paragraph>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Paragraph>
          <Placeholder.Paragraph>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Paragraph>
        </Placeholder>
        <Menu vertical>
          <Menu.Item>
            <Input icon='search' placeholder='Search manuscript...' />
          </Menu.Item>

          <Menu.Item
            name='chapters'
            href='/manuscript'
            active={activeItem === 'chapters'}
          >
            <Label>{this.chapterCount}</Label>
            Chapters
          </Menu.Item>

          <Menu.Item
            name='locations'
            active={activeItem === 'locations'}
            href='/locations'
          >
            <Label>{this.locationCount}</Label>
            Locations
          </Menu.Item>

          <Menu.Item
            name='characters'
            active={activeItem === 'characters'}
            href='/characters'
          >
            <Label>{this.characterCount}</Label>
           Characters
        </Menu.Item>
        <Menu.Item
            name='render'
            active={activeItem === 'render'}
            href='/render'
          >
           Render Manuscript
        </Menu.Item>
        </Menu>
      </Fragment>
    )
  }
}