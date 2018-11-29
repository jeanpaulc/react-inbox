import React, { Component } from 'react'

class Toolbar extends Component {
  
  changeAllMsgIcon = (list) => {
    const selectedCount = list.filter(message => message.isSelected === true).length

    if (selectedCount > 0 && selectedCount < list.length) {
      return "fa fa-minus-square-o"
    }
    if (selectedCount === list.length) {
      return "fa fa-check-square-o"
    }
    else {
      return "fa fa-square-o"
    }
  }

  allMsgToggle = (e) => {
    const { onAllMessageToggle, messageList } = this.props
    onAllMessageToggle(messageList)
  }

  render() {
    const { messageList } = this.props
    const unreadCount = messageList.filter(message => message.read !== true).length

    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{unreadCount}</span>
            {unreadCount === 1 ? "unread message" : "unread messages"}
          </p>

          <button onClick={this.allMsgToggle} className="btn btn-default">
            <i className={this.changeAllMsgIcon(messageList)}></i>
          </button>

          <button className="btn btn-default" disabled="disabled">
            Mark As Read
          </button>

          <button className="btn btn-default" disabled="disabled">
            Mark As Unread
          </button>

          <select className="form-control label-select" disabled="disabled">
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" disabled="disabled">
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" disabled="disabled">
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}


export default Toolbar