import React, { Component } from 'react'

class Message extends Component {

  handleMessageSelect = (e) => {
    const { onMessageSelect } = this.props
    const id = e.target.value
    onMessageSelect(id)
  }

  handleMessageOpen = (e) => {
    console.log('message opened', e.target.value)
  }

  handleStarSelect = (e) => {
    const id = e.target.getAttribute('value')

    this.props.onStarSelect(id)
  }
  
  render() {
    const { id, subject, labels, starred, read, isSelected } = this.props.message
    return (
      <div className={"row message" + (isSelected ? " selected" : "") + (read ? " read" : " unread") } >
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" value={id} onChange={this.handleMessageSelect} checked={isSelected}/>
            </div>
            <div className="col-xs-2">
              <i value={id} className={starred ? "star fa fa-star" : "star fa fa-star-o"} onClick={this.handleStarSelect}></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          { labels.map((label, i) => <span key={i} className="label label-warning">{label}</span>) }
          <a value={id} onClick={this.handleMessageOpen}>
            {subject}
          </a>
        </div>
      </div>
    )
  }
}

/* <div class="row message-body">
  <div class="col-xs-11 col-xs-offset-1">
    This is the body of the message.
  </div>
</div> */

export default Message
