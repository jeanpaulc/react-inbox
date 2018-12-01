import React, { Component } from 'react'

class Message extends Component {
  
  state = {
    msgOpened: false
  }

  handleMessageSelect = (e) => {
    const { onMessageSelect } = this.props
    const id = e.target.value
    onMessageSelect(id)
  }

  handleStarSelect = (e) => {
    const id = e.target.getAttribute('value')
    this.props.onStarSelect ( [ parseInt(id) ] )
  }

  handleMessageOpen = (e) => {
    const id = parseInt(e.target.getAttribute('value'))
    if (this.state.msgOpened) {
      this.setState({ msgOpened: false })
    }
    else {
      this.setState({ msgOpened: true })
      this.props.onMarkAsRead([id])
    }
  }
  
  render() {
    const { id, subject, labels, starred, read, isSelected, body } = this.props.message
    return (
      <div>
        <div className={"row message" + (isSelected ? " selected" : "") + (read ? " read" : " unread")} >
          <div className="col-xs-1">
            <div className="row">
              <div className="col-xs-2">
                <input type="checkbox" value={id} onChange={this.handleMessageSelect} checked={isSelected ? "checked" : ""} />
              </div>
              <div className="col-xs-2">
                <i value={id} className={starred ? "star fa fa-star" : "star fa fa-star-o"} onClick={this.handleStarSelect}></i>
              </div>
            </div>
          </div>
          <div className="col-xs-11">
            {labels.map((label, i) => <span key={i} className="label label-warning">{label}</span>)}
            <a value={id} onClick={this.handleMessageOpen}>
              {subject}
            </a>
          </div>
        </div>

        { 
          this.state.msgOpened ?
          (<div className="row message-body">
            <div className="col-xs-11 col-xs-offset-1">
              {body}
            </div>
          </div>)
          : <></>
        }
      </div>
    )
  }
}

export default Message
