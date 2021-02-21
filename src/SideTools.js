import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Input, Label, Menu } from 'semantic-ui-react'

export default class SideTools extends Component {
  state = { activeItem: 'inbox' }

  handleItemClick = (e, { name }) => {
    switch(name) {
      case 'inbox':
        return (<Redirect to='/characters'/>)
      case 'characters':
        return (<Redirect to='/characters'/>)
      default:
        return (<Redirect to='/'/>)
      }
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu vertical>
        <Menu.Item>
          <Input icon='search' placeholder='Search manuscript...' />
        </Menu.Item>

        <Menu.Item
          name='spam'
          href='/writings'
          active={activeItem === 'spam'}
        >
          <Label>5</Label>
          Chapters
        </Menu.Item>

        <Menu.Item
          name='spam'
          active={activeItem === 'spam'}
          href='/locations'
        >
          <Label>5</Label>
          Locations
        </Menu.Item>

        <Menu.Item
          name='updates'
          active={activeItem === 'updates'}
          href='/characters'
        >
          <Label>3</Label>
           Characters
        </Menu.Item>
      </Menu>
    )
  }
}