import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

function SaveWarning(props) {
  //const [open, setOpen] = React.useState(props.open)

  return (
    <Modal
      basic
      onClose={() => props.toggle(false)}
      onOpen={() => props.toggle(true)}
      open={props.open}
      size='small'>
      <Header icon>
        <Icon name='archive' />
        Save?
      </Header>
      <Modal.Content>
        <p>
          Your recent changes have not been saved. Do you wish to save them?
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={() => props.toggle(false)}>
          <Icon name='cancel' /> No
        </Button>
        <Button color='green' inverted onClick={() => props.toggle(false)}>
          <Icon name='save' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default SaveWarning
