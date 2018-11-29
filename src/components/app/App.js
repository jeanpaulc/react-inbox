import React, { Component } from 'react'
import Toolbar from '../toolbar/toolbar'
import MessageList from '../messages/message-list'
// import './App.css'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      messageList: []
    }
    this.api = 'http://localhost:8082/api'
  }

  async componentDidMount() {
    const response = await fetch(`${this.api}/messages`)
    const messages = await response.json()

    /* Since each messages's "selected" state should not persist OR post to the API, mappedWithSelect 
    creates a new "isSelected" property to each message on page load, and set to "false" */
    const mappedWithSelect = messages.map(message => { 
      message.isSelected = false 
      return message
    })

    this.setState({ messageList: mappedWithSelect })
  }

  onMessageSelect = (id) => {
    const { messageList } = this.state

    let message = messageList.find(msg => msg.id === parseInt(id))

    if (!message.isSelected) {
      message.isSelected = true
    }
    else {
      message.isSelected = false
    }

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

  render() {
    return (
      <div className="container">
        <Toolbar messageList={this.state.messageList} onAllMessageToggle={this.onAllMessageToggle}/>
        <MessageList messageList={this.state.messageList} onMessageSelect={this.onMessageSelect}/>
      </div>
    )
  }
}

export default App
