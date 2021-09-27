//import _ from 'lodash'
import React from "react";
import { Menu, Dropdown } from "semantic-ui-react";
/*
remove later on.
const columns = _.times(4, (i) =>(
  <Grid.Column key={i}>
    <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
    <p>Text</p>
  </Grid.Column>

))
*/

const ToolHeader = () => {
  return (
    <Menu>

      <Dropdown text="File" pointing className="link item">
        <Dropdown.Menu>
          <Dropdown.Item>Open</Dropdown.Item>
          <Dropdown.Item>New</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown text="Edit" pointing className="link item">
        <Dropdown.Menu>
          <Dropdown.Header>Categories</Dropdown.Header>
          <Dropdown.Item>
            <Dropdown text="Clothing">
              <Dropdown.Menu>
                <Dropdown.Header>Mens</Dropdown.Header>
                <Dropdown.Item>Shirts</Dropdown.Item>
                <Dropdown.Item>Pants</Dropdown.Item>
                <Dropdown.Item>Jeans</Dropdown.Item>
                <Dropdown.Item>Shoes</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>Womens</Dropdown.Header>
                <Dropdown.Item>Dresses</Dropdown.Item>
                <Dropdown.Item>Shoes</Dropdown.Item>
                <Dropdown.Item>Bags</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Dropdown.Item>
          <Dropdown.Item>Home Goods</Dropdown.Item>
          <Dropdown.Item>Bedroom</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Header>Order</Dropdown.Header>
          <Dropdown.Item>Status</Dropdown.Item>
          <Dropdown.Item>Cancellations</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Menu.Item>Settings</Menu.Item>
    </Menu>
  );
};

export default ToolHeader;
