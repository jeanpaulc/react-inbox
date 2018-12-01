import React, { Component } from 'react'
import Toolbar from '../toolbar/toolbar'
import MessageList from '../messages/message-list'
import ComposeForm from '../compose-form/compose-form'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      messageList: [],
      composeFormOpen: false
    }
  }

  async componentDidMount() {
    const response = await fetch(`http://localhost:8082/api/messages`)
    const messages = await response.json()

    /* Since each messages "selected" state should not persist OR post to the API, mappedWithSelect 
    creates a new "isSelected" property to each message on page load, and are initially set to "false" */
    const mappedWithSelect = messages.map(message => { 
      message.isSelected = false 
      return message
    })

    this.setState({ messageList: mappedWithSelect })
  }

  onStarSelect = async (idList) => {
    console.log(idList)
    const body = { messageIds: idList, command: 'star'  }

    const response = await fetch(`http://localhost:8082/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    const messages = await response.json()

    this.setState({ messageList: messages })
  }

  onMessageSelect = (id) => {
    const { messageList } = this.state

    let message = messageList.find(msg => msg.id === parseInt(id))

    if (!message.isSelected) { message.isSelected = true }
    else { message.isSelected = false }

    const index = this.state.messageList.indexOf(message)

    const updatedList = [
      ...messageList.slice(0, index),
      message,
      ...messageList.slice(index + 1)
    ]

    this.setState({ messageList: updatedList })
  }

  onAllMessageToggle = (list) => {
    const everySelect = list.every(msg => msg.isSelected)
    const someSelect = list.some(msg => msg.isSelected)

    let updatedList;
    if (!someSelect || everySelect) {
      updatedList = list.map(msg => {
        msg.isSelected = false
        return msg
      })
    }
    if (!everySelect)  {
      updatedList = list.map(msg => {
        msg.isSelected = true
        return msg
      })
    }

    this.setState({ messageList: updatedList })
  }

  onMarkAsRead = async (idList) => {
    const body = { messageIds: idList , command: 'read', read: true }

    const response = await fetch(`http://localhost:8082/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    const messages = await response.json()
    this.setState({ messageList: messages })
  }

  onMarkAsUnread = async (idList) => {
    const body = { messageIds: idList, command: 'read', read: false }

    const response = await fetch(`http://localhost:8082/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    const messages = await response.json()
    this.setState({ messageList: messages})
  }

  onApplyLabel = async (idList, labelName) => {
    const body = { messageIds: idList, command: 'addLabel', label: labelName }

    const response = await fetch(`http://localhost:8082/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    const messages = await response.json()
    this.setState({ messageList: messages })
  }

  onRemoveLabel = async (idList, labelName) => {
    const body = { messageIds: idList, command: 'removeLabel', label: labelName }

    const response = await fetch(`http://localhost:8082/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    const messages = await response.json()
    this.setState({ messageList: messages })
  }

  onMsgDelete = async (idList) => {
    const body = { messageIds: idList, command: 'delete' }

    const response = await fetch(`http://localhost:8082/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    const messages = await response.json()
    this.setState({ messageList: messages })
  }

  updateComposeMsgState = (bool) => {
    this.setState({ composeFormOpen: bool })
  }

  onMsgSubmit = async (postBody) => {

    const response = await fetch(`http://localhost:8082/api/messages`, {
      method: 'POST',
      body: JSON.stringify(postBody),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    const message = await response.json()
    const messages = [
      ...this.state.messageList,
      message
    ]

    this.setState({ messageList: messages })
    this.setState({ composeFormOpen: false })
  }

  render() {
    return (
      <div className="container">
        <Toolbar 
          messageList={this.state.messageList} 
          onAllMessageToggle={this.onAllMessageToggle} 
          onMarkAsRead={this.onMarkAsRead}
          onMarkAsUnread={this.onMarkAsUnread}
          onApplyLabel={this.onApplyLabel}
          onRemoveLabel={this.onRemoveLabel}
          onMsgDelete={this.onMsgDelete}
          composeFormOpen={this.state.composeFormOpen}
          updateComposeMsgState={this.updateComposeMsgState}
        />
        { 
          this.state.composeFormOpen ?
            <ComposeForm onMsgSubmit={this.onMsgSubmit}/>
          : <> </>
        }
        <MessageList 
          messageList={this.state.messageList} 
          onMessageSelect={this.onMessageSelect} 
          onStarSelect={this.onStarSelect}
          onMarkAsRead={this.onMarkAsRead}
        />
      </div>
    )
  }
}

export default App
